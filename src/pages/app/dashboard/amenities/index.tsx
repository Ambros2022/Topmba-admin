import dynamic from 'next/dynamic'

// Lazy load the heavy admin component
const Amenitieslist = dynamic(() => import('src/views/app/dashboard/amenities/index'), {
  ssr: false,
  loading: () => <p>Loading page...</p>
})

const Amenities = () => <Amenitieslist />

export default Amenities
