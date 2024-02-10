//app..js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddWebsiteForm from './components/Add';
import WebsiteList from './components/List';
import './App.css';

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWebsites();
  }, []);

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

  
  if (error) {
    return <div className="App">{error}</div>;
  }

  
  return (
    <div className="App">
      <h1>Most Searched Websites on the Internet</h1>
      <button onClick={toggleForm} className="toggle-form-button">
        {showForm ? 'Hide Form' : 'Add New Entity'}
      </button>
      {showForm && <AddWebsiteForm onNewWebsiteAdded={fetchWebsites} />}
      <WebsiteList websites={websites} />
    </div>
  );
};

export default App;
