import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MainCarousel = ({ items, autoPlayOnMobile = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize); // Check on resize
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
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

  const ButtonGroup = ({ next, previous }: any ) => {
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
      autoPlay={autoPlayOnMobile || !isMobile} // Conditional auto-play
      autoPlaySpeed={2000}
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

export default MainCarousel;
