import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const NewsCarosuel = ({ items }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 1
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
            autoPlay
            autoPlaySpeed={2000}
            ssr  // SSR true for server-side rendering
            responsive={responsive}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup />}
        >
            {items.map((item) => (
                <Link href={`/exam/${item.id}/${item.slug}`}>
                    <div className="card mb-3 bg-skyBlue hover-card cardInnerExam" style={{zIndex:'10'}}>
                        <div className="card-body text-center d-flex flex-column gap-3 flex-wrap justify-content-center">
                            <h5 className='fw-bold text-blue mb-0 text-center border-circle align-content-center'>{item.date}</h5>
                            <h5 className="card-title text-center fw-bold mb-0 align-content-center">{item.title} Exam</h5>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>
    );
};

export default NewsCarosuel;
