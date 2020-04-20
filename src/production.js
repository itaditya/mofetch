import { setConfig } from './mockConfig';
import realFetch from './realFetch';

export const fetch = realFetch;

export function init(config) {
  setConfig(config);
}
