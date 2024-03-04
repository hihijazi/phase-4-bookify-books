import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password }),
    })
      .then(r => {
        if (r.ok) {
          return r.json();
        } else if (r.status === 401 || r.status === 500 || r.status === 400) {
          throw new Error('Invalid username or password');
        }
      })
      .then(() => {
        window.alert('Sign up Successful! Please log in');
        setUsername('');
        setPassword('');
        setName('');
      })
      .catch(error => {
        if (error.message === 'Invalid username or password') {
          window.alert('Invalid username or password. Please try again.');
        }
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full name:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Already a member? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Signup;
