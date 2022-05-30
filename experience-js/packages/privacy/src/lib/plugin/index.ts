import { AnalyticsInstance, AnalyticsPlugin } from 'analytics';
import startsWith from 'lodash/startsWith';
import union from 'lodash/union';
import includes from 'lodash/includes';
import pick from 'lodash/pick';
import { getCookie, setCookie } from '@analytics/cookie-utils';
import * as localStorage from '@analytics/storage-utils';
import { EventType } from '@ninetailed/experience-api-types';

declare global {
  interface Window {
    ninetailed?: any;
  }
}

const CONSENT = '__nt-consent__';
const ANON_ID = '__anon_id';
const PRIVACY_MANAGED_KEYS = '__nt-privacy-keys__';

const SESSION_ID_COOKIE = 'nt-session-id';
const SESSION_ID_COOKIE_TTL = 31536000;

export const PLUGIN_NAME = 'ninetailed:privacy';

const isConsentGiven = () => {
  const consent = localStorage.getItem(CONSENT);
  return consent && consent === 'accepted';
};

const addPrivacyManagedKey = (key: string) => {
  const privacyManagedKeys = localStorage.getItem(PRIVACY_MANAGED_KEYS);
  if (privacyManagedKeys && Array.isArray(privacyManagedKeys)) {
    localStorage.setItem(
      PRIVACY_MANAGED_KEYS,
      union([...privacyManagedKeys, key])
    );
  } else {
    localStorage.setItem(PRIVACY_MANAGED_KEYS, [key]);
  }
};

const clearPrivacyManagedKeys = () => {
  const privacyManagedKeys = localStorage.getItem(PRIVACY_MANAGED_KEYS);
  if (privacyManagedKeys && Array.isArray(privacyManagedKeys)) {
    privacyManagedKeys.forEach((key) => localStorage.removeItem(key));
  }
};

const hasExistingSession = () => {
  const anonymousId = getCookie(SESSION_ID_COOKIE);
  return !!anonymousId;
};

const resetSessionId = async (instance: AnalyticsInstance) => {
  await instance.plugins['ninetailed'].reset;
  const anonymousId = instance.storage.getItem(ANON_ID);
  setCookie(SESSION_ID_COOKIE, anonymousId, SESSION_ID_COOKIE_TTL);
};

const pickAllowedKeys = (object: any, allowedKeys: string[]) => {
  if (includes(allowedKeys, '*')) {
    return object;
  }
  return pick(object, allowedKeys);
};

type PrivacyConfig = {
  allowedEvents: EventType[];
  allowedPageEventProperties: string[];
  allowedTrackEventProperties: string[];
  allowedTraits: string[];
  blockProfileMerging: boolean;
};

const DEFAULT_PRIVACY_CONFIG: PrivacyConfig = {
  allowedEvents: ['page', 'track'],
  allowedPageEventProperties: ['*'],
  allowedTrackEventProperties: [],
  allowedTraits: [],
  blockProfileMerging: true,
};

export const NinetailedPrivacyPlugin = (
  config: PrivacyConfig = DEFAULT_PRIVACY_CONFIG
): AnalyticsPlugin => {
  const handleEventStart = (eventType: EventType) => ({ abort }) => {
    if (!isConsentGiven() && !includes(config.allowedEvents, eventType)) {
      return abort();
    }
  };

  return {
    name: PLUGIN_NAME,
    config: {},
    initialize: async ({ instance }) => {
      if (!isConsentGiven() && !hasExistingSession()) {
        await resetSessionId(instance);
        clearPrivacyManagedKeys();
      }

      window.ninetailed = Object.assign({}, window.ninetailed, {
        consent: instance.plugins[PLUGIN_NAME].consent,
      });
    },
    pageStart: handleEventStart('page'),
    ['page:ninetailed']: ({ payload, abort }) => {
      const properties = pickAllowedKeys(
        payload.properties,
        config.allowedPageEventProperties
      );

      if (!isConsentGiven()) {
        return { ...payload, localOnly: true, properties };
      }
      return payload;
    },
    trackStart: handleEventStart('track'),
    ['track:ninetailed']: ({ payload, abort }) => {
      const properties = pickAllowedKeys(
        payload.properties,
        config.allowedTrackEventProperties
      );

      if (!isConsentGiven()) {
        return { ...payload, localOnly: true, properties };
      }
      return payload;
    },
    identifyStart: handleEventStart('identify'),
    ['identify:ninetailed']: ({ payload }) => {
      const traits = pickAllowedKeys(payload.properties, config.allowedTraits);
      const userId = config.blockProfileMerging ? '' : payload.userId;

      if (!isConsentGiven()) {
        return { ...payload, localOnly: true, traits, userId };
      }
      return payload;
    },
    setItemStart: ({ payload }) => {
      const { key } = payload;

      if (startsWith(key, '__nt')) {
        addPrivacyManagedKey(key);
      }
    },
    loaded: () => true,
    methods: {
      consent: (accepted: boolean) => {
        if (accepted) {
          localStorage.setItem(CONSENT, 'accepted');
        } else {
          localStorage.removeItem(CONSENT);
        }
      },
    },
  };
};
