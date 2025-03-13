import React, { useState } from 'react';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback to be passed to LoginScreen that will trigger on successful login/registration
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <HomeScreen /> : <LoginScreen onLoginSuccess={handleLoginSuccess} />;
}
