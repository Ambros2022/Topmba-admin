import React from 'react';
import Link from 'next/link';

// NewsItem component
const NewsItem = ({ imageSrc, id, name,slug }) => (
    <div className="col-12">
        <Link href={`/news/${id}/${slug}`}>
            <div className="card bg-skyBlue hover-card mb-3">
                <div className="row g-0">
                    <div className="col-lg-4 col-md-4">
                        <img src={imageSrc} width={600} height={600} style={{ width: '100%', height: '-webkit-fill-available', objectFit:'contain'}} className="img-fluid rounded mx-md-1" alt="news-img" />
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <div className="card-body d-flex">
                            <h6 className="align-content-center card-text news-text">{name}</h6>
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
        <h4 className='fw-bold text-center py-3 text-blue'>Other Trending News</h4>
        <div className='mb-5 pt-3 bg-skyBlue innerNewsCard px-4 overflow-y-auto rounded'  style={{ maxHeight: 'calc(6 * 115px)' }}>
            <div className="row">
                {newsItems.map((item, index) => (
                    <NewsItem key={index} imageSrc={item.imageSrc} name={item.name} id={item.id} slug={item.slug} />
                ))}
            </div>
        </div>
    </>
);

export default NewsList;