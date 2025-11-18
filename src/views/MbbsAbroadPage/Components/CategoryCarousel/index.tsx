import React, { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategoryCarousel = ({ items, handleTabClick, activeTab }) => {
    const isMobileView = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 320 && window.innerWidth <= 767;
        }
        return false;
    };
   const [isMobile] = useState(isMobileView());
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1023 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 1024, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 2
        }
    };

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2" style={{ zIndex: '1 !important' }} >
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
           <Carousel
            swipeable
            draggable
            showDots={false}
            arrows={false}
            infinite
            ssr  // SSR true for server-side rendering
            autoPlay={isMobile ? true : false}
            autoPlaySpeed={2000}
            responsive={responsive}
            renderButtonGroupOutside
            customButtonGroup={isMobile ? <ButtonGroup next={undefined} previous={undefined} /> : null}
            containerClass='carousel-containerCategory mx-auto'
        >
            {items.map((country) => (
                <div className="examSecItems d-flex justify-content-center text-center mx-2 mb-3">
                    <button
                        className={`nav-link ${country.name === activeTab ? 'active' : ''}`}
                        id={`pills-${country.name}-tab`}
                        data-bs-toggle='pill'
                        data-bs-target={`#pills-${country.name}`}
                        type='button'
                        role='tab'
                        aria-controls={`pills-${country.name}`}
                        aria-selected={country.name === activeTab ? 'true' : 'false'}
                        onClick={() => handleTabClick(country.name)}
                    >
                        <img src={country.flag} width={30} height={30} alt={`${country.name}-flag`} className='me-2 rounded' />
                        {country.name}
                    </button>

                </div>
            ))}
        </Carousel>
    );
};

export default CategoryCarousel;
