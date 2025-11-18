import React from 'react';
import Link from 'next/link';

// NewsItem component
const NewsItem = ({ banner_image, title, link }) => (
    <div className="col-md-12 col-12 mx-md-0 mx-auto">
        <Link href={link} >
            <div className="card mb-3 bg-skyBlue hover-card">
                <div className="row g-0">
                    <div className="col-4  upcomingAdmission">
                        <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner_image}`} width={300} height={300} className="mx-md-2 rounded img-fluid" alt="news-img" />
                    </div>
                    <div className="col-8 ">
                        <div className="card-body">
                            <h6 className="card-title  fw-bold">{title}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

// NewsList component
const NewsList = ({ newsItems }) => (
    <>
        {newsItems?.length > 0 && (
            <>
                <h4 className="fw-bold text-blue mt-3 text-center pt-3 mb-4">
                    Upcoming Admissions
                </h4>
                <div className="bg-skyBlue pt-3 examNewsSec rounded mt-3 px-4">
                    <div className="row">
                        {newsItems.map((item, index) => (
                            <NewsItem
                                key={item.id || index} // Prefer a unique ID if available
                                banner_image={item.logo}
                                title={item.name}
                                link={item.link}
                            />
                        ))}
                    </div>
                </div>
            </>
        )}
    </>

);

export default NewsList;