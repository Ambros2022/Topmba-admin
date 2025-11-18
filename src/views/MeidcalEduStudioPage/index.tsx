import React, { useCallback, useEffect, useRef, useState } from 'react'
import BannerSec from './Components/BannerSec'
import AchieverSec from './Components/AchieversSec'
import ProblemSec from './Components/ProblemSec'
import HelpSec from './Components/HelpSec'
import EducationSec from './Components/EducationSec'
import LearningSec from './Components/LearningSec'
import ServicesSec from './Components/ServicesSec'
import ExamSec from './Components/ExamSec'
import Header from './Components/Header'
import Footer from './Components/Footer'
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useRouter } from 'next/router';
import Head from 'next/head'

const MedicalEduStudioPage = () => {

    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();


    const getPagedata = useCallback(async () => {
        try {
            const response = await axios.get(`api/website/pagefindone/get${router.asPath}`);
            // console.log('Medical Edu Studio Page API Response:', response.data);
            if (isMountedRef.current) {

                setPagedata(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    const bannerSecRef = useRef<HTMLDivElement>(null);

    const scrollToBannerSec = () => {
        if (bannerSecRef.current) {
            bannerSecRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const examSecRef = useRef<HTMLDivElement>(null);


    const scrollToExamSec = () => {
        if (examSecRef.current) {
            examSecRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        getPagedata();

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

                   "name": "Medical Edu Studio",


                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
            </Head>
            <Header />
            {/* <div ref={bannerSecRef}> */}
            <BannerSec refview={bannerSecRef} />
            {/* </div> */}
            <AchieverSec />
            <ProblemSec />
            <HelpSec />
            <EducationSec scrollToExamSec={scrollToExamSec} />
            <LearningSec />
            <ServicesSec scrollToBannerSec={scrollToBannerSec} scrollToExamSec={scrollToExamSec} />
            <ExamSec ref={examSecRef} />
            <Footer />
        </>
    )
}

export default MedicalEduStudioPage;

