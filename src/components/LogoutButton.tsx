import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0(); 
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