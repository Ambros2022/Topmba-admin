import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';
import ReviewSec from '../ReviewSec';
import ContactForm from 'src/@core/components/popup/ContactForm';

const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });

const isMobileView = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 320 && window.innerWidth <= 767;
  }
  return false;
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
    items: 2
  },
  mobile: {
    breakpoint: { max: 424, min: 0 },
    items: 2
  }
};

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

const CollegeInfoSection = ({ data, exams }) => {
  const [isMobile, setIsMobile] = useState(isMobileView());
  const [activeTab, setActiveTab] = useState('info');

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

  const renderTabs = () => {
    const tabs = [
      { id: 'info', label: 'Info', content: data.info },
      { id: 'time_table', label: 'Time Table', content: data.time_table },
      { id: 'reg_form', label: 'Registration Form', content: data.reg_form },
      { id: 'syllabus', label: 'Syllabus', content: data.syllabus },
      { id: 'results', label: 'Results', content: data.results },
      { id: 'sample_paper', label: 'Sample Papers', content: data.sample_paper && data.sample_paper > 0 ? data.sample_paper : '' },
      { id: 'hostel', label: 'Infrastructure', content: data.hostel },
      { id: 'gallery', label: 'Gallery', content: data.clggallery },
      { id: 'review', label: 'Reviews', content: <ReviewSec data={data} /> },
      { id: 'schoolboardfaqs', label: 'FAQ', content: <FaqSec data={data.schoolboardfaqs} /> }
    ];

    return tabs
      .filter(tab => tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>' && tab.content !== '<p><br></p>')
      .map((tab) => (
        <button
          key={tab.id}
          className={`btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ));
  };

  const renderTabContent = () => {
    const tabs = [
      { id: 'info', content: data.info },
      { id: 'time_table', content: data.time_table },
      { id: 'reg_form', content: data.reg_form },
      { id: 'syllabus', content: data.syllabus },
      { id: 'results', content: data.results },
      { id: 'sample_paper', content: data.sample_paper },
      { id: 'hostel', content: data.hostel },
      { id: 'gallery', content: data.clggallery },
      { id: 'review', content: <ReviewSec data={data} /> },
      { id: 'schoolboardfaqs', content: data.schoolboardfaqs && data.schoolboardfaqs !== '' ? (<FaqSec data={data.schoolboardfaqs} />) : '' }
    ];

    return tabs
      .filter(tab => tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>' && tab.content !== '<p><br></p>')
      .map((tab) => (
        <div
          key={tab.id}
          className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
        >
          {typeof tab.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: tab.content }} />
          ) : (
            tab.content
          )}
        </div>
      ));
  };

  return (
    <>
      <section className='clgInfoSec bg-white'>
        <section className="container InnerCollegeNavigationLink linkFontSize py-3">
          <p className='mb-3'>
            <Link href="/">Home <i className='bi bi-chevron-right'></i></Link>
            <Link href={"/boards"}> Boards <i className='bi bi-chevron-right'></i></Link>
            <span className='text-blue' style={{ cursor: 'pointer' }}> {data.short_name}</span>
          </p>
        </section>
        <div className="container bg-white position-relative innerClgCarousel">
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
        </div>
      </section>

      <section className="bg-white">
        <div className="container">
          <div className="row">
            {activeTab === 'info' ? (
              <>
                <div className="col-xl-8 col-lg-8 col-md-7 col-12 mx-auto">
                  <div className="tab-content pt-3" id="nav-tabContent">
                    {renderTabContent()}
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-5 col-12 mx-auto py-5">
                  <ContactForm heading={'Contact Us'} />
                  <h2 className='fw-bold text-blue pt-3 mb-3 text-center mt-5'>Upcoming Exams</h2>
                  <div className="col-12 cardConBrdr p-3 overflow-y-auto bg-skyBlue my-3" style={{ maxHeight: 'calc(7 * 90px)' }}>
                    {exams.map((exam, index) => (
                      <Link href={`/exam/${exam.id}/${exam.slug}`} key={index}>
                        <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                          <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-5 mx-auto text-md-start text-center">
                              <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${exam.logo}`} width={100} height={100} className='align-self-center innerBoardImg' alt='clg-img' />
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 d-flex pt-md-0 pt-3 justify-content-md-start justify-content-center">
                              <h6 className='m-0 align-self-center text-md-start text-center fw-bold text-black ms-2 mb-0'>{exam.exam_title} Exam</h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="tab-content pt-5" id="nav-tabContent">
                  {renderTabContent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CollegeInfoSection;
