// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'


interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    // console.log("GuestGuard", 1);
    if (window.localStorage.getItem('userData')) {
      // console.log("GuestGuard", 2);
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])


  return <>{children}</>
}

export default GuestGuard
