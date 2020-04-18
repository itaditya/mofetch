## mofetch

An isomorphic fetch utility with first class support for mocking API responses.

### Usage
```js
// configure it once
import { init } from 'mofetch';

const mocker = init({
  baseUrl: 'http://localhost:3000',
  mockFetch: true,
});

mocker.get('/api/users', function handler() {
  return {
    status: 200,
    data: [{
      id: 1,
      name: 'Mocked User 1',
    }],
  };
});

// use the fetch util in any file
import { fetch } from 'mofetch';
const res = await fetch('/api/users');
const users = await res.json(); // array of users
```

### How you benefit
1. Instead of waiting on the backend APIs to be ready **mock the unfinished APIs** and continue building the frontend.
1. If **backend api doesn't work locally** mock the API and implement basic logic to handle request response.
1. Write better integration tests by mocking fetch calls.
1. Run frontend apps on platforms like CodeSandbox without any need for API.
1. Simulate race-conditions by changing response delay of individual APIs.

### How it works

`mofetch` is by default an isomorphic fetch library so you can use it on server and browser both. But when you enable `mockFetch: true` the fetch function will first check if the url is assigned a mock handler. Based on the handler `fetch` function returns the data.

**Note-** If there is no match for API in the mock, `fetch` will fallback to calling the real API.

### More usecases.

#### In-Memory DB.
* If a POST call adds an item to an array, you can simulate the same by making an in-memory array. Each API mutates the array and returns the mutated array.

#### API response delay
* By default a delay of `400ms` is put in API response in development mode (0ms in tests). You can increase the delay by either globally setting the delay.

```js
init({
  // other options,
  delay: 800,
});
```

or setting it per API mock.

```js
mocker.get(
  '/api/todos',
  {
    status: 200,
    data: todos,
  },
  {
    delay: 1000,
  },
);
```
