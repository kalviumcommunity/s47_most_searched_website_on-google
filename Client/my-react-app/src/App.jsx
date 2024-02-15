import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddWebsiteForm from './components/Add';
import WebsiteList from './components/List';
import Login from './components/Login';
import './App.css';

// Custom cookie management functions continued
const getCookie = (name) => {
  const cookies = document.cookie.split('; ').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
  return cookies[name] || '';
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ Name: '', Username: '', Email: '' });

  useEffect(() => {
    if (isLoggedIn) {
      fetchWebsites();
      const name = getCookie('Name');
      const username = getCookie('Username');
      const email = getCookie('Email');
      setUserDetails({ Name: name, Username: username, Email: email });
    }
  }, [isLoggedIn]);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      setWebsites(response.data);
    } catch (error) {
      console.error("Error fetching website data:", error);
      setError('Error fetching website data. Please try again later.');
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    deleteCookie('Name');
    deleteCookie('Username');
    deleteCookie('Email');
    setIsLoggedIn(false);
    setUserDetails({ Name: '', Username: '', Email: '' });
  };

  if (error) {
    return <div className="App">{error}</div>;
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Most Searched Websites on the Internet</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="user-details">
        User Details: <br />Name = {userDetails.Name} <br />Username = {userDetails.Username} <br />Email = {userDetails.Email}
      </div>
      <button onClick={toggleForm}>
        {showForm ? 'Hide Form' : 'Add New Entity'}
      </button>
      {showForm && <AddWebsiteForm onNewWebsiteAdded={fetchWebsites} />}
      <WebsiteList websites={websites} />
    </div>
  );
};

export default App;
