import type { Alpha2Code } from 'i18n-iso-countries';

import { Session, SessionStatistics } from '../Session';

export type Trait = string | number | boolean | Traits;

export type Traits = {
  [key: string]: Trait;
};

export type GeoLocation = {
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  city?: string;
  postalCode?: string;
  region?: string;
  regionCode?: string;
  country?: string;
  countryCode?: Alpha2Code;
  continent?: string;
  timezone?: string;
};

/**
 *
 */
export type Profile = {
  /**
   *
   */
  id: string;
  /**
   *
   */
  random: number;
  /**
   *
   */
  audiences: string[];
  /**
   *
   */
  traits: Traits;
  /**
   *
   */
  location: GeoLocation;
  /**
   *
   */
  session: SessionStatistics;
};

export type AudienceSignal = {
  /**
   * The id of the event which triggered this Signal
   */
  id: string;
  /**
   * The timestamp of the event which triggered this signal
   */
  timestamp: string;
};

export type AudienceSignals = {
  [eventCountRuleId: string]: AudienceSignal[];
};

export type ProfileCache = {
  id: string;
  timestamp: number;
  signals: {
    [id: string]: number;
  };
  traits: Traits;
};

export declare type Variant<P> = {
  id: string;
  audience: {
    id: string;
  };
} & P;

export type IntermediateProfile = {
  /**
   *
   */
  id: string;
  /**
   *
   */
  traitsUpdatedAt: string;
  /**
   *
   */
  traits: Traits;
  /**
   *
   */
  signals: AudienceSignals;
  /**
   *
   */
  location: GeoLocation;
  /**
   *
   */
  lastEventAt: string;
  /**
   *
   */
  profileRelations: string[];
  /**
   *
   */
  sessions: Session[];
};
