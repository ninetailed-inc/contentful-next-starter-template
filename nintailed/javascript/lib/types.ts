import { Profile } from "@ninetailed/experience.js-shared";

export type ProfileState = {
  loading: boolean;
  profile?: Profile;
  error?: Error;
  from: 'api' | 'hydrated';
};
