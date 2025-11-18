import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry';

const ReviewSec = dynamic(() => import('../ReviewSec'));
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });

const isMobileView = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 320 && window.innerWidth <= 767;
  }
  return false;
};

function CollegeInfoSection({ data }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isMobile, setIsMobile] = useState(isMobileView());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 767, min: 425 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 424, min: 0 },
      items: 2
    }
  };

  const tabs = [
    { id: 'info', label: 'Info', content: data.info },
    { id: 'fees', label: 'Courses & Fee', content: data.course_fees },
    { id: 'admission', label: 'Admissions', content: data.admissions },
    { id: 'placement', label: 'Placement', content: data.placements },
    { id: 'ranking', label: 'Ranking', content: data.rankings },
    { id: 'scholarship', label: 'Scholarship', content: data.scholarship },
    { id: 'hostel', label: 'Infrastructure', content: data.hostel },
    {
      id: 'gallery',
      label: 'Gallery',
      content: data.clggallery && data.clggallery.length > 0 ? (
        <div className="row">
          {data.clggallery.map((galleryItem, index) => (
            <div key={index} className="col-6 col-md-4 p-4">
              <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${galleryItem.image}`}
                alt={`Gallery Image ${index + 1}`}
                width={500}
                height={300}
                className='img-fluid rounded'
              />
            </div>
          ))}
        </div>
      ) : ''
    },
    { id: 'review', label: 'Review', content: <ReviewSec data={data} /> },
    {
      id: 'faq',
      label: 'FAQ',
      content: data.collegefaqs && data.collegefaqs.length > 0 ? <FaqSec data={data.collegefaqs} /> : null
    },
  ];

  const ButtonGroup = ({ next, previous }) => (
    <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
      <span className='fi-left' onClick={previous}>
        <FiChevronLeft />
      </span>
      <span className='fi-right' onClick={next}>
        <FiChevronRight />
      </span>
    </div>
  );

  const renderTabs = () => tabs.map((tab, index) => {
    if (tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>' && tab.content !== '<p><br></p>') {
      return (
        <button
          key={index}
          className={`btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      );
    }
    return null;
  });

  const renderTabContent = () => tabs.map((tab, index) => {
    if (tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>' && tab.content !== '<p><br></p>') {
      return (
        <div
          key={index}
          className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
        >
          {tab.id === 'info' ? (
            <div className="row">
              <div className="col-md-7 col-lg-8 col-xl-8">
                <div dangerouslySetInnerHTML={{ __html: tab.content }} />
              </div>
              <div className="col-md-5 col-lg-4 col-xl-4">
                <div className='position-relative innerClgImg2 mb-md-5 mb-3'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`}
                    alt="College Info"
                    width={700}
                    height={700}
                    className='rounded img-fluid'
                  />
                  <div
                    className='position-absolute'
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <GlobalPopupEnquiry className='viewMoreCollegeBtn btn' />
                  </div>
                </div>

               {data?.video_url && <div className='clgVideo rounded'>
                  <iframe width="100%" height="100%" className="rounded" src={data.video_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>}

              </div>

            </div>
          ) : (
            <div className="col-12">
              {typeof tab.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: tab.content }} />
              ) : (
                tab.content
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  });

  return (
    <section className='clgInfoSec bg-white'>
      <section className="container InnerCollegeNavigationLink linkFontSize py-3">
        <p className='mb-0'>
          <Link href="/">Home <i className='bi bi-chevron-right'></i></Link>
          <Link href={"/colleges"}> Colleges <i className='bi bi-chevron-right'></i></Link>
          <span className='text-blue' style={{ cursor: 'pointer' }}> {data.name}</span>
        </p>
      </section>
      <div className="container position-relative innerClgCarousel">
        {isMobile ? (
          <Carousel
            swipeable
            draggable
            showDots={false}
            arrows={false}
            infinite
            autoPlay={false}
            autoPlaySpeed={2000}
            ssr // SSR true for server-side rendering
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
            responsive={responsive}
            className="infoBtn gap-3  text-center"
            // className="infoBtn gap-3 mx-auto text-center"
          >
            {renderTabs()}
          </Carousel>
        ) : (
          <div className="pt-3 text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3" id="nav-tab" role="tablist">
            {renderTabs()}
          </div>
        )}

        <div className="tab-content pt-5" id="nav-tabContent">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
}

export default CollegeInfoSection;
