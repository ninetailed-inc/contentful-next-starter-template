import { v4 as uuid } from 'uuid';
import {
  Event,
  IdentifyEvent,
  Traits,
  IngestEventsRequestPayload,
  IngestEventsResponsePayload,
  buildIdentifyEvent,
  NinetailedRequestContext,
} from '@ninetailed/experience.js-shared';

const _importDynamic = new Function('modulePath', 'return import(modulePath)');

async function fetch(...args) {
  const { default: fetch } = await _importDynamic('node-fetch');
  return fetch(...args);
}

type NinetailedAPIClientOptions = {
  apiKey: string;
  url?: string;
};

type SendEventOptions = {
  anonymousId?: string;
  timestamp?: number;
};

const BASE_URL = 'https://api.ninetailed.co';

export class NinetailedAPIClient {
  private readonly apiKey: string;
  private readonly url: string;

  constructor({ apiKey, url = BASE_URL }: NinetailedAPIClientOptions) {
    this.apiKey = apiKey;
    this.url = url;
  }

  public async ingestEvents(events: Event[]) {
    const payload: IngestEventsRequestPayload = {
      events,
    };
    const response = await fetch(`${this.url}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ninetailed-api-key': this.apiKey,
      },
      body: JSON.stringify(payload),
    });
    const {
      message,
      error,
    } = (await response.json()) as IngestEventsResponsePayload;
    if (error) {
      throw new Error(message);
    }
  }

  public createIdentifyEvent(
    userId: string,
    traits: Traits,
    options?: SendEventOptions
  ): IdentifyEvent {
    const messageId = uuid();
    const anonymousId = options?.anonymousId || uuid();
    const timestamp = options?.timestamp || Date.now();
    return buildIdentifyEvent({
      messageId,
      ctx: this.buildRequestContext(),
      userId,
      traits,
      anonymousId,
      timestamp,
    });
  }

  public async sendIdentifyEvent(
    userId: string,
    traits: Traits,
    options?: SendEventOptions
  ) {
    const event = this.createIdentifyEvent(userId, traits, options);
    await this.ingestEvents([event]);
  }

  private buildRequestContext() {
    const ctx: NinetailedRequestContext = {
      url: '',
      referrer: '',
      locale: '',
      userAgent: '',
    };
    return ctx;
  }
}
