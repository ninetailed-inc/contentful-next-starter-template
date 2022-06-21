import React from 'react';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview';

const B2BDemoApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="app">
      <HubspotProvider>
        <NinetailedProvider
          plugins={[
            NinetailedPreviewPlugin({
              clientId:
                process.env.NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID ?? '',
              secret:
                process.env.NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET ?? '',
              environment: process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? '',
              ui: { opener: { hide: false } },
            }),
          ]}
          clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ''}
          environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
        >
          <Component {...pageProps} />
        </NinetailedProvider>
      </HubspotProvider>
    </div>
  );
};

export default B2BDemoApp;
