import React, { useMemo } from 'react';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';
import {
  NinetailedProvider,
  Profile,
  NinetailedSsrPlugin,
} from '@ninetailed/experience.js-next';

/* import { NinetailedSsrPlugin } from 'experience-js/packages/ssr/src'; */

/* import {
  NinetailedProvider,
  Profile,
  NinetailedSsrPlugin,
} from 'experience-js/packages/nextjs/src'; */

// import { ninetailedPreviewPlugin } from '@ninetailed/experience-sdk-preview';
import Cookies from 'js-cookie';
import { IPage } from '@/types/contentful';

interface IPageProps {
  page: IPage;
  ninetailed: { audiences: string[] };
}

const B2BDemoApp = ({ Component, pageProps }: AppProps) => {
  console.log('-------------_RENDER-----------------');
  const { ninetailed, page } = pageProps as IPageProps;
  console.log({ 'APP:': page });
  const audiences = ninetailed?.audiences || [];
  console.log({ 'APP:audiences': audiences });
  const profile = useMemo(() => {
    const id = Cookies.get('ntaid') as string;
    console.log({ 'APP:ntaid': id });
    const defaultProfile: Profile = {
      id,
      random: 0,
      audiences,
      traits: {},
      session: {
        isReturningVisitor: false,
        count: 0,
        landingPage: {
          path: '',
          query: {},
          referrer: '',
          search: '',
          url: '',
        },
        activeSessionLength: 0,
        averageSessionLength: 0,
      },
      location: {},
    };
    return defaultProfile;
  }, []);

  console.log({ 'APP:pageProps': pageProps });
  console.log({
    'APP:NINETAILED_API_KEY': process.env.NEXT_PUBLIC_NINETAILED_API_KEY,
  });
  console.log({
    'APP:NINETAILED_ENVIRONMENT':
      process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT,
  });

  return (
    <div className="app">
      <HubspotProvider>
        <NinetailedProvider
          // analyticsPlugins={{
          //   googleAnalytics: {
          //     trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
          //     actionTemplate: 'Audience:{{ audience.name }}',
          //     labelTemplate:
          //       '{{ baselineOrVariant }}:{{ component.__typename }} - {{ component.id }}',
          //   },
          // }}
          profile={profile}
          plugins={[
            NinetailedSsrPlugin(),
            // ninetailedPreviewPlugin({ clientId: "", secret: "" })
          ]}
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
