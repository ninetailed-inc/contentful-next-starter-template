import { NinetailedAPIClient } from './Client';

export type Options = {
  url?: string;
};

export const ninetailed = (apiKey: string, options?: Options) => {
  return new NinetailedAPIClient({ apiKey, ...options });
};

export default ninetailed;
