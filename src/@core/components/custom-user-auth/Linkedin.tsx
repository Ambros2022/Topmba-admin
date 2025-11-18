import React from 'react';

// import { useLinkedIn } from 'react-linkedin-login-oauth2';

function LinkedInPage() {
    // const { linkedInLogin } = useLinkedIn({
    //     clientId: '77xvzj6mqjnmgt',
    //     redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    //     onSuccess: (code) => {
    //         console.log(code);
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     },
    // });

    return (
        <img
            src='/images/icons/linkedin.svg'
            width={50}
            height={50}
            alt='linkedin-img'
        // onClick={linkedInLogin}
        />
    );
}
export default LinkedInPage;