import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import axios1 from 'src/configs/axios';
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


interface NewsItem {
  id: number;
  slug: string;
  name: string;
}

const NewsLinkSection: React.FC = React.memo(() => {
  const [linkSectionItems, setLinkSectionItems] = useState<JSX.Element[]>([]);

  const fetchNews = useCallback(async () => {
    try {
      const response = await axios1.get('api/website/news/get?category_id=4', {
        params: {
          page: 1,
          size: 10000,
          orderby: 'Desc', 
          columnname: 'created_at'
        }
      });
      const newsData: NewsItem[] = response.data.data;

      const newsItems = newsData.map((item) => (
        <Link key={item.id} href={`/news/${item.id}/${item.slug}`} target="_blank" rel="noopener noreferrer">
          <div className="card mx-2 cardHeight">
            <h6 className="py-2 mx-auto newsLink2Clr bg-white text-blue rounded text-center" style={{ maxWidth: '200px', zIndex: '40' }}>
              {item.name}
            </h6>
          </div>
        </Link>
      ));
      setLinkSectionItems(newsItems);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <section className="newsLinkSec2 bg-blue py-3 position-relative " style={{ zIndex: '2' }}>
      <div className="container text-center py-3 newsLink2Container rounded">
        <MainCarousel items={linkSectionItems} />
      </div>
    </section>
  );
});

export default NewsLinkSection;
