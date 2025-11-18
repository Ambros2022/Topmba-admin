

import { ReactNode, useCallback, useEffect, useState } from 'react';
import FrontLayout from 'src/@core/layouts/FrontLayout';
import AbroadPage from 'src/views/AbroadPage';
import { useRouter } from 'next/router';
import Spinner from 'src/@core/components/spinner';
import axios from 'src/configs/axios';
import Head from 'next/head';
import useIsMountedRef from 'src/hooks/useIsMountedRef';



const StudyInUSA = () => {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

  const getPageData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`api/website/abroadpagefindone/get/study-in-uk`);
      if (isMountedRef.current) {
        setPageData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError('Failed to fetch page data');
        setLoading(false);
      }
      console.error('Failed to fetch page data:', error);
      router.push("/404");
    }
  }, [isMountedRef, router]);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  if (!isRouterReady || loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Head>
        <title>{pageData?.meta_title || "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
        <meta name="description" content={pageData?.meta_description || "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
        <meta name="keywords" content={pageData?.meta_keyword || "Learntechweb"} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
      </Head>
      <AbroadPage data={pageData} />
    </>
  );
};

StudyInUSA.getLayout = (page: ReactNode) => <FrontLayout>{page}</FrontLayout>;
StudyInUSA.guestGuard = true;

export default StudyInUSA;
