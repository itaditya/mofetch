---
id: setup-nextjs
title: Next.js Setup
sidebar_label: Next.js Setup
---

To setup Mofetch in Next.js you have to follow these steps

* Make an _app.js file in `pages/` folder of your Next.js app.
* Call the init method of mofetch in the `_app.js` file.
* Use the fetch method in your app.

**Note-** All the code shown here can be found in the [Next.js example folder](https://github.com/itaditya/mofetch/blob/master/examples/next-kitchensink/src/bootstrap/index.js).

## Create _app.js file

If you have your Next.js pages folder in `/src/pages` then do this.

```sh
# ignore this if you already have an _app.js file
touch /src/pages/_app.js
```

Then write this boilerplate code.

```js
// src/pages/_app.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## Configure Mofetch

Now you need to configure mofetch in the `_app.js` file. You're free to create a separate file and import that in `_app.js` as well.

```js
// src/pages/_app.js

import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000', // if the APIs run at http://localhost:3000
  mockFetch: true,
});

// data can be hard coded in the file or loaded from external files
const todos = require('../fixtures/api/todos.json');

// handler (second arg) can be an object
mocker.get(
  '/api/todos',
  {
    status: 200,
    data: todos,
  },
  {
    delay: 800,
  },
);

// handler can be a function in case you need to send dynamic response.
mocker.get('/api/users/:id', function handler({ query, params }) {
  const prefix = query.prefix || 'Mocked'; // example of customising the output
  return {
    status: 200,
    data: {
      name: `${prefix} User ${params.id}`,
    },
  };
});
```

## Use the fetch method in your app

The fetch function can be called anywhere in your Next.js app like say inside `getStaticProps`, `getInitialProps`, `useEffect`. The only change in your app is that you're using the fetch function from `mofetch` pacakge. The fetch function signature is same as browser fetch so you can use mofetch's fetch just like normal fetch.

```js
// src/pages/About.js

import { fetch } from 'mofetch';

export default function About() {
  // about page
}

About.getInitialProps = async function () {
  const resTodos = await fetch('/api/todos');
  const todos = await resTodos.json();

  return {
    todos,
  };
};
```

## Make your app production-ready

Mofetch doesn't include the mocking features in its production bundle so you have to make sure that your app doesn't use the mocking features in production. We recommend to create an env variable `MOCK_FETCH` and set it to true only in development and testing environments. This way you can choose to toggle mocking feature on or off. The below example also shows how to change the API url based on environment.

```js
// src/pages/_app.js

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

You're free to choose to name the env variables anything or use a different technique. If you go ahead with the env variable `MOCK_FETCH` then make sure you tell Next.js about it like this.

```js
// next.config.js

module.exports = {
  env: {
    MOCK_FETCH: process.env.MOCK_FETCH,
  },
}
```
