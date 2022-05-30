import { Query } from '../types';

export const buildQuery = (url: string): Query => {
  const result: Query = {};
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.forEach((value, key) => {
      result[key] = value;
    });
  } catch (error) {}
  return result;
};
