import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import AboutUsPage from 'src/views/AboutUsPage'


const aboutUs = () => {
    return <>
        <AboutUsPage />
    </>
}

aboutUs.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

aboutUs.guestGuard = true

export default aboutUs
