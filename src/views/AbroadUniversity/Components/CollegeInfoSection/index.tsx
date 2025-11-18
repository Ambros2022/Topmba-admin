import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });
const ReviewSec = dynamic(() => import('../ReviewSec'), { ssr: false });

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
  tablet: { breakpoint: { max: 767, min: 425 }, items: 2 },
  mobile: { breakpoint: { max: 424, min: 0 }, items: 2 }
};

const ButtonGroup = ({ next, previous }) => (
  <div className="carousel-button-group d-flex justify-content-between gap-5 fs-2">
    <span className='fi-left' onClick={previous}>
      <FiChevronLeft />
    </span>
    <span className='fi-right' onClick={next}>
      <FiChevronRight />
    </span>
  </div>
);

function CollegeInfoSection({ data, Countrydata }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth >= 320 && window.innerWidth <= 767);
  const [activeTab, setActiveTab] = useState('Info');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth >= 320 && window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'Info', label: 'Info', content: data.info },
    { id: 'Fees', label: 'Courses & Fees', content: data.course_fees },
    { id: 'Admissions', label: 'Admissions', content: data.admissions },
    { id: 'Ranking', label: 'Ranking', content: data.rankings },
    { id: 'Scholarship', label: 'Scholarship', content: data.scholarship },
    { id: 'Hostel', label: 'Infrastructure', content: data.hostel },
    { id: 'Gallery', label: 'Gallery', content: data.clggallery && data.clggallery.length > 0 ? data.clggallery : '' },
    { id: 'Review', label: 'Review', content: <ReviewSec data={data} /> },
    { id: 'Faq', label: 'FAQ', content: <FaqSec data={data.collegefaqs} /> }
  ];

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

  const renderTabContent = () => tabs.map((tab) => (
    tab.content ? (
      <div
        key={tab.id}
        className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
        id={`nav-${tab.id.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`nav-${tab.id.toLowerCase()}-tab`}
      >
        {Array.isArray(tab.content) ? (
          <div className="row bg-skyBlue">
            {tab.content.map((item, index) => (
              <div key={index} className="col-md-4 galleryImgStyle">
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.image}`} className='' width={300} height={300} alt='College Card' />
              </div>
            ))}
          </div>
        ) : (
          typeof tab.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: tab.content }} />
          ) : (
            tab.content
          )
        )}
      </div>
    ) : null
  ));

  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink linkFontSize py-3">
          <p className='mb-3'>
            <Link href="/">Home <i className='bi bi-chevron-right'></i></Link>
            <Link href={`/${Countrydata?.slug}`}> {Countrydata?.name} <i className='bi bi-chevron-right'></i></Link>
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
              ssr
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

          <div className="tab-content py-md-5 py-3" id="nav-tabContent">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </>
  );
}

export default CollegeInfoSection;

