import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddWebsiteForm from './components/Add';
import WebsiteList from './components/List';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ Name: '', Username: '', Email: '' });

  useEffect(() => {
    if (isLoggedIn) {
      fetchWebsites();
      const name = getCookieValue('Name');
      const username = getCookieValue('Username');
      const email = getCookieValue('Email');
      setUserDetails({ Name: name, Username: username, Email: email });
    }
  }, [isLoggedIn]);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get('http://localhost:4000/');
      if (Array.isArray(response.data)) {
        setWebsites(response.data);
      } else {
        console.error('Unexpected API response structure:', response.data);
        setError('Unexpected API response structure. Please check the console for more information.');
      }
    } catch (error) {
      console.error("There was an error retrieving the website data:", error);
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

  function getCookieValue(name) {
    const nameString = name + "=";
    const value = document.cookie.split('; ').find(row => row.startsWith(nameString));
    return value ? decodeURIComponent(value.split('=')[1]) : null;
  }

  function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  if (error) {
    return <div className="App">{error}</div>;
  }

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="header-title">Most Searched Websites on the Internet</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <div className="user-details">
        User Details: <br />Name = {userDetails.Name} <br /> Username = {userDetails.Username} <br /> Email = {userDetails.Email}
      </div>
      <button onClick={toggleForm} className="toggle-form-button">
        {showForm ? 'Hide Form' : 'Add New Entity'}
      </button>
      {showForm && <AddWebsiteForm onNewWebsiteAdded={fetchWebsites} />}
      <WebsiteList websites={websites} />
    </div>
  );
};

export default App;
