import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import SiteMapPage from 'src/views/SiteMapPage'


const sitemap = () => {
    return <>
        <SiteMapPage />
    </>
}

sitemap.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

sitemap.guestGuard = true

export default sitemap
