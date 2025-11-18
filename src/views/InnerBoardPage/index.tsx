import React, { useCallback, useEffect, useState } from 'react'
import BannerSection from './Components/BannerSection'
import CollegeInfoSection from './Components/CollegeInfoSection'
import LocationSection from './Components/LocateSection'
import TopFeaturedColleges from './Components/TopFeaturedColleges'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material'

function InnerBoardPage({ id }) {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get('api/website/schoolboardfindone/get/' + id);
      // console.log('Board Page API Response:', response.data);
      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [id, isMountedRef, router]);
  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Determine the day and its suffix
    const day = date.getDate();
    const daySuffix = (n: number) => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const suffix = daySuffix(day);

    // Get the month name and year
    const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const [month, year] = date.toLocaleDateString('en-US', options).split(' ');

    // Return formatted date
    // return `${day}${suffix} ${month} `;
    return `${day}${suffix} ${month} ${year}`;
  }

  const getExams = useCallback(async () => {
    try {
      const roleparams: Record<string, any> = {
        page: 1,
        size: 10000,
      };

      const response = await axios.get('api/website/exams/get', { params: roleparams });

      const currentDate = new Date(); // Get the current date and time

      // Map and format exam data
      const examData = response.data.data.map((exam: any) => ({
        id: exam.id,
        exam_title: exam.exam_title,
        slug: exam.slug,
        logo: exam.logo,
        date: formatDate(exam.upcoming_date), // Format the date here
        upcoming_date: new Date(exam.upcoming_date), // Parse for filtering and sorting
      }));

      // Filter out exams with a date before the current date
      const upcomingExams = examData.filter(exam => exam.upcoming_date >= currentDate);

      // Sort exams by the upcoming_date in ascending order
      const sortedData = upcomingExams.sort(
        (a, b) => a.upcoming_date.getTime() - b.upcoming_date.getTime()
      );



      if (isMountedRef.current) {
        setExams(sortedData);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [isMountedRef]);

  const formattedData = pagedata && pagedata.schoolboardfaqs && pagedata.schoolboardfaqs.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));



  useEffect(() => {
    getPagedata();
    getExams();
  }, [getPagedata, getExams]);
  return (
    <>
      <Head>
        <title>{pagedata?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pagedata?.meta_description || "Are you searching for which board is best for your child"} />
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
                  "name": "Boards",
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/boards`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": pagedata?.short_name,
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
          <BannerSection data={pagedata} />
          <CollegeInfoSection data={pagedata} exams={exams} />
          <LocationSection data={pagedata} />
        </>)}

      <TopFeaturedColleges />

    </>
  )
}

export default InnerBoardPage
