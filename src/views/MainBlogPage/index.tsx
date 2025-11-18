
import React, { useCallback, useEffect, useState } from 'react';
import BannerSec from './Components/BannerSec'
import BlogCards from './Components/BlogCards'
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


function MainBlogPage() {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegeData, setcollegeData] = useState([]);


  const getBlogsData = useCallback(async (page = 1) => {
    try {
      const roleparams = { page, size: 8 }; // Hardcoding cardsPerPage to 1
      const response = await axios.get('api/website/blog/get?orderby=desc', { params: roleparams });
      setCardsData(response.data.data);
      setTotalPages(response.data.totalPages); // Set total pages from API response
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


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




  const getColleges = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10000, type: 'college' };
      const response = await axios.get('api/website/colleges/get', { params: roleparams });
      setcollegeData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);


  useEffect(() => {
    getBlogsData(currentPage);
  }, [currentPage, getBlogsData]);


  useEffect(() => {
    getPagedata();
    getColleges();
  }, [getColleges, getPagedata]);
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

                  "name": "Blogs",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSec />
      <BlogCards collegeData={collegeData} cardsData={cardsData} totalPages={totalPages} currentPage={currentPage} getBlogsData={getBlogsData} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default MainBlogPage;
