import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const ThankyouPage = () => {
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

                                    "name": "Thank you",

                                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                                },



                            ]

                        }

                    ])}

                </script>
            </Head>
            <section className='bg-skyBlue thnkCon'>
                <div className="container py-5">
                    <div className="d-flex justify-content-center">
                        <div className="text-center align-content-center">
                            <img src='/images/icons/thankyou-ing.png' alt='thankyou-img' width={70} height={70} />
                            <h1 className='text-blue fw-bold'>Thank you!</h1>
                            <h6 className='fw-bold text-black mb-3'>Our counsellors will get in touch with you shortly. You could also call us on 18001208696 (toll-free) for further queries.</h6>
                            <h6 className='text-black mb-3'>Stay updated with the Learntech Edu Solutions Pvt. Ltd.</h6>
                            <div className='d-flex gap-3 justify-content-center flex-md-row flex-column mx-5 mx-md-0 flex-wrap socialThnks'>
                                <Link className='text-blue btn viewDetailBtn' href="https://www.facebook.com/learntechedu" target='_blank'><img width={27} height={27} className='mx-2 p-1 rounded' src="/images/icons/facebookForm.svg" alt="facebook-icon" />Facebook </Link>
                                <Link className="text-blue btn viewDetailBtn" href="https://www.instagram.com/learntechedus" target='_blank'><img width={27} height={27} className='mx-2 p-1 rounded' src="/images/icons/InstagramForm.jpg" alt="instagram-icon" />Instagram </Link>
                                <Link className='text-blue btn viewDetailBtn' href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><img width={27} height={27} className='mx-2 p-1 rounded' src="/images/icons/linkedin.svg" alt="linkedIn-icon" />Linkedin </Link>
                                <Link className='text-blue btn viewDetailBtn' href="https://twitter.com/learntechww" target='_blank'><img width={27} height={27} className='mx-2 p-1 rounded' src="/images/icons/twitterForm.svg" alt="twitter-icon" />Twitter</Link>
                            </div>
                            <Link href='/' className='mt-4 btn errBtn mb-3'>BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ThankyouPage