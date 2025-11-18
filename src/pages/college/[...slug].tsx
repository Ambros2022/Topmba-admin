import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerCollegePage from 'src/views/InnerCollegePage'
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'

const CollegeContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
      </div>
    )
  }

  const { slug } = router.query

  if (Array.isArray(slug)) {
    if (slug.length <= 2) {
      return <InnerCollegePage id={slug[0]} />
    } else if (slug.length >= 3) {
      return <InnerCourseCollegePage Collegeid={slug[0]} Courseslug={slug[2]} />
    }
  }

  return null
}

const College = () => <CollegeContent />

College.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
College.guestGuard = true

export default College
