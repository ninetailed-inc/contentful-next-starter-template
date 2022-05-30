import { AppProps } from 'next/app';
import Head from 'next/head';
import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { NinetailedGoogleAnalyticsPlugin } from '@ninetailed/experience.js-plugin-google-analytics';
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview'
import { NinetailedSegmentPlugin } from '@ninetailed/experience.js-plugin-segment'

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    // <NinetailedProvider clientId="d6b38b25-9646-41eb-8492-8cc7b3508202" url="https://develop-api.ninetailed.co" plugins={[NinetailedGoogleAnalyticsPlugins({ trackingId: 'UA-11' })]}>
    <NinetailedProvider clientId="d6b38b25-9646-41eb-8492-8cc7b3508202" url="https://develop-api.ninetailed.co" plugins={[
      NinetailedPreviewPlugin({ clientId: "237264f6-5ec2-4450-b9f5-fcabf526addc", secret: "4b1c93a9-7dfe-4793-84f0-e9facec2f875", environment: "main", ui: { opener: { hide: false } } }),
      // NinetailedSegmentPlugin({ writeKey: "y6XleGK4KDipB91ac2TzxF0R0GeUn17r", audiencePropertyTemplate: "{{audience.name || 'baseline'}}" }),
      // NinetailedGoogleAnalyticsPlugin({ trackingId: 'UA-11' })
    ]}>
      <Head>
        <title>Welcome to next-js!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </NinetailedProvider>
  );
}

export default CustomApp;
