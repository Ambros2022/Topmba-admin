import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items:  1},
};

const ButtonGroup = ({ next, previous }) => {
    return (
        <div className="carousel-button-group d-flex justify-content-between position-absolute w-100" style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <button className="btn btn-link text-decoration-none" onClick={previous}>
                <FiChevronLeft size={24} />
            </button>
            <button className="btn btn-link text-decoration-none" onClick={next}>
                <FiChevronRight size={24} />
            </button>
        </div>
    );
};

const CustomCarousel = ({ items, setActiveTab }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (index, id) => {
        setActiveIndex(index);
        setActiveTab(id);
    };

    return (
        <div className="position-relative">
            <Carousel
                swipeable
                draggable
                showDots={false}
                arrows={false}
                infinite
                responsive={responsive}
                renderButtonGroupOutside
                customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                className="pt-2 text-center infoBtn"
                itemClass="carousel-item-padding-40-px"
            >
                {items.map((item, index) => (
                    <div key={index} className="d-flex justify-content-center align-items-center h-100">
                        <button
                            className={`btn btn-sm btn-outline-primary mx-1 ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => handleTabClick(index, item.id)}
                        >
                            {item.label}
                        </button>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CustomCarousel;