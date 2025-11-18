import React from 'react';
import Link from 'next/link';

// NewsItem component
const NewsItem = ({ date, title, slug, id }) => (
    <div className="col-12">
        <Link href={`/exam/${id}/${slug}`}>
            <div className="card mb-3 bg-skyBlue hover-card cardInnerExam">
                <div className="row p-3 d-flex flex-row">
                    <div className="col-xl-7 col-lg-7 col-md-12 col-6 align-content-center mb-lg-0 mb-md-3 mb-0">
                        <p className='fw-bold text-blue mb-0 text-center examNewsText border-circle align-content-center text-md-truncate'>{date}</p>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-12 col-6 align-content-center">
                        <h6 className="card-title text-center fw-bold mb-0 align-content-center">{title}</h6>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (

    <>
        <h4 className='fw-bold text-blue text-start pt-0 pt-md-3 text-center mb-3'>Upcoming Exams</h4>
        <div className='bg-skyBlue blogSec examLatest mt-3 px-4 py-3 position-relative rounded' style={{ zIndex: '2' }}>
            <div className="row overflow-y-auto" style={{ maxHeight: 'calc(4 * 102px)' }}>
                {newsItems.map((item, index) => (
                    <NewsItem key={index} date={item.date} title={item.title} id={item.id} slug={item.slug} />
                ))}
            </div>
            {/* <NewsCarosuel items={newsItems} /> */}
        </div>
    </>
);

export default NewsList;