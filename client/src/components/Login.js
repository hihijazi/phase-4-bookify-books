import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('inhandlesubmit')
    try {
      const response = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        window.alert('Login successful');

      } else if (response.status === 401 || response.status === 500) {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      if (error.message === 'Invalid username or password') {
        window.alert('Invalid username or password. Please try again.');
        setUsername('');
        setPassword('');
      }
    }
  };

// Login component
return (
  <div>
     <form onSubmit={handleSubmit}>
       <div>
         <label htmlFor="username">Username:</label>
         <input
           type="text"
           id="username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
         />
       </div>
       <div>
         <label htmlFor="password">Password:</label>
         <input
           type="password"
           id="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           autoComplete="current-password" // Add this line
         />
       </div>
       <button type="submit">Submit</button>
     </form>
     <p>Not a Member? <Link to="/signup">Sign up</Link></p>
  </div>
 );
}

export default Login;
