import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import EducationLoanPage from 'src/views/EducationLoanPage'


const educationLoan = () => {
    return <>
        <EducationLoanPage />
    </>
}

educationLoan.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

educationLoan.guestGuard = true

export default educationLoan
