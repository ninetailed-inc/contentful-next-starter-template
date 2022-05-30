import { AnalyticsPlugin } from 'analytics';
import Cookies from 'js-cookie';
import {
  NINETAILED_ANONYMOUS_ID_COOKIE,
  NINETAILED_PROFILE_CACHE_COOKIE,
} from './constants';

export const NinetailedSsrPlugin = (): AnalyticsPlugin => {
  return {
    name: 'ninetailed:ssr',
    profile: ({ payload }) => {
      console.log({ 'SSR:payload:': payload });
      if (payload.profile) {
        Cookies.set(NINETAILED_ANONYMOUS_ID_COOKIE, payload.profile.id);
      }

      if (payload.cache) {
        Cookies.set(
          NINETAILED_PROFILE_CACHE_COOKIE,
          JSON.stringify(payload.cache)
        );
      }
    },
  };
};
