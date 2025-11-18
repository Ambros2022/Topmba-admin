import React, { useCallback, useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection';
import TopCollegesSection from './Components/TopCollegesSection';
// import ExpertSection from './Components/ExpertSection';
// import TopFeaturedColleges from './Components/TopFeaturedColleges';
// import CollegeFilterSection from './Components/CollegeFilterSection';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import dynamic from 'next/dynamic';
const TopFeaturedColleges = dynamic(() => import('./Components/TopFeaturedColleges'), { ssr: false });
const ExpertSection = dynamic(() => import('./Components/ExpertSection'), { ssr: false });
const CollegeFilterSection = dynamic(() => import('./Components/CollegeFilterSection'), { ssr: false });

function MainSchoolPage() {
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
  }, [getPagedata,]);
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
                  "name": "Schools",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSection />
      <TopCollegesSection data={pagedata} />
      <CollegeFilterSection />
      <ExpertSection />
      <TopFeaturedColleges />
    </>
  )
}

export default MainSchoolPage;
