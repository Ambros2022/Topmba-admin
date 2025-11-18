import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MbbsAbroadPage from 'src/views/MbbsAbroadPage'


const mbbsAbroad = () => {
  return <>
    <MbbsAbroadPage />
  </>
}

mbbsAbroad.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

mbbsAbroad.guestGuard = true

export default mbbsAbroad
