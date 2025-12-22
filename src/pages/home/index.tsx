import { GetStaticProps } from 'next/types';
import { ReactNode } from 'react'
import axios from 'src/configs/axios';

// ** Layout Import
import FrontLayout from 'src/@core/layouts/FrontLayout'
import Homepage from 'src/views/Homepage'



const Home: any = ({ banners }) => {
  return <Homepage banners={banners} />;
};

Home.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>

Home.guestGuard = true




export default Home
