import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainSchoolPage from 'src/views/MainSchoolPage'


const schools = () => {
    return <>
        <MainSchoolPage />
    </>
}

schools.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

schools.guestGuard = true

export default schools
