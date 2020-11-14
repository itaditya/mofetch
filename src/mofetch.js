import Router from 'url-router';
import fromEntries from 'object.fromentries';

import { getConfig, setConfig } from './mockConfig';

function logger(string) {
  console.log(`[mofetch] ${string}`);
}

function loggerAPI({ method, url }) {
  logger(`${method}: ${url}`);
}

const router = new Router();

function getStoredUrl(url, method) {
  return `${method}:${url}`;
}

const mocker = {
  handle(url, method, handler, config = {}) {
    const storedUrl = getStoredUrl(url, method);
    if (!router) {
      throw new Error('You have to enable mocking by setting mockFetch to true');
    }
    router.add(storedUrl, {
      handler,
      config,
    });
  },
  get(url, handler, config) {
    mocker.handle(url, 'GET', handler, config);
  },
  post(url, handler, config) {
    mocker.handle(url, 'POST', handler, config);
  },
  put(url, handler, config) {
    mocker.handle(url, 'PUT', handler, config);
  },
  patch(url, handler, config) {
    mocker.handle(url, 'PATCH', handler, config);
  },
  delete(url, handler, config) {
    mocker.handle(url, 'DELETE', handler, config);
  },
  all(url, handler, config) {
    mocker.handle(url, '*', handler, config);
  },
};

function getUrlData(url, method) {
  const mockConfig = getConfig();

  console.log(`url`, url); // aditodo remove this

  const actualUrl = url.split(/[?#]/)[0];
  if (!url.includes(mockConfig.baseUrl)) {
    url = mockConfig.baseUrl + url;
  }

  const parsedUrl = new URL(url);
  const query = fromEntries(parsedUrl.searchParams.entries());

  const storedUrl = getStoredUrl(actualUrl, method);
  console.log(`url actualUrl storedUrl`, url, actualUrl, storedUrl); // aditodo remove this
  const routeData = router.find(storedUrl);

  return { query, routeData };
}

function getMockHandler(url, method) {
  console.log(`router`, router); // aditodo remove this
  const { query, routeData } = getUrlData(url, method);

  console.log(`routeData`, routeData); // aditodo remove this
  if (!routeData) {
    return {};
  }

  const { handler: handlerData, params } = routeData;
  const { handler, config } = handlerData;
  return { handler, config, query, params };
}

const realFetch = typeof window === 'undefined' ? global.fetch : window.fetch;

async function fakeFetch(url, options = {}) {
  const mockConfig = getConfig();
  const method = options.method || 'GET';
  const { handler, config, query, params } = getMockHandler(url, method);

  if (!handler) {
    return realFetch(url, options);
  }

  loggerAPI({ method, url });

  return new Promise((resolve, reject) => {
    function send() {
      try {
        const isFunction = typeof handler === 'function';
        const { data, ...fetchOptions } = isFunction
          ? handler({ query, params, options })
          : handler;
        const body = JSON.stringify(data);

        const res = new Response(body, {
          url, // for node-fetch Response
          ...fetchOptions,
        });
        // for browser Response
        Object.defineProperty(res, 'url', { value: url, enumerable: true });
        Object.defineProperty(res, 'type', { value: 'basic', enumerable: true });

        resolve(res);
      } catch (error) {
        reject(error);
      }
    }

    const delay = config.delay || mockConfig.delay;
    setTimeout(send, delay);
  });
}

export function fetch(...restArgs) {
  const mockConfig = getConfig();
  if (!mockConfig.isInitialized) {
    throw new Error('Call init() in your app before using fetch.');
  }
  return mockConfig.mockFetch ? fakeFetch(...restArgs) : realFetch(...restArgs);
}

export function init(config) {
  Object.assign(config, {
    isInitialized: true,
  });

  setConfig(config);
  return mocker;
}
