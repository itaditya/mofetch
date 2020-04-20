import React, { useState, useEffect } from 'react';
import { fetch, init } from 'mofetch';

import './styles.css';

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

export default function App() {
  const [stateUsers, setStateUsers] = useState([]);
  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => {
        setStateUsers(data);
      });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {stateUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
