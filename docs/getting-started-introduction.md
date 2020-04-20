---
id: introduction
title: Introduction
sidebar_label: Introduction
---

> Mofetch is an isomorphic fetch utility with first class support for mocking API responses.

## Benefits
1. Instead of waiting on the backend APIs to be ready **mock the unfinished APIs** and continue building the frontend.
1. If **backend api doesn't work locally** mock the API and implement basic logic to handle request response.
1. Write better integration tests by mocking fetch calls.
1. Run frontend apps on platforms like CodeSandbox without any need for API.
1. Simulate race-conditions by changing response delay of individual APIs.

## Making API calls
You can use the fetch function to make API calls from both server and client. This feature can be used in production as well.

```js
// setup mofetch once
import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000',
});


// use the fetch anywhere
import { init } from 'mofetch';

fetch('/api/todos')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
```

## Mocking APIs
In development and testing environment you can choose to mock any API by setting `mockFetch: true` and adding API handlers.

```js
// need this once
import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000', // API base url
  mockFetch: true, // if you want to mock the API response
});

mocker.get('/api/todos/:id', function handler({ query, params, options }) {
  return {
    status: 200,
    data: {
      id: 1,
      name: 'Mocked Todo Name',
    },
  };
});


// use the fetch anywhere
import { fetch } from 'mofetch';

fetch('/api/todos/1')
  .then(res => res.json())
  .then(data => {
    console.log(data); // { id: 1, name: 'Mocked Todo Name' }
  });
```

## How it works

`mofetch` is by default an isomorphic fetch library so you can use it on server and browser both. But when you enable `mockFetch: true` instead of using the real fetch, we instead use a fake fetch function. This fake fetch will first check if the url is assigned a mock handler. Based on the handler `fetch` function returns the data.

**Note-** If there is no match for API in the mock, this fake fetch will fallback to calling the real API.
