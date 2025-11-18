import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainExamPage from 'src/views/MainExamPage'


const exams = () => {
    return <>
        <MainExamPage />
    </>
}

exams.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

exams.guestGuard = true

export default exams
