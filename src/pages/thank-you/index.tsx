import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import ThankyouPage from 'src/views/ThankyouPage'


const thankyou = () => {
    return <>
        <ThankyouPage />
    </>
}
thankyou.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
thankyou.guestGuard = true

export default thankyou
