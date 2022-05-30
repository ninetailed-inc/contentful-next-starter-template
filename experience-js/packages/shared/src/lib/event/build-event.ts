import { NinetailedRequestContext, EventType, SharedEventProperties } from '../types';
import { buildCampaign } from './build-campaign';
import { buildPage } from './build-page';

export type BuildEventArgs = {
  anonymousId: string;
  messageId: string;
  timestamp: number;
  type: EventType;
  ctx: NinetailedRequestContext;
};

export const buildEvent = ({
  anonymousId,
  messageId,
  timestamp,
  type,
  ctx,
}: BuildEventArgs): SharedEventProperties => {
  const date = new Date(timestamp).toISOString();

  return {
    channel: 'web',
    context: {
      app: {
        // TODO fetch from package.json
        name: 'Ninetailed Analytics SDK',
        version: '0.2.0',
      },
      library: {
        name: 'Ninetailed React Analytics SDK',
        version: '0.2.0',
      },
      userAgent: ctx.userAgent,
      campaign: buildCampaign(ctx),
      locale: ctx.locale,
      page: buildPage(ctx),
      gdpr: {
        isConsentGiven: true,
      },
    },
    messageId: messageId,
    originalTimestamp: date,
    anonymousId: anonymousId,
    sentAt: date,
    type,
  };
};
