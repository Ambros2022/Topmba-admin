import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import NriQuotaPage from 'src/views/NriQuotaPage'


const nriQuota = () => {
    return <>
        <NriQuotaPage />
    </>
}

nriQuota.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

nriQuota.guestGuard = true

export default nriQuota
