import { AnalyticsInstance } from 'analytics';
import { buildEmptyCache, Cache } from '@ninetailed/experience.js-shared';

const NINETAILED_CACHE_KEY = '__nt-cache__';

type CacheOptions = {
  instance: AnalyticsInstance;
};

export const initialize = (
  { instance }: CacheOptions,
  data: Partial<Cache> = {}
): Cache => {
  const cache = buildEmptyCache();

  instance.storage.setItem(NINETAILED_CACHE_KEY, { ...cache, ...data });

  return cache;
};

export const get = ({ instance }: CacheOptions): Cache | null => {
  const cache = instance.storage.getItem(NINETAILED_CACHE_KEY);

  return cache;
};

export const set = (cache: Cache, { instance }: CacheOptions) => {
  instance.storage.setItem(NINETAILED_CACHE_KEY, cache);

  return cache;
};

export const remove = ({ instance }: CacheOptions) => {
  instance.storage.removeItem(NINETAILED_CACHE_KEY);
};

export const reset = ({ instance }: CacheOptions) => {
  return initialize({ instance });
};
