import { init } from '../utils/mofetch';

const mocker = init({
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://prod_url.com' : 'http://localhost:3000',
  mockFetch: process.env.MOCK_FETCH,
});

if (process.env.MOCK_FETCH) {
  const todos = require('../fixtures/api/todos.json');
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

  mocker.post('/api/todos', function handler({ options }) {
    const data = JSON.parse(options.body);
    todos.push(data);
    return {
      status: 200,
    };
  });

  mocker.patch('/api/todos/:id/edit', {
    status: 200,
  });

  mocker.get('/api/users/:id', function handler({ query, params }) {
    const prefix = query.prefix || 'Mocked';
    return {
      status: 200,
      data: {
        name: `${prefix} User ${params.id}`,
      },
    };
  });

  mocker.get('/api/users', function handler() {
    return {
      status: 200,
      data: [
        {
          id: 1,
          name: 'Mocked User 1',
        },
        {
          id: 2,
          name: 'Mocked User 2',
        },
      ],
    };
  });
}


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
