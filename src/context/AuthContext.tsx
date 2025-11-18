// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

import axios1 from 'src/configs/adminaxios'

// ** Config
import authConfig from 'src/configs/auth'


// ** Cookies
import Cookies from 'js-cookie';

// ** Types
import {
  AuthValuesType, LoginParams, ErrCallbackType, ForgotPasswordParams, handelVerifyemailOtpParams,
  handelhandelResetPasswordParams
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  permission: null,
  isAuthenticated: false,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  ForgotPassword: () => Promise.resolve(),
  VerifyemailOtp: () => Promise.resolve(),
  ResetPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  stateId: null,
  setStateId: () => Promise.resolve(),
  cityId: null,
  setCityId: () => Promise.resolve(),
  streamId: null,
  setStreamId: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)



type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<any>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(defaultProvider.isAuthenticated)
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [permission] = useState<any>(null);
  const setAuthToken = (token: string) => {
    Cookies.set(authConfig.storageTokenKeyName, token, { expires: 1 });
  }


  const getAuthToken = () => {
    return Cookies.get(authConfig.storageTokenKeyName);
  }

  const removeAuthToken = () => {
    Cookies.remove(authConfig.storageTokenKeyName);
  }

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      // console.log("initAuth", user);
      setLoading(false)

      const storedToken = getAuthToken()!
      setLoading(false);
      setisAuthenticated(true);

      // setUser(response.data.data)


      if (storedToken) {
        setLoading(true)
        await axios1
          .post(authConfig.meEndpoint, {}, {
            headers: {
              "x-access-token": storedToken
            }
          })
          .then(async response => {
            setLoading(false);
            setisAuthenticated(true);
            setUser(response.data.data);

            // const privileges = response.data.privileges;
            // setPermission(privileges);


            axios1.defaults.headers.common["x-access-token"] = storedToken;


          })
          .catch(() => {
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    //
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {

    try {

      const { email, password } = params;

      // console.log("login", email, password)
      const response = await axios1.post('/api/auth/signinadmin', { email, password });

      // console.log(response.data.data.accessToken, "response")
      // return
      if (response && response.status == 200) {
        const data = response.data.data;
        const accessToken = response.data.data.accessToken;


        setAuthToken(response.data.data.accessToken);

        // window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        if (accessToken) {
          // alert(accessToken);
          axios1.defaults.headers.common["x-access-token"] = accessToken;
          if (axios1.defaults.headers.common["x-access-token"]) {
            // console.log("x-access-token header is set:", axios1.defaults.headers.common["x-access-token"]);
          } else {
            console.log("x-access-token header is not set.");
          }
        }

        // console.log(data, "data");

        setUser(data)
        const returnUrl = router.query.returnUrl
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        setisAuthenticated(true);

        // const privileges = response.data.privileges;
        // setPermission(privileges);
        router.replace(redirectURL as string)

      }



    }
    catch (err: any) {

      if (errorCallback) errorCallback(err)
    }

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl

    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     setisAuthenticated(true);
    //     router.replace(redirectURL as string)
    //   })

    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
  }
  const handelforgotpassword = async (params: ForgotPasswordParams, errorCallback?: ErrCallbackType) => {

    try {
      const { email } = params;
      const response = await axios1.post('/api/auth/user/forgotPassword', { email });

      if (response && response.status === 200) {
        const data = response.data;

        // console.log(data, "`sdfv`");
        return data;
      }

    }
    catch (err: any) {

      if (errorCallback) errorCallback(err)
    }

  }
  const handelVerifyemailOtp = async (params: handelVerifyemailOtpParams, errorCallback?: ErrCallbackType) => {

    try {

      const { email, otp } = params;


      const response = await axios1.post('api/auth/user/newPassword', { email, otp });

      if (response && response.status === 200) {
        const data = response.data;


        return data;
      }



    }
    catch (err: any) {

      if (errorCallback) errorCallback(err)
    }

  }
  const handelResetPassword = async (params: handelhandelResetPasswordParams, errorCallback?: ErrCallbackType) => {

    try {

      const { email, otp, newPassword } = params;

      const response = await axios1.post('/api/auth/reset-password', { email, otp, newPassword });

      if (response && response.status === 200) {
        const data = response.data;


        return data;
      }



    }
    catch (err: any) {

      if (errorCallback) errorCallback(err)
    }

  }

  const handleLogout = async () => {

    try {

      const response = await axios1.post('/api/auth/user/signout');

      if (response && response.status === 200) {
      

        setUser(null)
        setisAuthenticated(false);
        removeAuthToken();

        // return data;
        // console.log("logout",data);
      }



    }
    catch (err: any) {
      console.log(err);

    }
    router.push('/login')
  }

  const values = {
    user,
    isAuthenticated,
    permission,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    ForgotPassword: handelforgotpassword,
    VerifyemailOtp: handelVerifyemailOtp,
    ResetPassword: handelResetPassword,
    logout: handleLogout,
    stateId,
    setStateId,
    cityId,
    setCityId,
    streamId,
    setStreamId,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
