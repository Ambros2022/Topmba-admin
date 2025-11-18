import { ReactNode } from 'react'
// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import { useRouter } from 'next/router'
import Spinner from 'src/@core/components/spinner'
import InnerBlogPage from 'src/views/InnerBlogpage'

const BlogContent = () => {
  const router = useRouter()

  if (!router.isReady) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </div>
    )
  }

  if (Array.isArray(router.query.slug) && router.query.slug.length <= 2) {
    return <InnerBlogPage id={router.query.slug[0]} />
  }

  return null
}

const Blog = () => <BlogContent />

Blog.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
Blog.guestGuard = true

export default Blog
