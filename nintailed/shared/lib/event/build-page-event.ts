import { PageviewEvent, Properties } from '../types';
import { Object } from 'ts-toolbelt';

import { buildEvent, BuildEventArgs } from './build-event';
import { buildPage } from './build-page';

type BuildPageEventArgs = Object.Omit<
  Object.Merge<
    BuildEventArgs,
    {
      properties: Properties;
    },
    'deep'
  >,
  'type'
>;

export const buildPageEvent = (data: BuildPageEventArgs): PageviewEvent => {
  return {
    ...buildEvent({ ...data, type: 'page' }),
    properties: {
      ...data.properties,
      ...buildPage(data.ctx),
      title: data.ctx.document?.title || '',
    },
  };
};
