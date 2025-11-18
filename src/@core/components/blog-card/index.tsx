import React from 'react';
import Link from 'next/link';

function BlogCard({ college }) {
    return (
        <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card hover-card mb-4">
            <div className="d-flex align-items-center justify-content-center">
                <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`}
                    width={500}
                    height={500}
                    className="img-fluid"
                    alt="featured-college"
                />
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-black text-center mb-3 blogCard">
                    {college.name}
                </h5>
                <div className="d-flex justify-content-center mt-auto">
                    <Link href={`/blog/${college.id}/${college.slug}`} className="btn viewMoreClgBtn mb-3 mt-3">View More</Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
