import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import SchoolBannerSec from './Components/SchoolBannerSec'
import { CircularProgress, Box } from '@mui/material';


function InnerSchoolPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/schoolfindone/get/' + id);
      console.log('School Page API Response:', response.data);
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



        
  {/* ✅ FAQ Schema - fixed */}
  {pagedata?.schfaqs?.length > 0 && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: pagedata.schfaqs.map((item) => ({
            '@type': 'Question',
            name: item.questions,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answers.replace(/<\/?[^>]+(>|$)/g, ''), // remove HTML tags
            },
          })),
        }),
      }}
    />
  )}
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org/",
              "@type": "Schools",
              "name": `${pagedata?.meta_title}`,
              "logo": `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.icon}`,
              "url": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": `${pagedata?.address}`
              }

            }
          )}



          
        </script>
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
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/schools`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": pagedata?.name,
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/school/${pagedata?.id}/${pagedata?.slug}`
                },
               
              ]
            }
          ])}
        </script>
      </Head>
      <BannerSection data={pagedata} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {pagedata && <CollegeInfoSection data={pagedata} />}
        </>
      )}

      {!loading && pagedata && <FacilitiesSection data={pagedata} />}
      {!loading && pagedata && <SchoolBannerSec data={pagedata} />}
      {!loading && pagedata && <LocationSection data={pagedata} />}


      <TopFeaturedColleges />
      <ExpertSection />

    </>
  )
}

export default InnerSchoolPage;
