import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BannerSec from './Components/BannerSec';
import VideoSec from './Components/VideoSec';

const StudentsSpeakPage = () => {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();
  const [cards, setCards] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getScholarshipData = useCallback(async (page = 1, searchText = '') => {
    try {
      const roleparams = { page, size: 6, searchfrom: 'name', searchtext: searchText };
      const response = await axios.get('api/website/allvideotestimonials/get', { params: roleparams });
      if (isMountedRef.current) {
        setCards(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getScholarshipData(currentPage, searchQuery);
  }, [currentPage, searchQuery, getScholarshipData]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

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
  }, []);



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

                  "name": "Students' Speak",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSec handleSearchQuery={handleSearchQuery} />
      <VideoSec cards={cards} totalPages={totalPages} getScholarshipData={getScholarshipData} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  );
};

export default StudentsSpeakPage;
