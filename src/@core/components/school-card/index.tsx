import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

function SchoolCard({ college }) {
    return (
        <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card hover-card featuredClgCard mb-4">
            <div className='card-image'>
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={500} height={500} className="card-Image-top" alt="featured-college" />
            </div>
            <div className="card-body">
                <h5 className="card-title text-blue text-truncate">{college.name}</h5>
                <p className="text-truncate">
                    <i className='bi bi-geo-alt-fill text-danger me-1'></i>
                    <span className='card-text'>
                        {college.address}
                    </span>
                </p>
                <div className="d-flex justify-content-between">
                    <GlobalEnquiryForm className="applyNowButton btn" placeholder="Class" />
                    <Link href={`/school/${college.id}/${college.slug}`} className="btn">View More</Link>
                </div>
            </div>
        </div>
    );
}

export default SchoolCard; 
