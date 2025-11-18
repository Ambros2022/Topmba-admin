import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import axios1 from 'src/configs/axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import NewsCarousel for better bundle size
const NewsCarousel = dynamic(() => import('../NewsCarousel'), {
    ssr: false,
    loading: () => <p>Loading carousel...</p>,
});

function LatestNewsSection() {
    const [activeTab, setActiveTab] = useState<'news' | 'blog'>('news');
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [blogItems, setBlogItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);

    // Fetch banners
    const getBanner = useCallback(async () => {
        try {
            const response = await axios1.get('api/website/banner/get?promo_banner=Home_news_page', {
                params: { page: 1, size: 10000 },
            });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getBanner();
    }, [getBanner]);

    // Fetch news or blog data
    const fetchData = useCallback(async (tab: 'news' | 'blog') => {
        setLoading(true);
        try {
            const response = await axios1.get('api/website/newsandblogs/get', {
                params: {
                    page: 1,
                    size: 8,
                    type: tab,
                    orderby: 'desc',
                    columnname: 'created_at',
                },
            });

            if (response.data?.status === 1) {
                const key = tab === 'blog' ? 'blogs' : 'news';
                const data = response.data[key]?.data || [];
                tab === 'news' ? setNewsItems(data) : setBlogItems(data);
            } else {
                tab === 'news' ? setNewsItems([]) : setBlogItems([]);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            tab === 'news' ? setNewsItems([]) : setBlogItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab, fetchData]);

    const handleTabClick = (tab: 'news' | 'blog', event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setActiveTab(tab);
    };

    const combinedItems = activeTab === 'news' ? newsItems : blogItems;

    // Memoize formatted data
    const formattedItems = useMemo(() => {
        return combinedItems.map(item => ({
            ...item,
            formattedDate: item.created_at
                ? format(new Date(item.created_at), 'dd-MMM-yyyy')
                : 'No Date Available',
        }));
    }, [combinedItems]);

    // Banner background style
    const backgroundStyle = useMemo(() => {
        const banner = banners[0];
        return banner
            ? {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
              }
            : {};
    }, [banners]);

    // Carousel JSX
    const carouselItems = useMemo(() => {
        return formattedItems.map((item) => (
            <div className="col-12 mb-1" style={{ margin: '0px 5px' }} key={item.id}>
                <Link href={`/${activeTab}/${item.id}/${item.slug}`}>
                    <div className="newsBlosCards">
                        <div className="mb-5 mx-lg-3 mx-0">
                            <div className="card h-100 hover-card responsive-card">
                                <div className="card-body newsheight">
                                    <h5 className="card-title fw-bold text-blue text-truncate">{item.name}</h5>
                                    <h6 className="card-subtitle py-2 mb-2 text-body-secondary">{item.formattedDate}</h6>
                                    <div className="row mb-3">
                                        <div className="col-xl-8">
                                            <p className="card-text">{item.meta_description}</p>
                                        </div>
                                    </div>
                                    <Link href={`/${activeTab}/${item.id}/${item.slug}`} className="btn viewDetailBtn">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        ));
    }, [formattedItems, activeTab]);

    return (
        <section className="latestNewsCon" style={backgroundStyle}>
            <div className="container pt-5">
                <h2 className="fw-bold text-white text-center">Latest News & Blog</h2>
                <div className="nav-pills justify-content-center pt-3 gap-2 d-flex" role="tablist">
                    <button
                        className={`btn px-4 newsBtn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick('news', e)}
                    >
                        News
                    </button>
                    <button
                        className={`btn px-4 blgBtn ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={(e) => handleTabClick('blog', e)}
                    >
                        Blogs
                    </button>
                </div>
                <div className="card-con pt-5">
                    {loading ? <p className="text-center text-white">Loading...</p> : <NewsCarousel items={carouselItems} />}
                </div>
            </div>
        </section>
    );
}

export default LatestNewsSection;
