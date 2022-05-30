import { AnalyticsInstance } from 'analytics';
import { useAnalytics } from 'use-analytics';

import { PLUGIN_NAME } from '../plugin';

type ConsentFn = (consent: boolean) => void;

export const useNinetailedPrivacy = () => {
  const analyticsInstance: AnalyticsInstance = useAnalytics();

  const plugin = analyticsInstance.plugins[PLUGIN_NAME];

  if (!plugin) {
    throw new Error('The Ninetailed privacy plugin is not installed.');
  }

  return { consent: plugin.consent as ConsentFn };
};
