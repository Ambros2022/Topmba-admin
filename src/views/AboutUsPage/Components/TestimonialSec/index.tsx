import React, { useEffect, useState, useCallback } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'src/configs/axios';

// Define the interface for a testimonial
interface Testimonial {
    collegeTestimonials?: any;
    full_url?: any;
    name: string;
    location: string;
    institution: string;
    image: string;
    designation: string;
    type: string; // Assuming type is also part of the data
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1023, min: 768 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1
    }
};

const ButtonGroup = ({
    next,
    previous,
    showButtons,
}: {
    next?: () => void;
    previous?: () => void;
    showButtons: boolean;
}) => (
    <div className={`carousel-button-group d-flex justify-content-between ${showButtons ? '' : 'd-none'}`}>
        <span className="carousel-btn fi-left" onClick={previous}>
            <FiChevronLeft size={30} />
        </span>
        <span className="carousel-btn fi-right" onClick={next}>
            <FiChevronRight size={30} />
        </span>
    </div>
);


const TestimonialSec = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const fetchTestimonials = useCallback(async () => {
        try {
            const response = await axios.get<{ status: number; data: Testimonial[] }>('api/website/allvideotestimonials/get', {
                params: { type: 'About_us_page' }
            });
            if (response.data?.status === 1) {
                // Filter only the testimonials with type "About_us_page"
                const filteredTestimonials = response.data.data.filter(
                    (item) => item.type === 'About_us_page'
                );
                setTestimonials(filteredTestimonials);
            }
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const updateIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        updateIsDesktop();
        window.addEventListener('resize', updateIsDesktop);
        return () => window.removeEventListener('resize', updateIsDesktop);
    }, []);

    const autoPlay = testimonials.length > 0 && (!isDesktop || testimonials.length > 2);
    const showButtons = isDesktop && testimonials.length > 2;

    return (
        <>
            {
                testimonials && testimonials.length > 0 ? (
                    <section className='py-5 bg-white'>
                        <div className="container">
                            <h2 className='text-blue fw-bold text-center mb-3'>Testimonials</h2>
                            <div className='testimonialCarousel position-relative'>
                                <Carousel
                                    swipeable
                                    draggable
                                    showDots={false}
                                    arrows={false}
                                    infinite
                                    autoPlay={autoPlay}
                                    autoPlaySpeed={2000}
                                    ssr
                                    responsive={responsive}
                                    renderButtonGroupOutside
                                    customButtonGroup={<ButtonGroup showButtons={showButtons} />}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <div className="card p-3 bg-skyBlue border-0 mb-3 mx-md-2 mx-3" key={index}>
                                            <div className="row d-flex">
                                                <div className="col-md-3 col-lg-2 col-xl-2 align-content-center">
                                                    <div className='testimonalImg'>
                                                        <img src={'/images/icons/userImage.webp'} className='mx-auto' width={50} height={50} alt='testimonial-img' loading="lazy" />
                                                    </div>
                                                </div>
                                                <div className="col-md-9 col-lg-10 col-xl-10 align-content-center">
                                                    <h5 className='text-blue text-center text-md-start'>{testimonial.name}
                                                        {/* ({testimonial.location}) */}
                                                    </h5>
                                                    <p className='text-black'>
                                                        {testimonial.full_url}

                                                    </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex">
                                                <i className='bi bi-quote fs-1 text-blue align-self-start me-2'></i>
                                                <p className='text-black mt-3 testimonialPara  '>
                                                    {testimonial.designation}
                                                </p>
                                                <i className='bi bi-quote align-self-end fs-1 text-blue ms-2'></i>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </section>
                ) : ''
            }

        </>
    );
};

export default TestimonialSec;
