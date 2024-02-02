import React from 'react';
import Data from "../Data.json"
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>Most Searched Website on Internet</h1>
        <div className="info-container">
          <div className="image-container">
            <img src={Data[0].image} alt="Google" />
          </div>
          <div className="text-container">
            <h2>{Data[0].Website}</h2>
            <p>{Data[0].Description}</p>
            <strong>Here is the link </strong>
            <h2>{Data[0].Link}</h2>
            <strong>Year</strong>
            <h2>{Data[0].year}</h2>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
