import React from 'react';
import ReactDOM from 'react-dom';
import { init } from 'mofetch';

import App from './App';

const mocker = init({
  baseUrl: 'http://localhost:3000',
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

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);
