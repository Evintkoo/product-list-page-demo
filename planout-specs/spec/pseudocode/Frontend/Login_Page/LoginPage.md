import React, { useState, useEffect } from 'react';
import { validateEmail, loginUser, checkAuthStatus } from './apiClient';
import { useNavigate } from 'react-router-dom';

/**
 * Asset: assets/44203b3b-148a-453a-adb2-172e0b0b7140.svg
 */
export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  // Page Load: Check session
  useEffect(() => {
    checkAuthStatus()
      .then(() => navigate('/product-list')) // ORPHAN_FIELD: /product-list
      .catch(() => { /* Stay on login page */ });
  }, [navigate]);

  // Email Validation: Triggered on change/blur
  const handleEmailChange = async (value: string) => {
    setEmail(value);
    if (value.includes('@')) {
      const response = await validateEmail({ email: value });
      setIsEmailValid(response.exists);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        navigate('/product-list'); // ORPHAN_FIELD: /product-list
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-column">
        <h1>Welcome Back</h1>
        <p>Sign in to access your lumi account</p>
        
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        {!isEmailValid && <span>User not found</span>}

        <input 
          type="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
      
      <div className="right-column">
        <img src="assets/44203b3b-148a-453a-adb2-172e0b0b7140.svg" alt="Illustration" />
      </div>
    </div>
  );
};