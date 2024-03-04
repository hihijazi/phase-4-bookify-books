import React, { useState } from 'react';

const Home = ({ user, onLogin, onLogOut }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleUsernameChange = (e) => {
     setUsername(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
     setPassword(e.target.value);
  };
 
  return (
     <>
       {user ? (
         <div style={{ marginTop: '-600px', padding: '75px' }}>
           <h2 style={{ fontSize: '36px' }}>Welcome to Bookify Books</h2>
           <p style={{ fontSize: '24px' }}>FIND YOUR PLACE AT BOOKIFY BOOKS BOOKSTORE</p>
           <p style={{ fontSize: '20px' }}>Feel free to explore our books, review orders, and add new books to the inventory.</p>
         </div>
       ) : (
         <form>
           <input
             type="text"
             id="username"
             placeholder="Enter username"
             value={username}
             onChange={handleUsernameChange}
             autoComplete="username"
           />
           <input
             type="password"
             id="password"
             placeholder="Enter password"
             value={password}
             onChange={handlePasswordChange}
             autoComplete="current-password"
           />
           <button type="submit">Submit</button>
         </form>
       )}
     </>
  );
 };

export default Home;



