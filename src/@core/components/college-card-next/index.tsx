// components/CollegeCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

function CollegeCard({ college }) {
    const imageUrl = `${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`;

    return (
        <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card hover-card featuredClgCard mb-4">
            <div className=" position-relative" style={{ aspectRatio: '4/3' }}>
                <Image
                    src={imageUrl}
                    alt={`${college.name} banner`}
                    fill
                    className="card-img-top object-fit-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    unoptimized // remove if you configure domain in next.config.js
                />
            </div>
            <div className="card-body">
                <h5 className="card-title text-blue text-truncate">{college.name}</h5>
                <p className="text-truncate">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    <span className="card-text">{college.address}</span>
                </p>
                <div className="d-flex justify-content-between">
                    <GlobalEnquiryForm className="applyNowButton btn" />
                    <Link href={`/college/${college.id}/${college.slug}`} className="btn">
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CollegeCard;
