import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0(); 
  return (
    <button onClick={() => {

      //log out user from session/cookies

      logout();
    }}>
      Logout
    </button>
  )
}

export default LogoutButton;
