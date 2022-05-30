import stringify from 'fast-safe-stringify';

import { ImageLoader } from 'next/image';
import { IPage } from '@/types/contentful';

export const parsePage = (page: unknown): IPage => {
  // Kill circular references
  return JSON.parse(stringify(page)) as IPage;
};

export const ContentfulImageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 25}`;
};
