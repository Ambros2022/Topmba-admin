import Link from 'next/link';
import React from 'react'
import MainCarousel2 from './CoursesCarousel';

function OtherCourses({ streamdata }) {

  // Function to create card components
  function createCards() {
    return streamdata.map(card => (
      <Link href={`/course/${card.id}/${card.slug}`}>
        <CardComponent
          key={card.id}
          title={card.name}
          imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.logo}`}
        />
      </Link>
    ));
  }

  // CardComponent function
  function CardComponent({ title, imageSrc }) {
    return (
      <div className='courseConCarousel'>
        <div className="card hover-card text-center d-flex mx-2">
          <div className="row flex-fill">
            <div className="col-12">
              <img width={70} height={70} src={imageSrc} className="p-2 img-fluid mx-auto mt-3" alt={`${title}-logo`} />
            </div>
            <div className="col-12 text-center text-start px-0">
              <div className="card-body d-flex text-center justify-content-center">
                <h6 className="card-title flex-fill text-truncate">{title}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='bg-white pb-5'>
      <section className='container bg-skyBlue rounded'>
        <h3 className='fw-bold text-blue pt-5 ps-0 ps-md-5 text-center text-md-start'>Other Courses</h3>
        <div className="carouselCardsCon px-5 pt-4 pb-5 position-relative" style={{zIndex:'2'}}>
          <MainCarousel2 items={createCards()} />
        </div>
      </section>
    </section>
  )
}

export default OtherCourses;
