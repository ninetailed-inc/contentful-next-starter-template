import { Object } from 'ts-toolbelt';

import type { GeoLocation, Traits } from '../Profile';
import type {
  Pageview,
  Track,
  Identify,
  Screen,
  Group,
  Alias,
  EventType,
} from './EventType';

export type Query = { [key: string]: string };

export type CampaignContext = {
  name?: string;
  source?: string;
  medium?: string;
  term?: string;
  content?: string;
};

export type PageContext = {
  path: string;
  query: Query;
  referrer: string;
  search: string;
  url: string;
};

export type Properties = {
  [key: string]: string | number | boolean | Properties;
};

export type EventChanel = 'mobile' | 'web' | 'server';

export type SharedEventProperties = {
  anonymousId: string;
  channel: EventChanel;
  context: {
    app: {
      name: string;
      version: string;
    };
    campaign: CampaignContext;
    library: { name: string; version: string };
    locale: string;
    page: PageContext;
    userAgent?: string;
    gdpr: {
      isConsentGiven: boolean;
    };
    location?: GeoLocation;
  };
  messageId: string;
  originalTimestamp: string;
  sentAt: string;
  type: EventType;
  userId?: string;
};

export type PageviewProperties = Properties & {
  path: string;
  query: Query;
  referrer: string;
  search: string;
  title: string;
  url: string;
  category?: string;
};

export type PageviewEvent = Object.Merge<
  SharedEventProperties,
  {
    type: Pageview;
    name?: string;
    properties: PageviewProperties;
  },
  'deep'
>;

export type TrackEvent = Object.Merge<
  SharedEventProperties,
  {
    type: Track;
    event: string;
    properties: Properties;
  },
  'deep'
>;

export type IdentifyEvent = Object.Merge<
  SharedEventProperties,
  {
    type: Identify;
    traits: Traits;
  },
  'deep'
>;

export type ScreenEvent = SharedEventProperties & {
  type: Screen;
};

export type GroupEvent = SharedEventProperties & {
  type: Group;
};

export type AliasEvent = SharedEventProperties & {
  type: Alias;
};

export type Event =
  | PageviewEvent
  | TrackEvent
  | IdentifyEvent
  | ScreenEvent
  | GroupEvent
  | AliasEvent;
