import * as debug from './debug';
import {
  AudienceSignals,
  IngestProfileEventsRequestBody,
  IngestProfileEventsResponseBody,
  Profile,
  Session,
} from '@ninetailed/experience.js-shared';

const BASE_URL = 'https://api.ninetailed.co';

type NinetailedApiClientOptions = {
  clientId: string;
  environment: string;

  url?: string;
};

type ProfileOptions = IngestProfileEventsRequestBody & {
  timeout?: number;
};

type ProfileResponse = {
  profile: Profile;
  signals: AudienceSignals;
  traitsUpdatedAt: string;
  sessions: Session[];
};

type RequestInitWithTimeout = RequestInit & {
  timeout: number;
};

const fetchWithTimeout = async (
  input: RequestInfo,
  init?: RequestInitWithTimeout
) => {
  const { timeout } = init;

  const controller = new AbortController();
  const id = setTimeout(() => {
    debug.log(`Profile Request timed out.`);
    controller.abort();
  }, timeout);
  const response = await fetch(input, {
    ...init,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export class NinetailedApiClient {
  private readonly clientId: string;
  private readonly environment: string;
  private readonly url: string;

  constructor({
    clientId,
    environment = 'main',
    url = BASE_URL,
  }: NinetailedApiClientOptions) {
    this.clientId = clientId;
    this.environment = environment;
    this.url = url;
  }

  public async profile(options: ProfileOptions): Promise<ProfileResponse> {
    debug.log('Sending Profile Request.');
    const { events } = options;
    // TODO throw error if not all events have same anon id.
    const anonymousId = events[0].anonymousId;
    const body: IngestProfileEventsRequestBody = options;
    debug.log('Profile Request Body: ', body);
    try {
      const request = await fetchWithTimeout(
        `${this.url}/v1/organizations/${this.clientId}/environments/${this.environment}/profiles/${anonymousId}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          timeout: options.timeout || 3000,
        }
      );
      debug.log('Profile Request: ', request);
      const { data } =
        (await request.json()) as IngestProfileEventsResponseBody;
      debug.log('Profile Request completed.');
      return data;
    } catch (error) {
      // TODO only during debug.
      debug.log(error);
      throw error;
    }
  }
}
