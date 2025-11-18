// components/TwitterLoginButton.tsx

import React from 'react';
// import TwitterLogin from 'react-twitter-auth';

interface TwitterLoginButtonProps {
    onSuccess: (response: any) => void;
    onFailure: (error: any) => void;
}

const TwitterLoginButton: React.FC<TwitterLoginButtonProps> = ({ }) => {
    // const requestTokenUrl = process.env.NEXT_PUBLIC_TWITTER_REQUEST_TOKEN_URL as string;
    // const authenticateUrl = process.env.NEXT_PUBLIC_TWITTER_AUTHENTICATE_URL as string;

    // const handleSuccess = (response: any) => {
    //     response.json().then((body: any) => {
    //         console.log('Login Success:', body);
    //         onSuccess(body);
    //     });
    // };

    // const handleFailure = (error: any) => {
    //     console.error('Login Failure:', error);
    //     onFailure(error);
    // };

    return (
        // <TwitterLogin
        //     loginUrl={authenticateUrl}
        //     onFailure={handleFailure}
        //     onSuccess={handleSuccess}
        //     requestTokenUrl={requestTokenUrl}
        //     showIcon={false}
        //     forceLogin={true}
        //     customHeaders={{ 'Access-Control-Allow-Origin': '*' }}
        //     credentials="include"
        //     //@ts-ignore
        //     className='border-0 p-0'
        // >
            <div className="twitter-login-button btn">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
            </div>
        // </TwitterLogin>
    );
};

export default TwitterLoginButton;
