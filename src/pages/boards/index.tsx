import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import MainBoardPage from 'src/views/MainBoardPage'


const boards = () => {
    return <>
        <MainBoardPage />
    </>
}

boards.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>
boards.guestGuard = true

export default boards
