import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';




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
      items: 1
    }
  };

  const tabs = [
    { id: 'info', label: 'Course Details', content: data.course_details },
    { id: 'fees', label: 'Eligibility Criteria', content: data.eligibility },
    { id: 'admission', label: 'Fee Structure', content: data.fee_structure },
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

          <div className="col-12">
            {typeof tab.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: tab.content }} />
            ) : (
              tab.content
            )}
          </div>

        </div>
      );
    }
    return null;
  });

  return (
    <section className='clgInfoSec bg-white minehightnriquto'>

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
