
import React, { useCallback, useEffect, useState } from 'react'
import BannerSec from './Components/BannerSec'
import OverviewSec from './Components/OverviewSec'
import ExpertSec from './Components/ExpertSec'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import Head from 'next/head';
import { useRouter } from 'next/router';


function InnerBlogPage({ id }) {
    const router = useRouter();
    const isMountedRef = useIsMountedRef();
    const [pagedata, setPagedata] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [createdAt, setCreatedAt] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [blogsData, setBlogsData] = useState([]);


    const getPagedata = useCallback(async () => {
        try {
            const response = await axios.get('/api/website/blogfindone/get/' + id);
            if (isMountedRef.current) {
                setPagedata(response.data.data);
                setCreatedAt(new Date(response.data.data.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short',
                }));
                setLoading(false);
            }
        } catch (error) {
            router.push("/404");
            console.error('Failed to fetch page data:', error);
        }
    }, [id, isMountedRef, router]);

    const getNews = useCallback(async () => {
        setNewsData([])
        try {
            const roleparams = { page: 1, size: 10000 }
            const response = await axios.get('/api/website/news/get?orderby=desc', { params: roleparams })

            const formattedNews = response.data.data.map((item) => ({
                imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                name: item.name || 'No description available',
                id: item.id,
                slug: item?.slug,
            }))
            setNewsData(formattedNews)

        } catch (err) {
            console.error('Failed to fetch news:', err)
        }
    }, [id, isMountedRef])

    const getBlogs = useCallback(async () => {
        setBlogsData([])
        try {
            const roleparams = { page: 1, size: 10000 }
            const response = await axios.get('/api/website/blog/get?orderby=desc', { params: roleparams })

            const formattedNews = response.data.data.map((item) => ({
                imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                name: item.name || 'No description available',
                id: item.id,
                slug: item?.slug,
            }))
            setBlogsData(formattedNews)

        } catch (err) {
            console.error('Failed to fetch news:', err)
        }
    }, [id, isMountedRef])

    const formattedData = pagedata && pagedata?.blogfaqs && pagedata?.blogfaqs.map((item) => ({
        "@type": "Question",
        "name": item.questions,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answers,
        },
    }));

    useEffect(() => {
        getPagedata();
        getNews();
        getBlogs();
    }, [getPagedata, getNews, getBlogs]);
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
                                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/blogs`
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": pagedata?.name,
                                    "item": `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${pagedata?.id}/${pagedata?.slug}`
                                },

                            ]
                        }
                    ])}
                </script>
            </Head>
            <BannerSec data={pagedata} createdAt={createdAt} />
            {/* {!loading && pagedata && <BannerSec data={pagedata} createdAt={createdAt} />} */}

            <OverviewSec data={pagedata} newsData={newsData}
                blogsData={blogsData} />

            {!loading && pagedata && <ExpertSec data={pagedata} />}

        </>
    )
}

export default InnerBlogPage
