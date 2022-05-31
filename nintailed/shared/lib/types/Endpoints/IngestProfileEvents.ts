import { Event } from '../Event';
import { AudienceSignals, GeoLocation, Profile, Traits } from '../Profile';
import { Locale } from '../Localization';
import { Session } from '../Session';

// Rename to IngestProfileEventsRequestPayload?
export type IngestProfileEventsRequestBody = {
  events: Event[];
  // TODO clean those up into nested fields
  traitsUpdatedAt: string;
  traits: Traits;
  signals: AudienceSignals;
  sessions: Session[];
  localOnly: boolean;
  preview: boolean;
  ip?: string;
  location?: GeoLocation;
  options?: {
    locale?: Locale;
  };
};

// Rename to IngestProfileEventsResponsePayload?
export type IngestProfileEventsResponseBody = {
  message: string;
  data: {
    profile: Profile;
    signals: AudienceSignals;
    traitsUpdatedAt: string;
    sessions: Session[];
  };
  error: boolean;
};
