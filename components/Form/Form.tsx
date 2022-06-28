import React, { useEffect, useState } from 'react';
import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';
import { useNinetailed, useProfile } from '@ninetailed/experience.js-next';
import find from 'lodash/find';
import { Form as ContactForm, Field } from 'react-final-form';
import { IForm } from '@/types/contentful';

/* interface IMessageEvent {
  type: string;
  eventName: string;
  data: Record<string, string>[] | undefined;
} */

export const Form: React.FC<IForm> = () => {
  const { profile } = useProfile();
  const { identify } = useNinetailed();
  /* const [anonymousIdInput, setAnonymousIdInput] =
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
        console.log({ 'anonymousId:': anonymousId });
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
    /!* region: fields.hubspotPortalRegion, *!/
    portalId: fields.hubspotPortalId,
    formId: fields.hubspotFormId,
  });
*/
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const [showForm, setShowForm] = useState<boolean>(true);

  const onSubmit = async (values: FormTraits) => {
    console.log(values);
    if (profile) {
      identify(profile.id, values)
        .then((_) => {
          return _;
        })
        .catch((e: Error) => {
          return e;
        });
    }
    setShowForm(false);
  };
  type ErrorType = {
    [key: string]: unknown;
  };

  type FormTraits = {
    [key: string]: string;
  };

  const defaultErrorMessage = 'Please complete this required field';
  return (
    <>
      <div
        className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-12 lg:max-w-7xl"
        id="form"
      />
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-12 lg:max-w-7xl">
        {showForm ? (
          <ContactForm
            onSubmit={onSubmit}
            initialValues={{ companySize: 'defaultValue' }}
            validate={(values) => {
              const errors = {} as ErrorType;
              if (!values.firstname) {
                errors.firstname = defaultErrorMessage;
              }
              if (!values.lastname) {
                errors.lastname = defaultErrorMessage;
              }
              if (!values.companyName) {
                errors.companyName = defaultErrorMessage;
              }
              if (
                !values.companySize ||
                values.companySize === 'defaultValue'
              ) {
                errors.companySize = defaultErrorMessage;
              }
              if (!values.businessEmail) {
                errors.businessEmail = defaultErrorMessage;
              }
              return errors;
            }}
            render={({ handleSubmit, values }) => {
              return (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-4 items-start"
                >
                  <fieldset className="flex flex-row w-full justify-between">
                    <Field name="firstname">
                      {({ input, meta }) => {
                        return (
                          <div className="w-[48%] flex flex-col">
                            <label htmlFor="firstname" className="text-[14px]">
                              First Name
                              <span className="text-[#f2545b]">*</span>
                            </label>
                            <input
                              {...input}
                              type="text"
                              placeholder="First Name"
                              className="border-2 bg-[#f5f8fa] h-[40px] px-[15px] border-[1px] rounded-[3px] border-[#cbd6e2] focus:outline-indigo-600"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-[#f2545b] text-[14px]">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    </Field>
                    <Field name="lastname">
                      {({ input, meta }) => {
                        return (
                          <div className="w-[48%] flex flex-col">
                            <label htmlFor="lastname" className="text-[14px]">
                              Last Name<span className="text-[#f2545b]">*</span>
                            </label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Last Name"
                              className="border-2 bg-[#f5f8fa] h-[40px] px-[15px] focus:outline-indigo-600 border-[1px] rounded-[3px] border-[#cbd6e2]"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-[#f2545b] text-[14px]">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    </Field>
                  </fieldset>
                  <fieldset className="flex flex-row w-full">
                    <Field name="companyName">
                      {({ input, meta }) => {
                        return (
                          <div className="w-full flex flex-col">
                            <label
                              htmlFor="companyName"
                              className="text-[14px]"
                            >
                              Company name
                              <span className="text-[#f2545b]">*</span>
                            </label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Company name"
                              className="border-2 bg-[#f5f8fa] h-[40px] px-[15px] focus:outline-indigo-600 border-[1px] rounded-[3px] border-[#cbd6e2]"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-[#f2545b] text-[14px]">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    </Field>
                  </fieldset>

                  <fieldset className="flex flex-col w-full ">
                    <label htmlFor="companySize" className="text-[14px]">
                      Company Size<span className="text-[#f2545b]">*</span>
                    </label>
                    <Field name="companySize" placeholder="Select your option">
                      {({ input, meta }) => {
                        /* console.log({ 'INPUT:': input });
                      console.log({ 'Meta:': meta }); */
                        return (
                          <>
                            <select
                              {...input}
                              className={` border-2 bg-[#f5f8fa] h-[40px] px-[15px] focus:outline-indigo-600 border-[1px] rounded-[3px] border-[#cbd6e2] ${
                                input.value === 'defaultValue'
                                  ? 'text-gray-400'
                                  : ''
                              }`}
                            >
                              <option value="defaultValue" disabled>
                                Select your option
                              </option>
                              <option value="1-50">1-50</option>
                              <option value="51-200">51-200</option>
                              <option value="201-500">201-500</option>
                              <option value="501-1000">501-1000</option>
                              <option value="1001-2000">1001-2000</option>
                              <option value="more than 2000">
                                more than 2000
                              </option>
                            </select>
                            {meta.error && meta.touched && (
                              <span className="text-[#f2545b] text-[14px]">
                                {meta.error}
                              </span>
                            )}
                          </>
                        );
                      }}
                    </Field>
                  </fieldset>
                  <fieldset className="flex flex-row w-full">
                    <Field name="businessEmail">
                      {({ input, meta }) => {
                        return (
                          <div className="w-full flex flex-col">
                            <label
                              htmlFor="businessEmail"
                              className="text-[14px]"
                            >
                              Business Email
                              <span className="text-[#f2545b]">*</span>
                            </label>
                            <input
                              {...input}
                              type="text"
                              placeholder="Business Email"
                              className="border-2 bg-[#f5f8fa] h-[40px] px-[15px] focus:outline-indigo-600 border-[1px] rounded-[3px] border-[#cbd6e2]"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-[#f2545b] text-[14px]">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        );
                      }}
                    </Field>
                  </fieldset>

                  <button
                    className="bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                    type="submit"
                  >
                    Submit
                  </button>
                  {/* <pre>{JSON.stringify(values, null, 3)}</pre> */}
                </form>
              );
            }}
          />
        ) : (
          <h2>Thanks for submitting</h2>
        )}
      </div>
    </>
  );
};
