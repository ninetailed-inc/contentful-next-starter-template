import Debug from 'debug/src/browser';

export const log = Debug('ninetailed:experience-sdk');

export const enable = () => {
  Debug.enable('ninetailed:experience-sdk');
};
export const disable = () => Debug.disable();
