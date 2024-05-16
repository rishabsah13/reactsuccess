
// import { BrowserRouter as Router, Route, Routes, Link, useNavigate, } from 'react-router-dom';
import './App.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const Home = () => {

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [responseColor, setResponseColor] = useState('');
//   const [id, setId] = useState('');
//   const [contactId, setContactId] = useState('');
//   const [finalId, setFinalId] = useState('')
//   const [statusCode, setStatusCode] = useState("")
//   const navigate = useNavigate()


//   useEffect(() => {

//     const url = new URL('https://reactsuccess.vercel.app/?id=1231&contactId=12312');
//     const urlId = url.searchParams.get('id');
//     const urlContactId = url.searchParams.get('contactId');
//     console.log(urlId, urlContactId)
//     if (urlId && urlContactId) {
//       setId(urlId.toString());
//       setContactId(urlContactId.toString());
//     }
//   }, []);

//   const handleSuccessClick = async () => {
//     setIsLoading(true);
//     try {
//       const url = 'https://apim.quickwork.co/UATStaging/DMIAPP/v2/stub';
//       const response = await axios.post(url, {
//         Id: "a4uBg0000002u69",
//         contactId: "003Bg000005Fbh7",
//         leadId: "a2kBg000002y5IDIAY",
//         type: 'KYC'
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'apiKey': 'RNP5g9vKT9ffhdS06XTqaqvR5MIB22gO'
//         }
//       });

//       if (response.status !== 200) {
//         throw new Error('Network response was not ok');
//       }

//       if (response.data && response.data.status_code === '400') {

//         setResponseMessage('Failure');
//         setResponseColor('red');
//       } else {

//         console.log(response.data, "####")
//         setFinalId(response.data.Id)
//         setStatusCode(response.data.status_code)
//         navigate("/success")
//         setResponseMessage(`Success: id=${id}, contactId=${contactId}`);
//         setResponseColor('green');
//       }
//       setIsLoading(false);
//       setError(null);
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//       setError(error);
//       setIsLoading(false);

//       // Check if either Id or type field is empty
//       if (error.message.includes('id') || error.message.includes('type')) {
//         setResponseMessage('Failure: Id or type field is empty');
//       } else {
//         setResponseMessage('Failure');
//       }
//       setResponseColor('red');
//     }
//   };

//   const handleFailureClick = () => {
//     setResponseMessage('Failure');
//     setResponseColor('red');
//   };

//   return (
//     <div className="centered">
//       <h1>DMI Finance</h1>
//       <div className="button-container">
//         <button className="button1" onClick={handleSuccessClick} disabled={isLoading}>
//           Success
//         </button>
//         <button className="button2" onClick={handleFailureClick} disabled={isLoading}>
//           Failure
//         </button>
//       </div>
//       <p style={{ color: responseColor }}>{responseMessage}</p>
//       {error && (
//         <p>{`Error: ${error.message}`}</p>
//       )}
//     </div>
//   );
// };


// const SuccessPage = ({ id, contactId }) => {
//   return (
//     <div>
//       <h1>Success Page</h1>
//       <p>Success: id={id}, contactId={contactId}</p>
//     </div>
//   );
// };
// const FailurePage = () => {
//   return <h2>Failure Page</h2>;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/success" element={<SuccessPage />} />
//         <Route path="/failure" element={<FailurePage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

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
