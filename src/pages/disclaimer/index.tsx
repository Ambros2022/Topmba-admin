import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import DisclaimerPage from 'src/views/DisclaimerPage'


const disclaimer = () => {
    return <>
        <DisclaimerPage />
    </>
}

disclaimer.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

disclaimer.guestGuard = true

export default disclaimer
