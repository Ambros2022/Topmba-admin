// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

// ** Cookies

import Cookies from 'js-cookie';

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {

  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  const getAuthToken = () => {
    return Cookies.get(authConfig.storageTokenKeyName);
  }
  const storedToken = getAuthToken()!;

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
   

      if (!storedToken  && router.route !== "/404") {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/admin/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/admin/login')
        }
      }
    },
    [router.route]
  )
  if (!router.isReady) {
    return fallback; 
  }
  if (auth.loading || auth.user === null && router.route !== "/404") {
    return fallback
  }
  
  return <>{children}</>
}

export default AuthGuard
