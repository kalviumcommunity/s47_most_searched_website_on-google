import React, { useState } from 'react';
import axios from 'axios';

const WebsiteList = ({ websites, fetchWebsites }) => {
  const [editingWebsite, setEditingWebsite] = useState(null);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/${id}`) 
      .then(() => {
        alert('Website deleted successfully');
        fetchWebsites();
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (website) => {
    setEditingWebsite({ ...website });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:4000/${editingWebsite._id}`, editingWebsite) 
      .then(() => {
        alert('Website updated successfully');
        setEditingWebsite(null); 
        fetchWebsites(); 
      })
      .catch(err => console.error(err));
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
      {websites.map((website, index) => (
        <div key={index} className="website-item">
          {editingWebsite && editingWebsite._id === website._id ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name" 
                value={editingWebsite.name}
                onChange={handleChange}
                placeholder="Website Name"
              />
              <input
                type="text"
                name="link" 
                value={editingWebsite.link}
                onChange={handleChange}
                placeholder="Website Link"
              />
              <input
                type="text"
                name="image" 
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
              <p>{website.yea}</p> 
              {website.image && <p><img src={website.image} alt={website.name} /></p>}
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
