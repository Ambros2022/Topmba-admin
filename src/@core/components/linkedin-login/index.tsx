// components/LinkedInLoginButton.tsx

import React from 'react';
// import { LinkedIn } from 'react-linkedin-login-oauth2';

interface LinkedInLoginButtonProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const LinkedInLoginButton: React.FC<LinkedInLoginButtonProps> = ({ }) => {


  return (
    // <LinkedIn
    //   clientId={clientId}
    //   redirectUri={redirectUri}
    //   onSuccess={handleSuccess}
    //   onError={handleFailure}
    //   scope="r_liteprofile r_emailaddress"
    //   state="123456" // example state parameter
    // >
    //   {({ linkedInLogin }: { linkedInLogin: any }) => (
    <button className="linkedin-login-button btn">
      <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
    </button>
    //   )}
    // </LinkedIn>
  );
};

export default LinkedInLoginButton;
