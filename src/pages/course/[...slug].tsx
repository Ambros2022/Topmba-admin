import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import FrontLayout from 'src/@core/layouts/FrontLayout'
import InnerCoursePage from 'src/views/InnerCoursePage'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'
import Spinner from 'src/@core/components/spinner'

const CoursePageContent = () => {
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
      return <InnerCoursePage id={slug[0]} />
    } else if (slug.length >= 3) {
      return <SubInnerCoursePage Streamid={slug[0]} Courseslug={slug[2]} />
    }
  }

  return null
}

const CoursePage = () => <CoursePageContent />

CoursePage.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
CoursePage.guestGuard = true

export default CoursePage
