---
id: installation
title: Installation
sidebar_label: Installation
---

Follow these steps to setup mofetch in your project.

## Install npm packages.

```
npm install mofetch node-fetch
```

## Setup mofetch in your app once.

```js
import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000', // API base url
  mockFetch: true, // if you want to mock the API response
});

// only works if mockFetch is set to true.
mocker.get('/api/todos', function handler() {
  return {
    status: 200,
    data: [
      {
        id: 1,
        name: 'Mocked Todo Name',
      },
    ],
  };
});
```

## Make API calls anywhere in your app
Mofetch can work on client and server both.

```js
import { fetch } from 'mofetch';

fetch('/api/todos')
  .then(res => res.json())
  .then(data => {
    console.log(data); // [{ id: 1, name: 'Mocked Todo Name' }]
  });
```
