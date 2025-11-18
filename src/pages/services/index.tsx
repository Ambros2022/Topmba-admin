import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import ServicesPage from 'src/views/ServicesPage'


const services = () => {
    return <>
        <ServicesPage />
    </>
}

services.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

services.guestGuard = true

export default services
