import { Object } from 'ts-toolbelt';
import { IdentifyEvent, Traits } from '../types';

import { buildEvent, BuildEventArgs } from './build-event';

type IdentifyEventArgs = Object.Omit<
  Object.Merge<
    BuildEventArgs,
    {
      userId: string;
      traits: Traits;
    }
  >,
  'type'
>;

export const buildIdentifyEvent = (data: IdentifyEventArgs): IdentifyEvent => {
  return {
    ...buildEvent({ ...data, type: 'identify' }),
    traits: data.traits,
    userId: data.userId,
  };
};
