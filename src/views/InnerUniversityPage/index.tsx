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
import Testimonial from './Components/TestimonialSec'
import { CircularProgress, Box } from '@mui/material'; // Import CircularProgress

function InnerUniversityPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testdata, setTestdata] = useState<any>(null);

  const gettestimonials = useCallback(async () => {
    try {
      const response = await axios.get('api/website/testimonial/filter/get?page=1&size=15&college_id=' + id);
      console.log('Medical Edu Studio Page API Response:', response.data);

      if (isMountedRef.current) {
        setTestdata(response.data.data);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch testimonials:', error);
    }
  }, [id, isMountedRef, router]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/collegefindone/get/' + id);
      // console.log('College API Response:', response.data);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false); // Set loading to false once data is fetched
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
        {pagedata && (
          <>
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
                      "name": "Universities",
                      "item": `${process.env.NEXT_PUBLIC_WEB_URL}/universities`
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": pagedata?.name,
                      "item": `${process.env.NEXT_PUBLIC_WEB_URL}/university/${pagedata?.id}/${pagedata?.slug}`
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
          </>
        )}

      </Head>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BannerSection data={pagedata} />
          <CollegeInfoSection data={pagedata} />
          <FacilitiesSection data={pagedata} />
          {testdata && testdata.length > 0 && <Testimonial testimonials={testdata} />}
          <LocationSection data={pagedata} />
          <TopFeaturedColleges />
          <ExpertSection />
        </>
      )}
    </>
  )
}

export default InnerUniversityPage;
