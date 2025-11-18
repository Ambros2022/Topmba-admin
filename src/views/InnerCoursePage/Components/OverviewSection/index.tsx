import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'react-multi-carousel/lib/styles.css';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });

const isMobileView = () => typeof window !== 'undefined' && window.innerWidth >= 320 && window.innerWidth <= 767;

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
  tablet: { breakpoint: { max: 767, min: 425 }, items: 2 },
  mobile: { breakpoint: { max: 424, min: 0 }, items: 2 }
};

const ButtonGroup = ({ next, previous }) => (
  <div className="carousel-button-group d-flex justify-content-between gap-5 fs-2">
    <span className="fi-left" onClick={previous}>
      <FiChevronLeft />
    </span>
    <span className="fi-right" onClick={next}>
      <FiChevronRight />
    </span>
  </div>
);

function OverviewSection({ data, collegedata, examdata }) {
  const [isMobile, setIsMobile] = useState(isMobileView());
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'Overview', label: 'Overview', content: data.description },
    { id: 'UG', label: 'UG', content: data.general_courses.filter(course => course.course_type === 'UG') },
    { id: 'PG', label: 'PG', content: data.general_courses.filter(course => course.course_type === 'PG') },
    { id: 'Doctorate', label: 'Doctorate', content: data.general_courses.filter(course => course.course_type === 'Doctorate') },
    { id: 'Diploma', label: 'Diploma', content: data.general_courses.filter(course => course.course_type === 'Diploma') },
    { id: 'Top', label: 'Top Colleges', content: data.top_college },
    { id: 'FAQ', label: 'FAQ', content: <FaqSec data={data.streamfaqs} /> }
  ].filter(tab => tab.content && (Array.isArray(tab.content) ? tab.content.length > 0 : true));


  const renderTabs = () => tabs.map((tab) => (
    <button
      key={tab.id}
      className={`btn ${activeTab === tab.id ? 'active' : ''}`}
      onClick={() => handleTabClick(tab.id)}
    >
      {tab.label}
    </button>
  ));


  const renderTabContent = () => tabs.map((tab) => (
    <div
      key={tab.id}
      className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
    >
      {tab.id === 'FAQ' ? (
        <FaqSec data={data.streamfaqs} />
      ) : Array.isArray(tab.content) ? (
        tab.content.map((item, index) => (
          <div key={index} className="col-12 mb-3">
            <div className="card bg-skyBlue hover-card p-3">
              <h5 className='fw-bold text-blue text-center mb-3'> {`${item.name}`}</h5>
              <h5 className='text-blue text-center mb-3'>
                <span className='fw-bold'>Duration:</span> <span className='text-black'>{item.duration}</span>
              </h5>
              <div className='justify-content-center d-flex gap-3 flex-wrap'>
                <GlobalEnquiryForm buttonText={'Apply Now'} className={'btn viewMoreCollegeBtn'} />
                <Link className='btn viewDetailBtn' href={`/course/${data.id}/${data.slug}/${item.slug}`}>View Detail</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div dangerouslySetInnerHTML={{ __html: tab.content }} />
      )}
    </div>
  ));

  return (
    <section className='clgInfoSec innerClgCarousel bg-white'>
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
          <div className="col-md-8 col-lg-9 pe-md-5">
            <div className="tab-content pt-3" id="nav-tabContent">
              {renderTabContent()}
            </div>
          </div>
          <div className="col-md-4 col-lg-3 mb-md-5 mx-auto px-0">
            <div className="row imgCardConCrs mb-3">
              <div className="col-12 mb-5 px-0">
                <div className='dental-crs-img flex-column d-flex justify-content-center'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner}`}
                    className="img-fluid"
                    width={600}
                    height={600}
                    alt={`${data.name}-course-img`}
                  />
                  <h6 className='text-center mb-3'>Are you interested in this course?</h6>
                  <GlobalEnquiryForm className="mb-3  chkEligBtn" buttonText="Check Eligibility" />
                </div>
              </div>
              {collegedata && collegedata.length > 0 && (
                <>
                  <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data.name} Colleges</h4>
                  <div
                    className="col-12 cardConBrdr p-3 mb-5 text-center overflow-y-auto bg-skyBlue"
                    style={{ maxHeight: 'calc(6 * 150px)' }}
                  >
                    {collegedata.map((val) => (
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
                            <div className="align-content-center col-md-7 col-xl-7 col-lg-7">
                              <h6 className='align-content-center text-start text-black fw-bold'>{val.name}</h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {examdata && examdata.length > 0 && (
                <>
                  <h4 className='fw-bold text-blue text-center pt-3 mb-3'>Top {data.name} Exams</h4>
                  <div
                    className="col-12 cardConBrdr p-3 mb-3 overflow-y-auto text-center bg-skyBlue"
                    style={{ maxHeight: 'calc(6 * 150px)' }}
                  >
                    {examdata.map((exam, index) => (
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