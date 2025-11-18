import React from 'react';
// import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ }) => {


  return (
    // <GoogleLogin
    //   clientId={clientId}
    //   buttonText=""
    //   className="google-login-button"
    //   onSuccess={handleSuccess}
    //   onFailure={handleFailure}
    //   cookiePolicy={'single_host_origin'}
    //   render={renderProps => (
    <button className="google-login-button btn">
      <i className="bi bi-google" style={{ fontSize: '1.5rem' }}></i>
    </button>
    // )}
    // />
  );
};

export default GoogleLoginButton;
