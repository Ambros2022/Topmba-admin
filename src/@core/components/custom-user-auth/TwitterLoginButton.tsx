import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import axios1 from 'src/configs/axios';
import { useRouter } from 'next/router';

const TwitterLoginButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSocialLogin = async () => {
    if (status === 'authenticated' && session?.user) {
      console.log('Session:', session.user);

      const apiUrl = '/api/auth/user/signup/sociallogin'; // Replace with your actual API endpoint

      const postData = {
        name: session.user.name,
        email: session.user.email,
        provider_id: '112982883499715183981', // Customize this field
        provider_name: 'twitter',
      };

      try {
        const response = await axios1.post(apiUrl, postData);
        if (response.data.status === 1) {
          localStorage.setItem("UserData", JSON.stringify(response.data.data));
          router.push('/write-review');
          router.reload();
        } else {
          console.error('API Error:', response.data.message);
        }
      } catch (err) {
        console.error('API Request Failed:', err);
      }
    }
  };

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const result = await signIn('twitter', { redirect: false });
      if (result?.error) {
        console.error('Sign-In Error:', result.error);
        alert('Sign-In Error: ' + result.error);
      } else {
        console.log('Sign-In process started:', result);
        handleSocialLogin();
      }
    } catch (error) {
      console.error('Sign-In Exception:', error);
    }
  };

  useEffect(() => {
    handleSocialLogin();
  }, [session, status]);

  return (
    <div>
      <button className='btn' onClick={handleSignIn}>
        <i className='bi bi-twitter-x fs-1 text-dark'></i>
      </button>
    </div>
  );
};

export default TwitterLoginButton;
