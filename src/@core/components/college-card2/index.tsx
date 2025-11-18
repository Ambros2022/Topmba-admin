import React from 'react';
import Link from 'next/link';


function CollegeCard2({ college }) {
    return (
        <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card featuredClgCard mb-4">
            <div className='card-image'>
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={200} height={200} className="card-Image-top" alt="featured-college" />
            </div>
            <div className="card-body">
                <h5 className="card-title text-blue text-truncate">{college.name}</h5>
                <div className="d-flex justify-content-center">
                    <Link href={`/college/${college.id}/${college.slug}`} className="btn">View More</Link>
                </div>
            </div>
        </div>
    );
}

export default CollegeCard2;