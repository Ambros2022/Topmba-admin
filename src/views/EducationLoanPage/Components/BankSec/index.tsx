import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BankSec = () => {
    const countries = [
        { bank: '/images/icons/rbl.png' },
        { bank: '/images/icons/hdfc.png' },
        { bank: '/images/icons/uco.png' },
        { bank: '/images/icons/canara-bank.png' },
        { bank: '/images/icons/bandhanbank.png' },
        // Add more countries as needed
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1024, min: 992 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 991, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2" style={{ zIndex: '1 !important' }}>
                <span className='fi-left' onClick={previous}>
                    <FiChevronLeft />
                </span>
                <span className='fi-right' onClick={next}>
                    <FiChevronRight />
                </span>
            </div>
        );
    };

    return (
        <section className='bg-white pb-md-2 pb-3'>
            <div className="container bg-skyBlue rounded mb-3 py-3 px-4">
                <div className='bankCarousel position-relative mb-3'>
                    <Carousel
                        swipeable
                        draggable
                        showDots={false}
                        arrows={false}
                        infinite
                        autoPlaySpeed={2000}
                        autoPlay={true}
                        ssr  // SSR true for server-side rendering
                        responsive={responsive}
                        renderButtonGroupOutside
                        customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                        containerClass='carousel-container2Category'
                    >
                        {countries.map((country, index) => (
                            <div key={index} className="px-3">
                                <div className="card p-3 mx-md-0 mx-3 mt-3 mb-3">
                                    <div className="d-flex justify-content-center flex-fill">
                                        <div className="bankImg">
                                            <img src={country.bank} width={200} className='img-fluid' height={200} alt='bank-logo' loading='lazy' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default BankSec;
