// LinkedInLogin.js
import React from 'react'
// import { useLinkedIn } from 'react-linkedin-login-oauth2'

const LinkedInLogin = () => {
  // const { linkedInLogin } = useLinkedIn({
  //   clientId: 'YIDyEUMR9PDHbl9T7Fkiysaqv',
  //   redirectUri: 'localhost:3000',
  //   onSuccess: code => {
  //     // Handle success, e.g., exchange code for access token
  //     console.log(code)
  //   },
  //   onError: error => {
  //     // Handle error
  //     console.error(error)
  //   }
  // })

  return <button onClick={linkedInLogin}>Login with LinkedIn</button>
}

export default LinkedInLogin
