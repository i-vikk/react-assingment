import React, { useState } from 'react';
import Login from './Login';
import CropList from './CropList';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <CropList />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
