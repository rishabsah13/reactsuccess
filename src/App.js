// import React,{useState} from 'react';
// import './App.css'; // Import CSS file for styling
// import { useNavigate } from 'react-router-dom';


// const App = () => {
//   const navigate = useNavigate();
//   const [redirectTo, setRedirectTo] = useState(null);
//   const handleSuccessClick = () => {
//     // Handle success action here, such as redirecting to a success page
//     console.log("Success button clicked");
//     navigate("https://www.facebook.com/")

//   };

//   const handleFailureClick = () => {
//     // Handle failure action here, such as redirecting to a failure page
//     console.log("Failure button clicked");

//   };


//   return (
//     <div className="centered">
//       <h1>DMI Finance</h1>
//       <div className="button-container">
//         <button className="button1" onClick={handleSuccessClick}>Success</button>
//         <div className="button-gap" />
//         <button className="button2" onClick={handleFailureClick}>Failure</button>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import CSS file for styling

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
