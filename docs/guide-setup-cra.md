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
        name: 'Mocked User 1',
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
    setStateUsers(data);
  });
```
