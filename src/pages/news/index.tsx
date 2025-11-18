import { ReactNode } from 'react'

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainNewsPage from 'src/views/MainNewsPage'


const news = () => {
    console.log("main newspage");
    return <>
        <MainNewsPage />
    </>
}

news.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

news.guestGuard = true

export default news
