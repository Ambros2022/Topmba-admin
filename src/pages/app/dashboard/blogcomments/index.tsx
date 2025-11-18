import dynamic from 'next/dynamic'

// Lazy load the heavy admin component
const Bannerlist = dynamic(() => import('src/views/app/dashboard/blog/blogcomments'), {
  ssr: false,
  loading: () => <p>Loading page...</p>
})

const Page = () => <Bannerlist />

export default Page
