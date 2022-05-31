import { AudienceSignals, GeoLocation, Traits } from "../Profile";
import { Session, SessionStatistics } from "../Session";

export type Cache = {
  id: string;
  random: number;
  signals: AudienceSignals;
  traitsUpdatedAt: string;
  audiences: string[];
  traits: Traits;
  location: GeoLocation;
  sessions: Session[];
  session: SessionStatistics;
};
