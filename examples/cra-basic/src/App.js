import React, { useState, useEffect } from 'react';
import { fetch } from 'mofetch';

import './styles.css';

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
