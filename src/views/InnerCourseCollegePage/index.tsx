import React, { useCallback, useEffect, useState } from 'react'

import TopFeaturedColleges from './Components/TopFeaturedColleges'

import BannerSection from './Components/BannerSection'

import CourseDetailSec from './Components/CourseDetailSec'

import ExpertSection from './Components/ExpertSection'

import useIsMountedRef from 'src/hooks/useIsMountedRef';

import axios from 'src/configs/axios';

import Head from 'next/head';

import { useRouter } from 'next/router';



function InnerCourseCollegePage({ Collegeid, Courseslug }) {

  const router = useRouter();

  const isMountedRef = useIsMountedRef();

  const [pagedata, setPagedata] = useState<any>(null);

  const [loading, setLoading] = useState(true);





  const getPagedata = useCallback(async () => {

    try {

      const slug = Courseslug; // replace with actual slug

      const id = Collegeid; // replace with actual id







      const response = await axios.get(`/api/website/coursefindone/get/${slug}/${id}`);



      // Print API response data

      // console.log('API Response:', {

      //   fullResponse: response.data,

      //   data: response.data.data,

      //   meta: {

      //     title: response.data.data?.meta_title,

      //     description: response.data.data?.meta_description,

      //     keywords: response.data.data?.meta_keyword

      //   },

      //   courseInfo: {

      //     name: response.data.data?.course_name,

      //     slug: response.data.data?.slug,

      //     collegeId: id

      //   }

      // });



      if (isMountedRef.current) {

        setPagedata(response.data.data);

        setLoading(false);

      }

    } catch (error) {

      router.push("/404");

      console.error('Failed to fetch page data:', error);

    }

  }, [Collegeid, isMountedRef, router]);



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

            // {

            //   "@context": "https://schema.org/",

            //   "@type": "CollegeOrUniversity",

            //   "name": `${pagedata?.meta_title}`,

            //   "logo": `${process.env.NEXT_PUBLIC_IMG_URL}/${pagedata?.icon}`,

            //   "url": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`,

            //   "address": {

            //     "@type": "PostalAddress",

            //     "streetAddress": `${pagedata?.address}`

            //   }

            // },

            {

              "@context": "https://schema.org",

              "@type": "Course",

              "name": `${pagedata?.title}`,

              "description": `${pagedata?.meta_description}`,

              "provider": {

                "@type": "CollegeOrUniversity",

                "name": pagedata?.college?.name,

                "url": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`,

              }

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

                  "name": "Colleges",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/colleges`

                },

                {

                  "@type": "ListItem",

                  "position": 3,

                  "name": pagedata?.college?.name,

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/college/${Collegeid}/${pagedata?.college?.slug}`

                },

                {

                  "@type": "ListItem",

                  "position": 4,

                  "name": pagedata?.course_short_name,

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                }

              ]

            }

          ])}

        </script>

      </Head>

      {/* {!loading && pagedata && <BannerSection data={pagedata} />} */}

      {/* {!loading && pagedata && <CourseDetailSec data={pagedata} />} */}







      {loading ? (

        <section className="bg-blue   py-5 minehightcoursesneew d-flex align-items-center justify-content-center">

          <h2 className="text-white">Loading...</h2>

        </section>

      ) : (

        <BannerSection data={pagedata} />

      )}

      {loading ? (

        <section className="  py-5 heightparanew d-flex align-items-center justify-content-center">

          <h2 className="text-black">Loading...</h2>

        </section>

      ) : (

        <CourseDetailSec data={pagedata} />

      )}

      {/* dentalCourseCon */}



      <ExpertSection />

      {!loading && pagedata && <TopFeaturedColleges data={pagedata} />}

    </>

  )

}



export default InnerCourseCollegePage

