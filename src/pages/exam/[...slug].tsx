import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerExamPage from 'src/views/InnerExamPage'

const ExamContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    // Prevent layout shift by reserving space while loading
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
        <InnerExamPage id={slug[0]} />
      )}
    </>
  )
}

const Exam = () => <ExamContent />

Exam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
Exam.guestGuard = true

export default Exam
