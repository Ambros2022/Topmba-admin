import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Tooltip } from '@mui/material';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 7 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 5 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
      <span className='fi-left' onClick={previous}>
        <i className='bi bi-arrow-left-short text-blue'></i>
      </span>
      <span className='fi-right' onClick={next}>
        <i className='bi bi-arrow-right-short text-blue'></i>
      </span>
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
    <Carousel
      swipeable
      draggable
      showDots={false}
      arrows={false}
      infinite
      ssr
      responsive={responsive}
      renderButtonGroupOutside
      customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
      className="pt-2 text-center infoBtn infoBtn2 justify-content-between d-flex"
    >
      {items.map((item, index) => (
        <Tooltip title={item.label} arrow>
          <button
            key={index}
            className={`btn py-2 mx-2 nav-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index, item.id)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '13px',
              width: 'auto',
            }}
          >
            {item.label}
          </button>
        </Tooltip>


      ))}
    </Carousel>
  );
};

export default CustomCarousel;