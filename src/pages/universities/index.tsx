import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainUniversitiesPage from 'src/views/MainUniversitiesPage'


const universities = () => {
    return <>
        <MainUniversitiesPage />
    </>
}

universities.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
universities.guestGuard = true

export default universities
