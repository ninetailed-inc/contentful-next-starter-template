import { v4 as uuid } from 'uuid';
import { Cache } from '../types';

export const buildEmptyCache = (): Cache => ({
  id: uuid(),
  random: 0,
  signals: {},
  traitsUpdatedAt: new Date().toISOString(),
  audiences: [],
  traits: {},
  location: {},
  sessions: [],
  session: {
    isReturningVisitor: false,
    landingPage: {
      path: '',
      query: {},
      referrer: '',
      search: '',
      url: ''
    },
    count: 1,
    activeSessionLength: 0,
    averageSessionLength: 0
  }
});
