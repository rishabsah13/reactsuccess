
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import CSS file for styling
import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseColor, setResponseColor] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://apim.quickwork.co/UATStaging/DMIAPP/v2/stub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': 'RNP5g9vKT9ffhdS06XTqaqvR5MIB22gO'
        },
        body: JSON.stringify({
          Id: '',
          contactId: '',
          type: ''
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data, "#######");
  
      if (data && data.status_code === '400') {
        setResponseMessage('Failure');
        setResponseColor('red');
      } else {
        setResponseMessage('Success');
        setResponseColor('green');
      }
  
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError(error);
      setIsLoading(false);
      
      // Check if either Id or type field is empty
      if (error.message.includes('Id') || error.message.includes('type')) {
        setResponseMessage('Failure: Id or type field is empty');
      } else {
        setResponseMessage('Failure');
      }
      setResponseColor('red');
    }
  };


  return (
    <div className="centered">
      <h1>DMI Finance</h1>
      <div className="button-container">
        <button className="button1" onClick={handleClick} disabled={isLoading}>
          Trigger
        </button>
      </div>
      <p style={{ color: responseColor }}>{responseMessage}</p>
      {error && (
        <p>{`Error: ${error.message}`}</p>
      )}
    </div>
  );
};

const SuccessPage = () => {
  return <h2>Success Page</h2>;
};

const FailurePage = () => {
  return <h2>Failure Page</h2>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
      </Routes>
    </Router>
  );
};

export default App;