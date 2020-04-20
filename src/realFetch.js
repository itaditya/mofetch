import { getConfig } from './mockConfig';

function serverFetch(url, ...restArgs) {
  const nodeFetch = require('node-fetch');
  const mockConfig = getConfig();
  const actualUrl = mockConfig.baseUrl + url;
  return nodeFetch(actualUrl, ...restArgs);
}

const realFetch = typeof window === 'undefined' ? serverFetch : window.fetch;

export default realFetch;
