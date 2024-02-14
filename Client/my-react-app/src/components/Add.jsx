import React, { useState } from 'react';
import axios from 'axios';

const AddWebsiteForm = ({ onNewWebsiteAdded }) => {
  // State hooks for each form field
  const [websiteName, setWebsiteName] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [websiteYear, setWebsiteYear] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');
  const [websiteImage, setWebsiteImage] = useState(''); // State hook for the image URL
  const [errorMessage, setErrorMessage] = useState(''); // State hook for storing error messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    setErrorMessage(''); // Clear any existing error messages

    try {
      // Submit the form data
      await axios.post('http://localhost:4000/', {
        Website: websiteName,
        Link: websiteLink,
        year: websiteYear,
        Description: websiteDescription,
        image: websiteImage,
      });

      // Reset form fields
      setWebsiteName('');
      setWebsiteLink('');
      setWebsiteYear('');
      setWebsiteDescription('');
      setWebsiteImage('');

      // Invoke callback if provided
      if (onNewWebsiteAdded) {
        onNewWebsiteAdded();
      }
    } catch (error) {
      console.error('Failed to add the website:', error);
      // Set the error message from the server response if available
      setErrorMessage(error.response?.data || 'Failed to add the website');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-website-form">
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      <input
        type="text"
        placeholder="Website Name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Website Link"
        value={websiteLink}
        onChange={(e) => setWebsiteLink(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Year"
        value={websiteYear}
        onChange={(e) => setWebsiteYear(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={websiteDescription}
        onChange={(e) => setWebsiteDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={websiteImage}
        onChange={(e) => setWebsiteImage(e.target.value)}
      />
      <button type="submit">Add Website</button>
    </form>
  );
};

export default AddWebsiteForm;
