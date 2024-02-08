import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [newWebsite, setNewWebsite] = useState({ Website: '', Description: '', Link: '', year: '' });
  const [showForm, setShowForm] = useState(false); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get('http://localhost:4000');
  
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

  const handleInputChange = (e) => {
    setNewWebsite({ ...newWebsite, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/', newWebsite);
      fetchWebsites(); 
      setNewWebsite({ Website: '', Description: '', Link: '', year: '' });
    } catch (error) {
      console.error("There was an error adding the website:", error);
    }
  };

  if (error) {
    return <div className="App">{error}</div>;
  }

  return (
    <div className="App">
      <h1>Most Searched Websites on the Internet</h1>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? 'Hide Form' : 'Add New Website'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="website-form">
          <input type="text" name="Website" placeholder="Website Name" value={newWebsite.Website} onChange={handleInputChange} />
          <input type="text" name="Description" placeholder="Description" value={newWebsite.Description} onChange={handleInputChange} />
          <input type="text" name="Link" placeholder="Website Link" value={newWebsite.Link} onChange={handleInputChange} />
          <input type="text" name="year" placeholder="Year" value={newWebsite.year} onChange={handleInputChange} />
          <button type="submit">Submit</button>
        </form>
      )}
      <div className="website-list">
        {websites.map((website, index) => (
          <div key={index} className="website-item">
            <h2>{website.Website}</h2>
            <p>{website.Description}</p>
            <a href={website.Link} target="_blank" rel="noopener noreferrer">{website.Link}</a>
            <p>Year: {website.year}</p>
            <p><img src={website.image} alt="" /></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
