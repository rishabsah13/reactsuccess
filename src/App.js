import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  return (
    <div className="centered">
      <h1>DMI Finance</h1>
      <div className="button-container">
        <Link to="/success" className="button1">Success</Link>
        <div className="button-gap" />
        <Link to="/failure" className="button2">Failure</Link>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  const navigate = useNavigate();
  const [Id, setId] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://apim.quickwork.co/UATStaging/DMIAPP/v2/stub';
    const apiKey = 'RNP5g9vKT9ffhdS06XTqaqvR5MIB22gO';
    
    const requestBody = {
      Id:"a4uBg0000002u69",
      contactId:"003Bg000005Fbh7",
      leadId:"a2kBg000002y5IDIAY",
      type: "KYC"
    };

    const postData = async () => {
      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey
          }
        });

        console.log('Success:', response.data);
        setId(response.data.Id);
        setStatusCode(response.data.status_code);

        // Send a message to the React Native WebView when the API call succeeds
        // if (window.ReactNativeWebView) {
        //   window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'success' }));
        // }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    postData();
  }, [navigate]);

  return (
    <>
      <h2>Success Page</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Id: {Id}</div>
          <div>Status Code: {statusCode}</div>
        </div>
      )}
    </>
  );
};

const FailurePage = () => {
  return <h2>Failure</h2>;
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
