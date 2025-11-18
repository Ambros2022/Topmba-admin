
import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'

import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';
import { CircularProgress, Box } from '@mui/material';

function InnerExamPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/examfindone/get/' + id);
      console.log('Exam API Response:', response.data);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);



  const formattedData = pagedata && pagedata.examfaqs && pagedata.examfaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));



  useEffect(() => {
    getPagedata();

  }, [getPagedata]);
  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
        <meta name="keywords" content={pagedata?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
        {formattedData?.length > 0 && (

          <script type="application/ld+json">

            {JSON.stringify([



              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": formattedData,
              },

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

                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/exams`

                  },

                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": pagedata?.exam_title,
                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/exam/${pagedata?.id}/${pagedata?.slug}`
                  }

                ]

              }

            ])}

          </script>
          // <script type="application/ld+json">
          //   {JSON.stringify({
          //     "@context": "https://schema.org",
          //     "@type": "FAQPage",
          //     "mainEntity": formattedData,
          //   })}
          // </script>


        )}
      </Head>
      {/* {!loading && pagedata && <BannerSec data={pagedata} />} */}
      <BannerSec data={pagedata} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {pagedata && <OverviewSec data={pagedata} />}
        </>
      )}
      <OrganizationSection data={pagedata} />
      <ExperTraineeSec data={pagedata} />
      {/* {!loading && pagedata && <UpcomingExamsSec data={news} />} */}

      {/* <OverviewSec /> */}
    </>
  )
}

export default InnerExamPage
