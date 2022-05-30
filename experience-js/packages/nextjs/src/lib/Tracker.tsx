import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useNinetailed } from '@ninetailed/experience.js-react';

type TrackerProps = {
  isFirstPageviewAlreadyTracked: boolean;
};

export const Tracker: React.FC<TrackerProps> = ({
  isFirstPageviewAlreadyTracked,
}) => {
  const router = useRouter();
  const { page } = useNinetailed();
  const lastFiredPageRef = useRef(
    isFirstPageviewAlreadyTracked ? 'tracked' : 'none'
  );
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (
        lastFiredPageRef.current !== url &&
        lastFiredPageRef.current !== 'tracked'
      ) {
        page();
        lastFiredPageRef.current = url;
      }
    };

    handleRouteChange(router.asPath);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return null;
};
