import { Event } from '../Event';

export type IngestEventsRequestPayload = {
  events: Event[];
};

export type IngestEventsResponsePayload = {
  message: string;
  data: any;
  error: boolean;
};
