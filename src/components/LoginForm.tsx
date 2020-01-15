import React from 'react';
  
interface LoginProps {
	email?: string;
	password?: string;
}

// WIP Login Form
const LoginForm: React.FC<LoginProps> = ({ ...props }) => {
	return (
	  <>
		<h1>Login</h1>
	  </>
	);
};
  
export default LoginForm;
  