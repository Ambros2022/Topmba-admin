import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainCollegePage from 'src/views/MainCollegePage'


const colleges = () => {
    return <>
        <MainCollegePage />
    </>
}

colleges.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

colleges.guestGuard = true

export default colleges
