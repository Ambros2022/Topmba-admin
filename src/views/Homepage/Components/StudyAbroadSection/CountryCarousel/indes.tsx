import dynamic from 'next/dynamic';
import React from 'react';
// import Carousel from "react-multi-carousel";
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });
import "react-multi-carousel/lib/styles.css";

const CountryCarosuel = ({ items }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 1025, min: 1024 },
      items: 6
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

  const ButtonGroup = ({ next, previous }: any) => {
    return (
      <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
        <span className='fi-left' onClick={previous} style={{ cursor: "pointer" }}>
          <i className='bi bi-arrow-left-short text-blue'></i>
        </span>
        <span className='fi-right' onClick={next} style={{ cursor: "pointer" }}>
          <i className='bi bi-arrow-right-short text-blue'></i>
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
      {items.map((item, index) => (
        <div key={index} className='mx-auto d-flex justify-content-center mb-3'>{item}</div>
      ))}
    </Carousel>
  );
};

export default CountryCarosuel;
