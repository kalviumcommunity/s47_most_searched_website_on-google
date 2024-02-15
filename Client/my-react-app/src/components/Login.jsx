import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// Custom cookie management functions
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ Name: '', Username: '', Email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', loginDetails).then(() => {
      onLoginSuccess(loginDetails);
      navigate('/');
    });
  };

  const setCookies = (key, value) => {
    setCookie(key, value, 7); // Set cookies for 7 days
    setLoginDetails(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Name:</label>
        <input type="text" required onChange={(e) => setCookies('Name', e.target.value)} />
        <br />
        <label>Username:</label>
        <input type="text" required onChange={(e) => setCookies('Username', e.target.value)} />
        <br />
        <label>Email:</label>
        <input type="email" required onChange={(e) => setCookies('Email', e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
