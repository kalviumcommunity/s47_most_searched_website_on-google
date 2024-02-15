import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ Name: '', Username: '', Email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login')
      .then((response) => {
        console.log(response.data);
        // document.cookie = `Token=${response.data}`
        onLoginSuccess(loginDetails);
        navigate('/');
      }).catch((error) => {
        console.log(error);
      })
  };


  const setCookies = (key, value) => {
    document.cookie = `${key}=${value}`;
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
