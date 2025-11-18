import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import StudentsSpeakPage from 'src/views/StudentsSpeakPage'


const studentsSpeak = () => {
    return <>
        <StudentsSpeakPage />
    </>
}

studentsSpeak.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

studentsSpeak.guestGuard = true

export default studentsSpeak
