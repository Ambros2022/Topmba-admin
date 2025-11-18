import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import ScholarshipPage from 'src/views/ScholarshipPage'


const scholarshipPage = () => {
    return <>
        <ScholarshipPage />
    </>
}

scholarshipPage.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

scholarshipPage.guestGuard = true

export default scholarshipPage
