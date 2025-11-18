import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import ContactForm from 'src/@core/components/popup/ContactForm';
import axios1 from 'src/configs/axios';

const OverviewSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [banners, setBanners] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to handle the read more functionality
    const maxLength = 35600; // Adjust this value to control when "Read More" appears

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    // Fetch banners from the API
    const getbanner = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Nri_page', { params: roleparams });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        } 
    }, []);

    // Fetch courses from the API
    const getStreams = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 100 };
            const response = await axios1.get('api/website/stream/get?orderBy=asc&columnname=listing_order', { params: roleparams });
            setCourses(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getbanner();
        getStreams();
    }, [getbanner, getStreams]);

    // Render the truncated or full description based on the isExpanded state
    const renderDescription = () => {
        if (!data.top_description) return null;

        if (data.top_description.length <= maxLength || isExpanded) {
            return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
        }

        const truncatedText = data.top_description.slice(0, maxLength) + '...';
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
                <div className='text-center'>
                    <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read More</button>
                </div>
            </>
        );
    };

    return (
        <>
            <section className='bg-white pt-2 pb-5' style={{ fontFamily: 'Poppins !important' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-7 col-10 mx-auto minehightnriquto">
                            {renderDescription()}
                            {isExpanded && (
                                <div className='text-center'>
                                    <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read Less</button>
                                </div>
                            )}
                        </div>
                        <div className="col-xl-4 col-lg-4 pt-4  pt-md-0 col-md-5 nri-h2">
                            <ContactForm heading={'Expert Guidance for Securing NRI Quota Seats'} />
                            <h2 className='pt-5 fw-bold text-blue text-center mb-3 '>Top Trending Courses</h2>
                            <div className='p-3 border mt-3 rounded bg-skyBlue minehightnriquto'>
                                <div className='overflow-y-auto' style={{ maxHeight: 'calc(7 * 100px)' }}>
                                    {courses.map(course => (
                                        <Link href={`/course/${course.id}/${course.slug}`} key={course.id}>
                                            <div className="card p-3 mb-3 hover-card2">
                                                <div className="row">
                                                    <div className="col-md-3 col-xl-2 mb-md-0 mb-3 text-md-start text-center">
                                                        <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`} alt={`${course.name}-logo`} width={50} height={50} />
                                                    </div>
                                                    <div className="col-md-9 col-xl-10 d-flex justify-content-md-start justify-content-center">
                                                        <h5 className='ms-4 text-blue align-self-center fw-bold text-md-start text-center'>{course.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className='row g-2 p-3 bg-skyBlue mt-5 rounded'>
                                <div className="col-md-12">
                                    {banners.map((banner, index) => (
                                        <Link href={banner?.link} key={index}>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                                                // priority={true}
                                                height={500} width={500}
                                                className='img-fluid'
                                                alt={`Banner ${index}`}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OverviewSec;
