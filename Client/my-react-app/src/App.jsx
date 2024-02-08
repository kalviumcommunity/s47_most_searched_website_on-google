import React, { useState, useEffect } from 'react';
import './App.css';
import Data from '../Data.json';
import axios from 'axios';

const App = () => {
    const [Myuser, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000')
            .then(users => {
                setUser(users.data);
                console.log(users);
            })
            .catch(err => console.log(err));
    }, []);

  return (
    <div className="App">
      <div className="content">
        <h1>Most Searched Websites on the Internet</h1>
        {Data.map((item, index) => (
          <div key={index} className="info-container">
            <div className="image-container">
              <img src={item.image} alt={item.Website} />
            </div>
            <div className="text-container">
              <h2>{item.Website}</h2>
              <p>{item.Description}</p>
              <strong>Here is the link: </strong>
              <a href={item.Link} target="_blank" rel="noopener noreferrer">{item.Link}</a> {/* Make the link clickable and safe */}
              <strong>Year: </strong>
              <h2>{item.year}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
