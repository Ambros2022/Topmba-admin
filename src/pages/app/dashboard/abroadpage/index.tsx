import dynamic from 'next/dynamic'

// Lazy load the heavy admin component
const AbroadPageList = dynamic(() => import('src/views/app/dashboard/abroadpage/index'), {
  ssr: false,
  loading: () => <p>Loading page...</p>
})

const AbroadPage = () => <AbroadPageList />

export default AbroadPage
