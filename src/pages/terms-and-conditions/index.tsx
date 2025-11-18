import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import TermConditionPage from 'src/views/TermConditionPage'


const termConditionPage = () => {
    return <>
        <TermConditionPage />
    </>
}
termConditionPage.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
termConditionPage.guestGuard = true

export default termConditionPage
