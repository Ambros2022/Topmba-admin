
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import BannerSec from './Components/BannerSec'
import ScholarshipAbroadSec from './Components/ScholarshipAbroadSec'
import FilterSec from './Components/FilterSec'
import { useRouter } from 'next/router';

const ScholarshipPage = () => {
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();
    const [abroadData, setAbroadData] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    const [countryData, setCountryData] = useState([]);


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


    const getAboradPage = useCallback(async () => {
        try {
            const response = await axios.get('api/website/abroadpages/get');
            if (isMountedRef.current) {

                setAbroadData(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);


    const getScholarlevel = useCallback(async () => {
        try {
            const response = await axios.get('/api/website/allscholarlevel/get');
            if (isMountedRef.current) {
                setLevelOptions(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [isMountedRef]); // Dependency array ensures function reference stability

    const getScholarType = useCallback(async () => {
        try {
            const response = await axios.get('/api/website/allscholartype/get');
            if (isMountedRef.current) {
                setTypeOptions(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [isMountedRef]); // Dependency array ensures function reference stability


    const getCountry = useCallback(async () => {
        try {
            const response = await axios.get('api/website/country/get');
            if (isMountedRef.current) {
                setCountryData(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [isMountedRef]); // Dependency array ensures function reference stability



    useEffect(() => {
        getPagedata();
        getAboradPage();
        getScholarlevel();
        getScholarType();
        getCountry();
    }, []);

    return (
        <>
            <Head>
                <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
                <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
                <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
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

                                    "name": "Scholarships",

                                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                                },



                            ]

                        }

                    ])}

                </script>
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
            </Head>
            <BannerSec />
            <ScholarshipAbroadSec data={pagedata} />
            <FilterSec abroadData={abroadData} levelOptions={levelOptions} typeOptions={typeOptions} countryData={countryData} />
        </>
    )
}

export default ScholarshipPage