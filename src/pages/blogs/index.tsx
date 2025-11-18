import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainBlogPage from 'src/views/MainBlogPage'


const blogs = () => {
    return <>
        <MainBlogPage />
    </>
}

blogs.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

blogs.guestGuard = true

export default blogs
