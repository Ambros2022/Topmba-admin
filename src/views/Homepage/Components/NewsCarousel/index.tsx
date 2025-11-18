import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewsCarousel = ({ items }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1
        }
    };

    const ButtonGroup = ({ next, previous }: any) => {
        return (
            <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
                <span className='fi-left' onClick={previous} >
                    <FiChevronLeft style={{ cursor: 'pointer' }} />
                </span>
                <span className='fi-right' style={{ cursor: 'pointer' }} onClick={next}>
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
            autoPlay={false}
            autoPlaySpeed={1500}
            ssr  // SSR true for server-side rendering
            responsive={responsive}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup />}
        >
            {items.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </Carousel>
    );
};

export default NewsCarousel;
