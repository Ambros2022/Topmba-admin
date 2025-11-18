import React, { useCallback, useEffect, useState } from 'react';
import BannerSection from './Components/BannerSection';
import OverviewSection from './Components/OverviewSection';
import PopularCourses from './Components/PopularCourses';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExpertSection from './Components/ExpertSection';
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';
import Testimonial from './Components/TestimonialSec'

interface Pagedata {
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: string;
  generalcoursefaqs?: { questions: string; answers: string }[];
  // added fields used by BreadcrumbList and page rendering
  name?: string;
  short_name?: string;
  streams?: {
    id?: number;
    name?: string;
    slug?: string;
    banner?: string;
  } | null;
}

interface SubInnerCoursePageProps {
  Streamid: string;
  Courseslug: string;
}

const SubInnerCoursePage: React.FC<SubInnerCoursePageProps> = ({ Streamid, Courseslug }) => {
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const [pagedata, setPagedata] = useState<Pagedata | null>(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);


  const getPagedata = useCallback(async () => {
    try {
      const slug = Courseslug;
      const id = Streamid;

      const response = await axios.get(`/api/website/general/stream/get/${slug}/${id}`);
      console.log('Sub Inner Course Page API Response:', response.data);

      if (isMountedRef.current) {
        setPagedata(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      router.push("/404");
      console.error('Failed to fetch page data:', error);
    }
  }, [Streamid, Courseslug, isMountedRef, router]);

  const getColleges = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/colleges/get', {
        params: {
          page: 1,
          size: 8,
          type: 'college',
          stream_id: [Streamid]
        }
      });
      if (isMountedRef.current) {
        setColleges(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    }
  }, [Streamid, isMountedRef]);

  const getExams = useCallback(async () => {
    try {
      const response = await axios.get('/api/website/exams/get', {
        params: {
          page: 1,
          size: 8,
          stream_id: Streamid
        }
      });
      if (isMountedRef.current) {
        setExams(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    }
  }, [Streamid, isMountedRef]);

  const formattedData = pagedata?.generalcoursefaqs?.map((item) => ({
    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  })) || [];

  useEffect(() => {
    getPagedata();
    getColleges();
    getExams();

  }, [getPagedata, getColleges, getExams]);

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
                    "name": "Courses",
                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/courses`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": pagedata?.streams?.name || null,
                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/course/${pagedata?.streams?.id}/${pagedata?.streams?.slug}`
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": pagedata?.short_name || null,
                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`
                  }
                ]
              }
            ])}
          </script>
        )}
      </Head>
      {/* {!loading && pagedata && <BannerSection data={pagedata} />}
      {!loading && pagedata && <OverviewSection data={pagedata} colleges={colleges} exams={exams} />} */}
      {/* {!loading && pagedata && <BannerSection data={pagedata}  />} */}
      {loading ? (
        <section className="bg-blue  py-5 minehightcoursesneew d-flex align-items-center justify-content-center">
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
        <OverviewSection data={pagedata} colleges={colleges} exams={exams} />
      )}

      <PopularCourses />
      {!loading && pagedata && <Testimonial data={pagedata} />}
      <OrganizationSection data={pagedata} />
      <ExperTraineeSec data={pagedata} />
      <ExpertSection />
    </>
  );
}

export default SubInnerCoursePage;
