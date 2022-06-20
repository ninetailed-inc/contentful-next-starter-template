import React, { useEffect, useState } from 'react';
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';
import { useNinetailed, useProfile } from '@ninetailed/experience.js-next';
import find from 'lodash/find';
import { IForm } from '@/types/contentful';

interface IMessageEvent {
  type: string;
  eventName: string;
  data: Record<string, string>[] | undefined;
}

export const Form: React.FC<IForm> = ({ fields }) => {
  const { loading, profile } = useProfile();
  const { identify } = useNinetailed();
  const [anonymousIdInput, setAnonymousIdInput] =
    useState<HTMLInputElement | null>(null);
  const [submitData, setSubmitData] = useState<Record<string, string>[]>();
  useEffect(() => {
    const listener = (event: MessageEvent<IMessageEvent>): void => {
      if (
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormReady'
      ) {
        const formIframe = document.querySelector(
          '#form > iframe'
        ) as HTMLIFrameElement;
        if (formIframe) {
          const anonymousIdInputTemp =
            formIframe.contentDocument?.querySelector(
              'input[name=ninetailedid]'
            ) as HTMLInputElement;
          setAnonymousIdInput(anonymousIdInputTemp);
        }
      }

      if (
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormSubmit'
      ) {
        setSubmitData(event.data.data);
      }

      if (
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormSubmitted'
      ) {
        const anonymousIdObject = find(submitData, {
          name: 'ninetailedid',
        }) as { name: string; value: string };
        const { value: anonymousId } = anonymousIdObject;
        const traits = submitData
          ?.filter(({ name }) => {
            return name !== 'ninetailedid';
          })
          .reduce((acc, curr) => {
            return { ...acc, [curr.name]: curr.value };
          }, {});

        identify(anonymousId, traits)
          .then((_) => {
            return _;
          })
          .catch((e: Error) => {
            return e;
          });
      }
    };
    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, [setAnonymousIdInput, setSubmitData, submitData]);

  useEffect(() => {
    if (
      profile &&
      anonymousIdInput &&
      !loading &&
      anonymousIdInput.value !== profile.id
    ) {
      anonymousIdInput.value = profile.id;
    }
  }, [anonymousIdInput, loading, profile]);

  useHubspotForm({
    target: '#form',
    /* region: fields.hubspotPortalRegion, */
    portalId: fields.hubspotPortalId,
    formId: fields.hubspotFormId,
  });

  return (
    <div
      className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-12 lg:max-w-7xl"
      id="form"
    />
  );
};
