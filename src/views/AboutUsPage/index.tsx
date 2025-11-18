import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import Overview from './Components/Overview'
// import JourneySec from './Components/JourneySec'
const JourneySec = dynamic(() => import("./Components/JourneySec"), { ssr: false });
const TestimonialSec = dynamic(() => import("./Components/TestimonialSec"), { ssr: false });
// import TestimonialSec from './Components/TestimonialSec'
const OurPortalSec = dynamic(() => import("./Components/OurPortalsSec"), { ssr: false });
// import OurPortalSec from './Components/OurPortalsSec'
// import ContactUsSec from './Components/ContactUsSec'
const ContactUsSec = dynamic(() => import("./Components/ContactUsSec"), { ssr: false });
import { useRouter } from 'next/router'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head'
import dynamic from 'next/dynamic';

const AboutUsPage = () => {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get(`api/website/pagefindone/get${router.asPath}`);
      if (isMountedRef.current) {

        setPagedata(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);



  useEffect(() => {
    getPagedata();

  }, []);
  return (
    <>
      <Head>
        <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
        <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        <script type="application/ld+json">

          {JSON.stringify([




            {

              "@context": "https://schema.org/",

              "@type": "BreadcrumbList",

              "itemListElement": [

                {

                  "@type": "ListItem",

                  "position": 1,

                  "name": "Home",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/`



                },

                {

                  "@type": "ListItem",

                  "position": 2,

                  "name": " About Us",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSec />
      <Overview />

      <JourneySec />
      <TestimonialSec />
      <OurPortalSec />
      <ContactUsSec />
    </>
  )
}

export default AboutUsPage