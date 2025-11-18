import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import MedicalSec from './Components/MedicalSec'
import TopCountrySec from './Components/TopCountrySec'
import FaqSec from '../EducationLoanPage/Components/FaqSec'
import ImportantSec from './Components/ImportantSec'
import ExpertSec from './Components/ExpertSec'
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useRouter } from 'next/router'
import Head from 'next/head'

const MbbsAbroadPage = () => {
    const data = {
        abroadpagefaqs: [
            {
                questions: "Can I practice medicine in India after completing my MBBS from abroad?",
                answers: "<p>Yes, Indian students who complete their MBBS from abroad can practice medicine in India. However, they must clear the Foreign Medical Graduates Examination (FMGE), which is mandatory for all foreign-educated medical graduates. Once they pass this exam, they can register with the National Medical Commission (NMC) and start practicing.</p>"
            },
            {
                questions: "Are there any scholarships available for Indian students pursuing MBBS abroad?",
                answers: "<p>Yes, there are various scholarships available for Indian students who wish to study MBBS abroad. These scholarships can be provided by the respective universities, the governments of the host countries, or international organizations.</p>"
            },
            {
                questions: "What are the career prospects after completing an MBBS abroad?",
                answers: "<p>After completing an MBBS abroad, students can pursue various career paths, such as practicing medicine in India (after clearing FMGE), continuing their education with postgraduate studies, or working in the host country if they meet the local licensing requirements. Many countries offer opportunities for further specialization and research in the medical field.</p>"
            },
            {
                questions: "What are the language requirements for studying MBBS abroad?",
                answers: "<p>The language of instruction for MBBS in most countries like Russia, Ukraine, and the Philippines is English. However, some countries may require students to learn the local language, especially if they will be interacting with patients during clinical training. Universities often provide language courses to help international students.</p>"
            },
            {
                questions: "How does the quality of education in foreign medical colleges compare to Indian colleges?",
                answers: "<p>The quality of education in foreign medical colleges can be on par with, or even exceed, that of Indian colleges, especially in countries like Russia, Ukraine, and the Philippines, which have well-established medical programs recognized by international bodies. The curriculum is often updated with the latest medical practices, and students gain exposure to diverse medical cases, enhancing their learning experience.</p>"
            }
        ]
    };
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();


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
    const formattedData = data && data?.abroadpagefaqs && data?.abroadpagefaqs.map((item) => ({
        "@type": "Question",
        "name": item.questions,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answers,
        },
    }));
    return (
        <>
            <Head>
                <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
                <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
                <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
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

                  "name": "MBBS Abroad",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>
            </Head>
            <BannerSec />
            <MedicalSec data={pagedata} />
            <TopCountrySec />
            <FaqSec data={data} />
            <ImportantSec />
            <ExpertSec />
        </>
    )
}

export default MbbsAbroadPage