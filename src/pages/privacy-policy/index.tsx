import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import PrivacyPolicypage from 'src/views/PrivacyPolicyPage'


const PrivacyPolicy = () => {
    return <>
        <PrivacyPolicypage />
    </>
}

PrivacyPolicy.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

PrivacyPolicy.guestGuard = true

export default PrivacyPolicy
