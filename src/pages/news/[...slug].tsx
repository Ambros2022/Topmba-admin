import { ReactNode } from 'react'
import { useRouter } from 'next/router'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Spinner from 'src/@core/components/spinner'
import InnerNewsPage from 'src/views/InnerNewsPage'

const NewsContent = () => {
  const router = useRouter()

  if (!router.isReady) {
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
        <InnerNewsPage id={slug[0]} />
      )}
    </>
  )
}

const News = () => <NewsContent />

News.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
News.guestGuard = true

export default News
