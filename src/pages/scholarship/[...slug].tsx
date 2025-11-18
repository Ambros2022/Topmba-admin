
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerScholarshipPage from 'src/views/InnerScholarshipPage'

const board = () => {
  const router = useRouter()
  const [isRouterReady, setIsRouterReady] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true)
    }
  }, [router.isReady])

  if (!isRouterReady) {
    return <Spinner />
  }

  const { slug } = router.query

  return (
    <>
      {Array.isArray(slug) && slug.length <= 2 && (
        <InnerScholarshipPage id={slug[0]} />
      )}
    </>
  )
}

board.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

board.guestGuard = true

export default board

