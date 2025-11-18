import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategoryCarousel = ({ items, handleTabClick, activeTab }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1023 },
            items: 6
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
            responsive={responsive}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
            containerClass='carousel-containerCategory mx-auto'
        >
            {items.map((item) => (
                <div className="examSecItems d-flex justify-content-center text-center mx-2 mb-3">
                    <button
                        className={`text-truncate categoryTextHide btn nav-link ${activeTab === item.id ? 'active' : ''}`}
                        id={`pills-${item}-tab`}
                        type="button"
                        onClick={() => handleTabClick(item.id)}
                        key={item.id}
                        style={{ zIndex: '20', fontSize: '14px' }}
                    >
                        {item.title}
                    </button>
                </div>
            ))}
        </Carousel>
    );
};

export default CategoryCarousel;
