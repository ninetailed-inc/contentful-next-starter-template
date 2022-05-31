import { Object } from 'ts-toolbelt';
import { TrackEvent } from '../types';

import { buildEvent, BuildEventArgs } from './build-event';

type BuildTrackEventArgs = Object.Omit<
  Object.Merge<
    BuildEventArgs,
    {
      event: string;
      properties: any;
    },
    'deep'
  >,
  'type'
>;

export const buildTrackEvent = (data: BuildTrackEventArgs): TrackEvent => {
  return {
    ...buildEvent({ ...data, type: 'track' }),
    event: data.event,
    properties: data.properties,
  };
};
