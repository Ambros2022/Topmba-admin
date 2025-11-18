
import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import InfoSec from './Components/InfoSec'

import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExpertSection from './Components/ExpertSection';
import { Box, CircularProgress } from '@mui/material'

function InnerNewsPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/newsfindone/get/' + id);
    
      // 👇 log full API response
      console.log("API full response:", response);

      // 👇 log only the data field
      console.log("API data:", response.data);

      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);







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
                  "name": "News",
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/news`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": pagedata?.name,
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`
                },

              ]
            }
          ])}
        </script>
      </Head>


      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BannerSec data={pagedata} />
          <InfoSec data={pagedata} />

          <ExpertSection />
        </>)}



    </>
  )
}

export default InnerNewsPage
