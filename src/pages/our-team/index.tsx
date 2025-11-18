import { ReactNode } from 'react'


// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import OurTeamPage from 'src/views/OurteamPage'


const ourTeam = () => {
    return <>
        <OurTeamPage />
    </>
}

ourTeam.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

ourTeam.guestGuard = true

export default ourTeam
