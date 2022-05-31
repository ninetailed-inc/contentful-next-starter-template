import React from 'react';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';
import {
  NinetailedProvider,
  NinetailedSsrPlugin,
} from '@ninetailed/experience.js-next';

const B2BDemoApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="app">
      <HubspotProvider>
        <NinetailedProvider
          plugins={[NinetailedSsrPlugin()]}
          clientId={process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? ''}
          environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
        >
          <Component {...pageProps} />
        </NinetailedProvider>
      </HubspotProvider>
    </div>
  );
};

export default B2BDemoApp;
