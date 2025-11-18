import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

// The individual card component
function CoursesCard({ course }) {
  return (
    <div id={course.id} className="col">
      <div className="card h-100 d-flex flex-column p-2 hover-card bg-crsCard">
        <div className="row g-0 pt-2">
          <div className="col-3 p-0 mb-3 text-center text-md-start">
            <img
              width={50}
              height={50}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${course.logo}`}
              className="rounded"
              alt="Courses-Card-img"
            />
          </div>
          <div className="col-9">
            <div className="card-body p-0 ps-2 pt-2">
              <h5 className="fw-bold text-blue card-title text-start">{course.name}</h5>
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-column p-0">
          <div className="flex-grow-1 d-flex flex-wrap gap-2 justify-content-center align-items-start my-3">
            {course.general_courses.map(val => (
              <Link key={val.id} href={`/course/${course.id}/${course.slug}/${val.slug}`} className='btn streamBtn'>
                {val.short_name}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Link href={`/course/${course.id}/${course.slug}`} className='d-flex justify-content-center text-center btn viewAllBtn w-100'>
              <span className='align-self-center'>View All {course.name} Courses</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const PromoAddBanner = ({ url, title, description }) => {

  return (
    <>
      <section className='bg-skyBlue addBanner rounded'>
        <div className="container row p-5">
          <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
            <div className="row g-0">
              <div className="col-md-4 addImgClg position-relative">
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                <div className="position-absolute iconsPosition">
                  {/* <div className="d-flex flex-column">
                                      <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-info-circle"></i></h6>
                                      <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-x-circle"></i></h6>
                                  </div> */}
                </div>
                <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ zIndex: '200' }}>
                  <h5 className="card-text">{description}</h5>
                  <h3 className="card-title fw-bold">{title}</h3>
                  <Link href='/colleges' className='btn openAddBtn mt-3'>Open <i className="bi bi-chevron-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

// Parent component handling the array
function CoursesContainer() {
  const isMountedRef = useIsMountedRef();
  const [streamcourses, setStreamcourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [datasize, setDatasize] = useState(12);

  const showMoreCourses = () => {
    setDatasize(prevSize => prevSize + 8);
  };

  const [promoban, setPromoban] = useState<any[]>([]);

  // console.log(states, "states")

  const getPromobanner = useCallback(async () => {
    try {
      const response = await axios.get('api/website/banner/get?promo_banner=All_courses_page');
      if (isMountedRef.current) {

        setPromoban(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);

  const getStreamwiseCourse = useCallback(async () => {
    try {
      const response = await axios.get('api/website/stream/general/get', {
        params: {
          page: 1,
          size: datasize,
        },
      });
      if (isMountedRef.current) {
        setStreamcourses(response.data.data);
        setVisibleCount(response.data.totalItems);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [datasize, isMountedRef]);

  useEffect(() => {
    getStreamwiseCourse();
    getPromobanner();
  }, [getPromobanner, getStreamwiseCourse]);

  return (
    <section className="bg-white pt-2 pb-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
          {streamcourses.map((course, index) => (
            <CoursesCard key={index} course={course} />
          ))}
        </div>
        {visibleCount > streamcourses.length && (
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button className='btn viewMoreBtnCourse' onClick={showMoreCourses}>
                View More
              </button>
            </div>

          </div>
        )}
        {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} description={promoban[0].description} title={promoban[0].title} />}
      </div>
    </section>
  );
}

export default CoursesContainer;
