import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerSchoolPage from 'src/views/InnerSchoolPage'

const SchoolContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    // Reserve vertical space to avoid CLS
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    )
  }

  const { slug } = router.query

  return (
    <>
      {Array.isArray(slug) && slug.length <= 2 && (
        <InnerSchoolPage id={slug[0]} />
      )}
    </>
  )
}

const School = () => <SchoolContent />

School.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
School.guestGuard = true

export default School
