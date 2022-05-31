import Analytics, {
  AnalyticsInstance,
  PageData,
  AnalyticsPlugin,
  DetachListeners,
} from 'analytics';
import {
  Locale,
  Traits,
  Profile,
  Variant,
} from '@ninetailed/experience.js-shared';
import flatten from 'lodash/flatten';

import {
  ninetailedPlugin,
  NINETAILED_TRACKER_EVENTS,
  PLUGIN_NAME,
} from './analytics';
import { ProfileState } from './types';

type Options = {
  url?: string;
  locale?: Locale;
  plugins?: (AnalyticsPlugin | AnalyticsPlugin[])[];
  profile?: Profile;
  requestTimeout?: number;
};

type EventFunctionOptions = {
  plugins?: {
    all: boolean;
    [key: string]: boolean;
  };
};

type OnProfileChangeCallback = (profile: ProfileState) => void;

export type Page = (
  data?: PageData,
  options?: EventFunctionOptions
) => Promise<void>;

export type Track = (
  event: string,
  payload?: unknown,
  options?: EventFunctionOptions
) => Promise<void>;

export type TrackHasSeenComponent = (payload: {
  variant: Variant<unknown>;
  audience: { id: string };
  isPersonalized: boolean;
}) => Promise<void>;

export type Identify = (
  uid: string,
  traits?: Traits,
  options?: EventFunctionOptions
) => Promise<void>;

export type Reset = () => void;

export type Debug = (enable: boolean) => void;

export type OnProfileChange = (cb: OnProfileChangeCallback) => DetachListeners;

export interface NinetailedInstance {
  page: Page;
  track: Track;
  trackHasSeenComponent: TrackHasSeenComponent;
  identify: Identify;
  reset: Reset;
  debug: Debug;
  profileState: ProfileState;
  onProfileChange: OnProfileChange;
}

export class Ninetailed implements NinetailedInstance {
  private readonly instance: AnalyticsInstance;
  private readonly plugins: AnalyticsPlugin[];
  private _profileState: ProfileState;

  constructor(
    {
      clientId,
      environment,
    }: { clientId: string; environment?: string; preview?: boolean },
    { plugins, url, profile, locale, requestTimeout }: Options = {}
  ) {
    this.plugins = flatten<AnalyticsPlugin>(plugins || []);
    this._profileState = {
      loading: !profile,
      profile,
      error: undefined,
      from: profile ? 'hydrated' : 'api',
    };
    this.instance = Analytics({
      app: 'ninetailed',
      plugins: [
        ...this.plugins,
        ninetailedPlugin({
          clientId,
          environment,
          url,
          profile,
          locale,
          requestTimeout,
        }),
      ],
    });

    // put in private method
    this.onProfileChange((profileState) => {
      this._profileState = profileState;
    });

    this.registerWindowHandlers();
  }

  public page = (data?: PageData, options?: EventFunctionOptions) => {
    return this.instance.page(data, this.buildOptions(options));
  };

  public track = (
    event: string,
    payload?: unknown,
    options?: EventFunctionOptions
  ) => {
    return this.instance.track(event, payload, this.buildOptions(options));
  };

  public trackHasSeenComponent: TrackHasSeenComponent = (payload) => {
    return this.track('hasSeenComponent', payload, {
      plugins: { all: true, ninetailed: false },
    });
  };

  public identify = (
    uid: string,
    traits?: Traits,
    options?: EventFunctionOptions
  ) => {
    return this.instance.identify(uid, traits, this.buildOptions(options));
  };

  public reset = () => {
    return this.instance.plugins[PLUGIN_NAME].reset();
  };

  public debug = (enabled: boolean) => {
    return this.instance.plugins[PLUGIN_NAME].debug(enabled);
  };

  public onProfileChange = (cb: OnProfileChangeCallback) => {
    cb(this.profileState);

    return this.instance.on(
      NINETAILED_TRACKER_EVENTS.profile,
      ({ payload }) => {
        cb({
          ...this._profileState,
          loading: false,
          profile: payload.profile,
          error: undefined,
        });
      }
    );
  };

  public get profileState() {
    return this._profileState;
  }

  private buildOptions(
    options: EventFunctionOptions = {}
  ): EventFunctionOptions {
    return {
      ...options,
      // plugins: {
      //   all: false,
      //   ninetailed: true,
      //   ...this.plugins
      //     .map((plugin) => plugin as NamedAnalyticsPlugin)
      //     .filter((plugin) => includes(plugin.name, 'ninetailed:'))
      //     .reduce(
      //       (acc, curr) => ({
      //         ...acc,
      //         [curr.name]: true,
      //       }),
      //       {}
      //     ),
      //   ...get(options, 'plugins'),
      // },
    };
  }

  private registerWindowHandlers() {
    if (typeof window !== 'undefined') {
      window.ninetailed = Object.assign({}, window.ninetailed, {
        page: this.page.bind(this),
        track: this.track.bind(this),
        trackHasSeenComponent: this.trackHasSeenComponent.bind(this),
        identify: this.identify.bind(this),
        reset: this.reset.bind(this),
        debug: this.debug.bind(this),
      });
    }
  }
}
