import { PageContext } from "../Event";

export type Session = {
  /**
   * A uuid which gets generated when the session was created.
   */
  id: string;
  /**
   * The start time of the session as UTC time
   */
  startsAt: string;
  /**
   * The end time of the session as UTC time
   */
  endsAt: string;
  /**
   *
   */
  landingPage: PageContext;
};
