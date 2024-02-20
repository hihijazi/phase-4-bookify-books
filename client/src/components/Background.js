// Background.js

import React from 'react';
import backgroundImage from '../images/background.png'; // Update the import path to navigate to the images folder

const Background = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundSize: 'cover',
      backgroundImage: `url(${backgroundImage})`,
    }} />
  );
}

export default Background;

