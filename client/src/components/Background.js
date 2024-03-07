// Background.js

import React from 'react';
import backgroundImage from '../images/background.png'; 
import '../index.css';

const Background = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage: `url(${backgroundImage})`,
      backgroundattachment: 'fixed',
      backgroundrepeat: 'norepeat',

    }} />
  );
}

export default Background;
