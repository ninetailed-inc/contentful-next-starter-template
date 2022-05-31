import React, { useMemo } from 'react';
import { AnalyticsPlugin } from 'analytics';
import { Ninetailed } from '@ninetailed/experience.js';
import { Profile, Locale } from '@ninetailed/experience.js-shared';

import { NinetailedContext } from './NinetailedContext';

export type NinetailedProviderProps = {
  clientId: string;
  environment?: string;
  preview?: boolean;
  url?: string;
  plugins?: (AnalyticsPlugin | AnalyticsPlugin[])[];
  profile?: Profile;
  locale?: Locale;
  requestTimeout?: number;
};

export const NinetailedProvider: React.FC<NinetailedProviderProps> = ({
  children,
  clientId,
  environment,
  preview,
  url,
  profile,
  locale,
  requestTimeout,
  plugins = [],
}) => {
  const ninetailed = useMemo(
    () =>
      new Ninetailed(
        { clientId, environment, preview },
        { url, plugins, profile, locale, requestTimeout }
      ),
    []
  );

  return (
    <NinetailedContext.Provider value={ninetailed}>
      {children}
    </NinetailedContext.Provider>
  );
};
