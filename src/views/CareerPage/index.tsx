
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import BannerSec from './Components/BannerSec'
import AboutSec from './Components/AboutSec'
import CurrentOpeningSec from './Components/CurrentOpeningSec'
import ContactCareerSec from './Components/ContactCareerSec'
import DisclaimerSec from './Components/DisclaimerSec'

import { useRouter } from 'next/router';

const CareerPage = () => {
    const router = useRouter()
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>();
    const [jobData, setJobData] = useState([]);
    const [locations, setLocation] = useState([]);


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




    const getJobs = useCallback(async () => {
        try {
            const response = await axios.get('api/website/jobposition/get');
            if (isMountedRef.current) {

                setJobData(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    const getJobsLocation = useCallback(async () => {
        try {
            const response = await axios.get('api/website/alljoblocation/get');
            if (isMountedRef.current) {

                setLocation(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getPagedata();
        getJobs();
        getJobsLocation();


    }, []);

    return (
        <>
            <Head>
                <title>{pagedata && pagedata?.meta_title ? pagedata?.meta_title : "Study in India | Study Abroad | Learntech Edu Solutions"}</title>
                <meta name="description" content={pagedata && pagedata?.meta_description ? pagedata?.meta_description : "Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad."} />
                <meta name="keywords" content={pagedata && pagedata?.meta_keyword ? pagedata?.meta_keyword : "Learntechweb"} />
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`} />
            </Head>
            <BannerSec />
            <AboutSec data={pagedata} />
            <CurrentOpeningSec jobData={jobData} />
            <ContactCareerSec locations={locations} data={jobData} />
            <DisclaimerSec data={pagedata} />
        </>
    )
}

export default CareerPage