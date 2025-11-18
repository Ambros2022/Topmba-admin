import dynamic from 'next/dynamic';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';

const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

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

function OverviewSection({ data, colleges, exams }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth >= 320 && window.innerWidth <= 767);
  const [activeTab, setActiveTab] = useState('Overview');

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
    { id: 'Overview', label: 'Overview', content: data.description },
    { id: 'Top', label: 'Top Colleges', content: data.top_college },
    { id: 'Admissions', label: 'Admissions', content: data.admissions },
    { id: 'Syllabus', label: 'Syllabus', content: data.syllabus },
    { id: 'Career', label: 'Career Opportunities', content: data.career_opportunities },
    { id: 'FAQ', label: 'FAQ', content: <FaqSec data={data.generalcoursefaqs} /> }
  ];

  const renderTabs = () => tabs.map((tab) => (
    tab.content ? (
      <button
        key={tab.id}
        className={`btn mb-3 ${activeTab === tab.id ? 'active' : ''}`}
        onClick={() => handleTabClick(tab.id)}
      >
        {typeof tab.content === 'string' ? tab.label : 'FAQ'}
      </button>
    ) : null
  ));

  const renderTabContent = () => tabs.map((tab) => (
    tab.content ? (
      <div
        key={tab.id}
        className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''} `}
        id={`nav-${tab.id}`}
        role="tabpanel"
        aria-labelledby={`nav-${tab.id}-tab`}
      >
        {Array.isArray(tab.content) ? (
          tab.content.map((item, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card bg-skyBlue hover-card p-3">
                <h5 className='fw-bold text-blue text-center mb-3'>{item.name}</h5>
                <h5 className='fw-bold text-blue text-center mb-3'>{item.short_name}</h5>
                <h5 className='text-blue text-center mb-3'>
                  <span className='fw-bold'>Duration:</span> <span className='text-black'>{item.duration}</span>
                </h5>
                <div className='justify-content-center d-flex gap-3 flex-wrap'>
                  <GlobalEnquiryForm buttonText={'Apply Now'} className={'btn viewMoreCollegeBtn'} />
                  <Link className='btn viewDetailBtn' href={`/course/${item.id}/${data.slug}/${item.slug}`}>View Detail</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          typeof tab.content === 'string' ? (
            <div className="minehightcoursesneew" dangerouslySetInnerHTML={{ __html: tab.content }} />
          ) : (
            tab.content
          )
        )}
      </div>
    ) : null
  ));

  return (
    <section className='clgInfoSec innerClgCarousel bg-white subinner '>
      <div className="container position-relative">
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
            // className="infoBtn gap-3 mx-auto text-center"
            className="infoBtn gap-3  text-center"

          >
            {renderTabs()}
          </Carousel>
        ) : (
          <div className="text-center justify-content-start d-flex flex-fill flex-wrap infoBtn gap-3" id="nav-tab" role="tablist">
            {renderTabs()}
          </div>
        )}

        <div className="row">
          <div className="col-md-8 col-lg-9 pe-md-5 minehightinnercourse">
            <div className="tab-content pt-2" id="nav-tabContent">
              {renderTabContent()}
            </div>
          </div>
          <div className="col-md-4 col-lg-3 mb-md-5 mx-auto px-0">
            <div className="row imgCardConCrs mb-3">
              <div className="col-12 mb-5 px-0">
                <div className='dental-crs-img flex-column d-flex justify-content-center'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.streams.banner}`}
                    className='img-fluid'
                    width={600}
                    height={600}
                    alt={`${data.name}-course-img`}
                  />
                  <h6 className='text-center mb-3'>Are you interested in this course?</h6>
                  <GlobalEnquiryForm className="mb-3 btn chkEligBtn" buttonText="Check Eligibility" />
                </div>
              </div>
              {colleges && colleges.length > 0 && (
                <>
                  <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data?.streams?.name} Colleges</h4>
                  <div
                    className="col-12 cardConBrdr p-3 mb-5 text-center overflow-y-auto bg-skyBlue"
                    style={{ maxHeight: 'calc(6 * 150px)' }}
                  >
                    {colleges.map((val) => (
                      <Link key={val.id} href={`/college/${val.id}/${val.slug}`}>
                        <div className="card p-3 mb-3 d-flex flex-row bg-skyBlue hover-card">
                          <div className="row d-flex">
                            <div className="align-content-center col-md-5 col-xl-5 mb-md-0 mb-3 col-lg-5 topCollegeImg">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${val.banner_image}`}
                                className='img-fluid rounded'
                                width={500}
                                height={500}
                                alt={val.name}
                              />
                            </div>
                            <div className="align-content-center justify-content-md-start justify-content-center col-md-7 col-xl-7 col-lg-7">
                              <h6 className='align-content-center text-md-start text-center text-black fw-bold'>{val.name}</h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {exams && exams.length > 0 && (
                <>
                  <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data?.streams?.name} Exams</h4>
                  <div
                    className="col-12 cardConBrdr p-3 mb-5 overflow-y-auto text-center bg-skyBlue"
                    style={{ maxHeight: 'calc(6 * 150px)' }}
                  >
                    {exams.map((exam, index) => (
                      <Link href={`/exam/${exam.id}/${exam.slug}`} key={index}>
                        <div className="card bg-skyBlue hover-card p-2 d-flex mb-3">
                          <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-5 mx-auto text-md-start text-center">
                              <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${exam.logo}`} width={200} height={200} className='align-self-center innerBoardImg' alt='clg-img' />
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-7 d-flex pt-md-0 pt-3 justify-content-md-start justify-content-center">
                              <h5 className='m-0 align-self-center text-md-start text-center fw-bold text-black ms-2 mb-0'>{exam.exam_title}</h5>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OverviewSection;
