import { AnalyticsPlugin } from 'analytics';
import get from 'lodash/get';
import unionBy from 'lodash/unionBy';
import {
  Event,
  Profile,
  Locale,
  buildIdentifyEvent,
  buildPageEvent,
  buildTrackEvent,
} from '@ninetailed/experience.js-shared';

import * as Cache from './Cache';
import { buildClientNinetailedRequestContext } from './Events';
import { NinetailedApiClient } from './utility';
import * as debug from './utility';

declare global {
  interface Window {
    ninetailed?: any;
  }
}

type AnalyticsPluginNinetailedConfig = {
  clientId: string;
  environment?: string;
  preview?: boolean;
  url?: string;
  profile?: Profile;
  locale?: Locale;
  requestTimeout?: number;
};

export const NINETAILED_TRACKER_EVENTS = {
  /**
   * `profile` - Fires when the profile is returned by the cdp API.
   */
  profile: 'profile',
};

export const PLUGIN_NAME = 'ninetailed';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Similar to _.throttle but waits for the promise to resolve. There is no
 * wait time because you can simply await `Promise.timeout` inside `fn`
 * to wait some time before the next call.
 */
export default function asyncThrottle<I, O = void>(
  fn: (args: I) => Promise<O>
) {
  let runningPromise: Promise<O> | undefined;
  let queuedPromise: Promise<O> | undefined;
  let nextArgs!: I;
  return async (args: I) => {
    if (runningPromise) {
      nextArgs = args;
      if (queuedPromise) {
        return queuedPromise;
      } else {
        queuedPromise = runningPromise.then(() => {
          queuedPromise = undefined;
          runningPromise = fn(nextArgs);
          return runningPromise;
        });
        return queuedPromise;
      }
    } else {
      runningPromise = fn(args);
      return runningPromise;
    }
  };
}

export const ninetailedPlugin = ({
  clientId,
  environment,
  preview = false,
  url,
  profile,
  locale,
}: AnalyticsPluginNinetailedConfig): AnalyticsPlugin => {
  let isInitialized = false;
  const apiClient = new NinetailedApiClient({ clientId, environment, url });

  let queue: Event[] = [];
  let localOnly = false;

  const flush = async (instance: any) => {
    const events: Event[] = Object.assign([], queue);
    debug.log('Start flushing events.');
    queue = [];
    if (!events.length) {
      return;
    }

    const cache = Cache.get({ instance });

    try {
      debug.log('Cache: ', cache);
      const { profile, signals, traitsUpdatedAt, sessions } =
        await apiClient.profile({
          events,
          signals: get(cache, 'signals', {}),
          traits: get(cache, 'traits', {}),
          traitsUpdatedAt: get(
            cache,
            'traitsUpdatedAt',
            new Date().toISOString()
          ),
          localOnly,
          preview,
          options: {
            locale: locale || 'en',
          },
          sessions: get(cache, 'sessions', []),
        });
      debug.log('Profile from api: ', profile);
      const updatedCache = Cache.set(
        {
          id: profile.id,
          random: profile.random,
          audiences: profile.audiences,
          traits: profile.traits,
          location: profile.location,
          signals,
          traitsUpdatedAt,
          sessions,
          session: profile.session,
        },
        { instance }
      );
      instance.dispatch({
        type: NINETAILED_TRACKER_EVENTS.profile,
        profile,
        cache: updatedCache,
      });
    } catch (error) {
      debug.log('An error occurred during flushing the events: ', error);
      instance.dispatch({
        type: NINETAILED_TRACKER_EVENTS.profile,
        profile: {
          id: cache.id,
          random: cache.random,
          audiences: cache.audiences,
          traits: cache.traits,
          location: cache.location,
          session: cache.session,
        },
        cache,
      });
    }
    // This is necessary to make sure that the cache is updated before the next flush is performed
    await delay(20)
  };

  // const throttledFlush = throttle(flush, 200, {
  //   leading: false,
  //   trailing: true,
  // });

  const throttledFlush = asyncThrottle(flush);

  const createEvent = async (event: Event, instance: any) => {
    queue = unionBy([event], queue, 'messageId');

    throttledFlush(instance);
  };

  return {
    name: 'ninetailed',
    config: {},
    initialize: ({ instance }) => {
      const cache = Cache.get({ instance });
      if (profile) {
        instance.storage.setItem('__anon_id', profile.id);
        Cache.initialize({ instance }, { ...cache, id: profile.id });
      } else {
        const anonymousId = instance.storage.getItem('__anon_id');
        Cache.initialize({ instance }, { ...cache, id: anonymousId });
      }
      isInitialized = true;
    },
    page: async ({ payload, instance }) => {
      debug.log('Sending Page event.');
      const ctx = buildClientNinetailedRequestContext();
      localOnly = payload.localOnly;
      await createEvent(
        buildPageEvent({
          // doing this here as the anonymous id is set to late from init
          anonymousId: profile?.id || payload.anonymousId,
          messageId: payload.meta.rid,
          timestamp: payload.meta.ts,
          properties: payload.properties,
          ctx,
        }),
        instance
      );
    },
    track: async ({ payload, instance }) => {
      debug.log('Sending Track event.');
      const ctx = buildClientNinetailedRequestContext();
      localOnly = payload.localOnly;
      await createEvent(
        buildTrackEvent({
          // doing this here as the anonymous id is set to late from init
          anonymousId: profile?.id || payload.anonymousId,
          messageId: payload.meta.rid,
          timestamp: payload.meta.ts,
          event: payload.event,
          properties: payload.properties,
          ctx,
        }),
        instance
      );
    },
    identify: async ({ payload, instance }) => {
      debug.log('Sending Identify event.');
      localOnly = payload.localOnly;
      const ctx = buildClientNinetailedRequestContext();
      await createEvent(
        buildIdentifyEvent({
          // doing this here as the anonymous id is set to late from init
          anonymousId: profile?.id || payload.anonymousId,
          messageId: payload.meta.rid,
          timestamp: payload.meta.ts,
          traits: payload.traits,
          userId: payload.userId,
          ctx,
        }),
        instance
      );
    },
    loaded: () => {
      return isInitialized;
    },
    methods: {
      reset: async (...args) => {
        const instance = args[args.length - 1];
        const cache = Cache.reset({ instance });
        await instance.storage.setItem('__anon_id', cache.id);
        instance.dispatch({
          type: NINETAILED_TRACKER_EVENTS.profile,
          profile: {
            id: cache.id,
            random: 0,
            audiences: [],
            traits: {},
            location: {},
          },
          cache: cache,
        });
        await delay(10);
      },
      debug: (enabled: boolean) => {
        if (enabled) {
          debug.enable();
          debug.log('Debug mode is now enabled.');
        } else {
          debug.disable();
          debug.log('Debug mode is now disabled.');
        }
      },
    },
  };
};
