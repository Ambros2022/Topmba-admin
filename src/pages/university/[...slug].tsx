import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerUniversityPage from 'src/views/InnerUniversityPage'

const UniversityContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </div>
    )
  }

  const { slug } = router.query

  return (
    <>
      {Array.isArray(slug) && slug.length <= 2 && (
        <InnerUniversityPage id={slug[0]} />
      )}
    </>
  )
}

const University = () => <UniversityContent />

University.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
University.guestGuard = true

export default University
