---
id: setup-cra
title: Create React App Setup
sidebar_label: CRA Setup
---

To setup Mofetch in CRA you have to call the init method in the your app's entry file.

**Note-** All the code shown here can be found in the [Create React App example folder](https://github.com/itaditya/mofetch/blob/master/examples/cra-basic/src/App.js).

## Configure Mofetch

```js
// src/index.js

import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000', // if API is available at http://localhost:3000
  mockFetch: true,
});

mocker.get('/api/todos', function handler() {
  return {
    status: 200,
    data: [
      {
        id: 1,
        name: 'Mocked Todo 1',
      },
    ],
  };
});
```

## Use the fetch method in your app

```js
fetch('/api/todos')
  .then(res => res.json())
  .then(data => {
    setStateTodos(data);
  });
```

## Make your app production-ready

Mofetch doesn't include the mocking features in its production bundle so you have to make sure that your app doesn't use the mocking features in production. We recommend to create an env variable `MOCK_FETCH` and set it to true only in development and testing environments. This way you can choose to toggle mocking feature on or off. The below example also shows how to change the API url based on environment.

```js
// src/index.js

import { init } from 'mofetch';

const mocker = init({
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://my-api-server.com/api' :  'http://localhost:3000',
  mockFetch: process.env.MOCK_FETCH, // make sure mockFetch is a falsy value in production.
});

// only mock APIs when MOCK_FETCH is a truthy value.
if (process.env.MOCK_FETCH) {
  mocker.get('/api/todos', {
    status: 200,
    data: [],
  });
}

// other code
```
