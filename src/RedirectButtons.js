import React from 'react';
import { useHistory } from 'react-router-dom';

const RedirectButtons = () => {
  const history = useHistory();

  const handleSuccessClick = () => {
    // Redirect to success URL
    history.push('/success');
  };

  const handleFailureClick = () => {
    // Redirect to failure URL
    history.push('/failure');
  };

  return (
    <div>
      <button onClick={handleSuccessClick}>Success</button>
      <button onClick={handleFailureClick}>Failure</button>
    </div>
  );
};

export default RedirectButtons;
