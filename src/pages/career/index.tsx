import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import CareerPage from 'src/views/CareerPage'


const career = () => {
    return <>
        <CareerPage />
    </>
}

career.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

career.guestGuard = true

export default career
