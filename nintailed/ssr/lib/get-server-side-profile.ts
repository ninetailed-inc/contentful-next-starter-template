import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import {
  buildPageEvent,
  buildEmptyCache,
  Cache,
  NinetailedRequestContext,
  Profile,
} from '@ninetailed/experience.js-shared';

import {
  NINETAILED_ANONYMOUS_ID_COOKIE,
  NINETAILED_PROFILE_CACHE_COOKIE,
} from './constants';

const BASE_URL = 'https://api.ninetailed.co';

type Cookies = { [key: string]: string };

type GetServerSideProfileOptions = {
  ctx: NinetailedRequestContext;
  cookies: Cookies;
  clientId: string;
  environment: string;
  url?: string;
};

export const getProfileCache = (cookies: Cookies): Cache => {
  const cacheString = cookies[NINETAILED_PROFILE_CACHE_COOKIE];

  if (cacheString) {
    try {
      return JSON.parse(decodeURIComponent(cacheString));
    } catch (error) {
      console.error(error);
    }
  }
  console.log({ 'GSSP:cacheString': cacheString });
  return buildEmptyCache();
};

export const getServerSideProfile = async ({
  ctx,
  cookies,
  clientId,
  environment,
  url = BASE_URL,
}: GetServerSideProfileOptions): Promise<Profile> => {
  const anonymousIdCookieString = cookies[NINETAILED_ANONYMOUS_ID_COOKIE];
  const anonymousId = anonymousIdCookieString
    ? decodeURIComponent(anonymousIdCookieString)
    : uuid();
  const cacheFromCookie = getProfileCache(cookies);

  const pageEvent = buildPageEvent({
    ctx,
    anonymousId: anonymousId,
    messageId: uuid(),
    timestamp: Date.now(),
    properties: {},
  });

  const request = await fetch(
    `${url}/organizations/${clientId}/environments/${environment}/profiles/${anonymousId}/events`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events: [pageEvent], ...cacheFromCookie }),
    }
  );

  const {
    data: { profile },
  } = (await request.json()) as { data: { profile: Profile } };

  return profile;
};
