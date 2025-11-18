import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainCoursePage from 'src/views/MainCoursePage'


const courses = () => {
    return <>
        <MainCoursePage />
    </>
}

courses.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

courses.guestGuard = true

export default courses
