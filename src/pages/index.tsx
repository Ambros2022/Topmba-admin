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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await axios.get(`/api/website/banner/get?promo_banner=Draft`, {
      params: { page: 1, size: 10000 }
    });

    return {
      props: {
        banners: res.data.data || [],
      },
      // revalidate: 60 * 60 * 12,
    };
  } catch (error) {
    console.error("Error fetching banners:", error);
    return {
      props: {
        banners: [],
      },
    };
  }
};


export default Home
