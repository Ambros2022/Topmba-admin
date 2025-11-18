import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'


// ** Layout Import
import MedicalEduStudioPage from 'src/views/MeidcalEduStudioPage'


const meds = () => {
    return <>
        <MedicalEduStudioPage />
    </>
}

meds.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

meds.guestGuard = true

export default meds
