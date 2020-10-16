import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const history = useHistory();

  return (
    <button onClick={() => {
      // call log out api

      // remove local storage
      localStorage.removeItem('userEmail');

      // push to login
      history.push('login');
    }}>
      Logout
    </button>
  )
}

export default LogoutButton;