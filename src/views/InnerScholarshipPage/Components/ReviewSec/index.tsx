import React, { useState } from 'react';

const ReviewSec = () => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
    };

    // Mock data for rating distribution
    const ratingDistribution = [
        { stars: 5, count: 70 },
        { stars: 4, count: 30 },
        { stars: 3, count: 28 },
        { stars: 2, count: 10 },
        { stars: 1, count: 5 },
    ];

    // Total number of reviews
    const totalReviews = ratingDistribution.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <>
            <section className='bg-white py-5'>
                <div className="container">
                    <h2 className='fw-bold text-blue mb-3'>Yenepoya Medical College Overall Rating</h2>
                    <div className="row py-5 bg-skyBlue rounded">
                        <div className="col-md-6 col-lg-4">
                            <h4 className='fw-bold text-blue text-center'>4.4 Overall Rating</h4>
                            <div className={'starRating d-flex flex-row mb-2 justify-content-center'}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        className={`${'star'} ${value <= rating ? 'selected' : ''}`}
                                        onClick={() => handleClick(value)}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                            <h6 className='text-black text-center'>(Based on 44 reviews)</h6>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3 col-lg-4">
                            <h4 className='text-blue fw-bold text-center mb-3'>Distribution of Rating</h4>
                            {ratingDistribution.map((rating) => (
                                <div key={rating.stars} className="rating-bar">
                                    <span>{rating.stars} stars</span>
                                    <div className="progress">
                                        <div
                                            className="progress-bars"
                                            style={{ width: `${(rating.count / totalReviews) * 100}%` }}
                                        >
                                            {rating.count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6 col-10 mx-auto col-lg-3 mt-3 mt-md-5 mt-lg-0 mx-md-auto border p-3 rounded text-center">
                            <h4 className='text-blue fw-bold text-center'>Write a helpful review!</h4>
                            <p className='text-black text-center'>It's not about being good or bad; what matters is being honest and genuine.</p>
                            <button className='btn writeReviewBtn'>Write a Review</button>
                        </div>
                    </div>

                    <div className="row col-md-12 col-10 mx-md-0 mx-auto py-5">
                        <div className="card p-3 bg-skyBlue">
                            <div className="row">
                                <div className="col-md-2 text-center">
                                    <i className="fs-1 bi bi-person-circle"></i>
                                </div>
                                <div className="col-md-10 d-flex justify-content-md-between justify-content-center flex-md-row flex-column">
                                    <div className='align-self-center'>
                                        <h4 className='fw-bold text-blue'>Ashish Gaidhane</h4>
                                    </div>
                                    <div className='align-self-center'>
                                        <h6 className='text-blue pb-3 pb-md-0'><span><i className="bi bi-patch-check-fill text-warning"></i></span> Verified</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="ms-auto col-md-10">
                                    <h6>4.0 Reviewed <span className={'starRatings ms-1 me-1 mt-3'}>
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <span
                                                key={value}
                                                className={`${'star'} ${value <= rating ? 'selected' : ''}`}
                                                onClick={() => handleClick(value)}
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                    </span>  on Apr 11, 2024 10:00:49
                                    </h6>
                                </div>
                                <div className="ms-auto col-md-10">
                                    <ul>
                                        <li>Batch 2022</li>
                                        <li>B.Tech (Bachelor of Technology)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <h6 className='text-black fw-bold'>Student Comments:</h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam explicabo similique sit iure dignissimos cum architecto asperiores dolorem quo saepe.
                                </p>
                            </div>
                            <div className="d-flex ">
                                <button className='btn text-blue'><i className="bi bi-hand-thumbs-up"></i> 03</button>
                                <button className='btn text-blue'><i className="bi bi-hand-thumbs-down"></i> 03</button>
                                <button className='btn text-blue'><i className="bi bi-flag"></i> Report</button>
                                <button className='btn text-blue'><i className="bi bi-reply"></i> Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewSec;
