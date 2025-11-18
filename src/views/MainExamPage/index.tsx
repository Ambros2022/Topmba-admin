import BannerSection from './Components/BannerSec'
import TopExamSec from './Components/TopExamSec'
// import BrowsebyCategorySec from './Components/BrowseByCategorySec'
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios1 from 'src/configs/axios'
import dynamic from 'next/dynamic';
const BrowsebyCategorySec = dynamic(() => import('./Components/BrowseByCategorySec'), { ssr: false, });
const MainExamPage = () => {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();
  const [countryData, setCountryData] = useState([]);
  const [streams, setStreams] = useState([]);

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



  const getCountry = useCallback(async () => {
    try {
      const response = await axios.get('api/website/country/get?india=false');
      if (isMountedRef.current) {
        setCountryData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }, [isMountedRef]); // Dependency array ensures function reference stability


  const getStreams = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['size'] = 10000;
      const response = await axios1.get('api/website/stream/get', { params: roleparams });

      setStreams(response.data.data);

    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);



  useEffect(() => {
    getPagedata();
    getCountry();
    getStreams();
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

                  "name": "Exams",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSection />
      <TopExamSec data={pagedata} />
      <BrowsebyCategorySec countryData={countryData} streams={streams} />
    </>
  )
}

export default MainExamPage