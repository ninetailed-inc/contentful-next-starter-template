import { PageContext } from "../Event";

export type SessionStatistics = {
  isReturningVisitor: boolean;
  landingPage: PageContext;
  count: number;
  activeSessionLength: number;
  averageSessionLength: number;
}
