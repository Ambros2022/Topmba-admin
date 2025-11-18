import BannerSec from './Components/BannerSec'
import BestSec from './Components/BestSec'
import BoardsSec from './Components/BoardsSec'
import LatestUpdateSec from './Components/LatestUpdates'
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

const MainBoardPage = () => {
  const router = useRouter()
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<any>();
  const [activeTab, setActiveTab] = useState('all');
  const [displayCount, setDisplayCount] = useState(4);
  const [boardItems, setBoardItems] = useState<any[]>([]);
  const [updates, setUpdates] = useState<any[]>([]);

  const getBoardsData = useCallback(async () => {
    try {
      const response = await axios.get('api/website/news/get?category_id=8');
      if (isMountedRef.current) {
        setUpdates(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending schoolboard:', error);
    }
  }, [isMountedRef]);

  const getPagedata = useCallback(async () => {
    try {
      const response = await axios.get(`api/website/pagefindone/get${router.asPath}`);
      if (isMountedRef.current) {

        setPagedata(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending boards:', error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = activeTab === 'all'
          ? await axios.get('/api/website/schoolboard/get')
          : await axios.get(`/api/website/schoolboard/get?board_type=${activeTab}`);

        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setBoardItems(data);

      } catch (error) {
        console.error('Error fetching board data:', error);
        setBoardItems([]); // Ensure boardItems is an array even if the fetch fails
      }
    };

    fetchBoardData();
  }, [activeTab]);


  useEffect(() => {
    getPagedata();
    getBoardsData();

  }, []);

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

                  "name": "Boards",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
      </Head>
      <BannerSec />
      <BestSec data={pagedata} />
      <BoardsSec boardItems={boardItems} activeTab={activeTab} displayCount={displayCount} setActiveTab={setActiveTab} setDisplayCount={setDisplayCount} />
      {updates && updates.length > 0 && <LatestUpdateSec updates={updates} />}
    </>
  )
}

export default MainBoardPage