import React, { useState } from 'react';
import axios from 'axios';

const WebsiteList = ({ websites, fetchWebsites }) => {
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [error, setError] = useState(''); // Added state to track any error message

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/${id}`)
      .then(() => {
        alert('Website deleted successfully');
        fetchWebsites();
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred while deleting the website.');
      });
  };

  const handleEdit = (website) => {
    setEditingWebsite({ ...website });
    setError(''); // Clear any existing error message
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:4000/${editingWebsite._id}`, editingWebsite)
      .then(() => {
        alert('Website updated successfully');
        setEditingWebsite(null);
        fetchWebsites();
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || 'An error occurred while updating the website.');
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingWebsite(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="website-list">
      {error && <p className="error-message">{error}</p>} {/* Display any error message */}
      {websites.map((website, index) => (
        <div key={index} className="website-item">
          {editingWebsite && editingWebsite._id === website._id ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Website" // Changed from 'name' to 'Website' to match schema
                value={editingWebsite.Website}
                onChange={handleChange}
                placeholder="Website Name"
              />
              <input
                type="text"
                name="Link" // Ensure the name matches the schema
                value={editingWebsite.Link}
                onChange={handleChange}
                placeholder="Website Link"
              />
              <input
                type="text"
                name="image" // This should match your schema (if it's 'image' or 'Image')
                value={editingWebsite.image}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <button type="submit">Save</button>
              <button onClick={() => setEditingWebsite(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <h2>{website.Website}</h2>
              <p><strong>{website.Description}</strong></p>
              <a href={website.Link} target="_blank" rel="noopener noreferrer">{website.Link}</a>
              <p>{website.year}
              
              </p> {/* Corrected 'yea' to 'year' to match the schema */}
              {website.image && <img src={website.image} alt={website.Website} style={{maxWidth: "200px"}} />} {/* Added alt attribute to use website name */}
              <button onClick={() => handleEdit(website)}>Edit</button>
              <button onClick={() => handleDelete(website._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default WebsiteList;
