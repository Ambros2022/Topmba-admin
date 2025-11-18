import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import dynamic from 'next/dynamic';
const BlogCard = dynamic(() => import('src/@core/components/blog-card'), { ssr: false });
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MainCarousel = ({ items }) => {




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
      autoPlay={true}
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
function FeaturedCollegeSection() {
  const [colleges, setColleges] = useState<any[]>([]);

  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;

      const response = await axios1.get('api/website/blog/get', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);



  useEffect(() => {

    getcolleges();

  }, [getcolleges]);



  return (
    <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Related Blogs</h2>
        <MainCarousel items={colleges.map(college => (
          <BlogCard key={college.id} college={college} />
        ))} />
        {/* <div className="d-flex justify-content-center pb-5">
          <Link href='/colleges' className='btn viewMoreClgBtn'>Load More</Link>
        </div> */}
      </div>
    </section>
  )
}

export default FeaturedCollegeSection
