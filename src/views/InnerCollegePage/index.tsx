import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import FacilitiesSection from './Components/FacilitiesSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import ExpertSection from './Components/ExpertSection'
import Testimonial from './Components/TestimonialSec'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material'


function InnerCollegePage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testdata, setTestdata] = useState<any>(null);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/collegefindone/get/' + id);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);

  const gettestimonials = useCallback(async () => {
    try {
      const response = await axios.get('api/website/testimonial/filter/get?page=1&size=15&college_id=' + id);
      if (isMountedRef.current) {
        setTestdata(response.data.data);

      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);



  const formattedData = pagedata && pagedata.collegefaqs && pagedata.collegefaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));




  useEffect(() => {
    getPagedata();

    gettestimonials();

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
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": formattedData,
            })}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org/",
              "@type": "CollegeOrUniversity",
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
                  "name": "Colleges",
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/colleges`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": pagedata?.name,
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/college/${pagedata?.id}/${pagedata?.slug}`
                },
                // {
                //   "@type": "ListItem",
                //   "position": 4,
                //   "name": pagedata?.name,
                //   "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`
                // }
              ]
            }
          ])}
        </script>
      </Head>
      {/* Show loader while loading */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!loading && pagedata && <BannerSection data={pagedata} />}
          {!loading && pagedata && <CollegeInfoSection data={pagedata} />}
          {!loading && pagedata && <FacilitiesSection data={pagedata} />}
          {testdata && testdata.length > 0 && <Testimonial testimonials={testdata} />}
          {!loading && pagedata && <LocationSection data={pagedata} />}
          <TopFeaturedColleges />
          <ExpertSection />
        </>
      )}

    </>
  )
}

export default InnerCollegePage
