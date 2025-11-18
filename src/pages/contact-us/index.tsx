import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import ContactUsPage from 'src/views/ContactUsPage'


const contactUs = () => {
    return <>
        <ContactUsPage />
    </>
}

contactUs.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

contactUs.guestGuard = true

export default contactUs
