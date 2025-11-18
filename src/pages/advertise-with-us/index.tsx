import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import AdvertisePage from 'src/views/AdvertisePage'


const advertiseWithUs = () => {
    return <>
        <AdvertisePage />
    </>
}

advertiseWithUs.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

advertiseWithUs.guestGuard = true

export default advertiseWithUs
