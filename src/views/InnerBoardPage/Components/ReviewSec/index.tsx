import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'src/configs/axios';
import { format } from 'date-fns';

interface RatingCount {
    [key: string]: number;
}

interface RatingDistribution {
    stars: number;
    count: number;
}

const ReviewSec = ({ data }) => {
    const [avgRating, setAvgRating] = useState<number>(0);
    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [ratingCounts, setRatingCounts] = useState<RatingCount>({});
    const [cardData, setCardData] = useState<any>([]);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
    const [userId, setUserId] = useState<string>(''); // Assuming user_id is a string
    const [likedReviews, setLikedReviews] = useState<number[]>([]);
    const [dislikedReviews, setDisLikedReviews] = useState<number[]>([]);
    const [visibleCards, setVisibleCards] = useState(2);
    const [showAllComments, setShowAllComments] = useState(false);

    //reviewrating
    useEffect(() => {
        const getReviewRatingData = async () => {
            try {
                const response = await axios.get('/api/website/reviewrating/get', {
                    params: {
                        college_id: data.id,
                        page: 1,
                        size: 8,
                    }
                });
                const { avgRating, totalReviews } = response.data.totalLikesDislikes[0];
                const ratingCounts = response.data.ratingCounts[data.id]?.ratings;
                setAvgRating(parseFloat(avgRating));
                setTotalReviews(totalReviews);
                setRatingCounts(ratingCounts);
            } catch (error) {
                console.error('Failed to fetch page data:', error);
            }
        };
        getReviewRatingData();
    }, [data.id]);

    //allreview
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('api/website/allreview/get');
                if (response.data && response.data.data && response.data.data.length > 0) {
                    const firstReview = response.data.data[0]; // Assuming you want the user_id from the first review
                    setUserId(firstReview.user_id);

                } else {
                    console.error('Empty or invalid response data');
                }
            } catch (error) {
                console.error('Failed to fetch user_id:', error);
            }
        };

        fetchUserId();
    }, []);

    //findone review
    useEffect(() => {
        const getFindReviewData = async () => {
            try {
                const response = await axios.get('api/website/findonereview/get', {
                    params: {
                        size: 1000,
                        college_id: data.id,
                    }
                });
                setCardData(response.data.data);

            } catch (error) {
                console.error('Failed to fetch page data:', error);
            }
        };
        getFindReviewData();
    }, [data.id]);


    const generateRatingDistribution = (): RatingDistribution[] => {
        const distribution: RatingDistribution[] = [];
        for (let i = 5; i >= 1; i--) {
            distribution.push({
                stars: i,
                count: ratingCounts[i.toString()] || 0
            });
        }
        return distribution;
    };

    const ratingDistribution: RatingDistribution[] = generateRatingDistribution();

    const renderStars = () => {
        if (avgRating === null) return null;

        const roundedRating = Math.round(avgRating);
        return (
            <div className={'starRating d-flex flex-row mb-2 justify-content-center'}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        key={value}
                        className={`star ${value <= roundedRating ? 'selected' : ''}`}
                    >
                        &#9733;
                    </span>
                ))}
            </div>
        );
    };

    const toggleReplyForm = (reviewId: number) => {
        console.log(reviewId)
        setShowReplyForm(!showReplyForm);
        setSelectedReviewId(reviewId);
    };

    const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('api/website/addreviewreply/post', {
                review_id: selectedReviewId,
                content: replyContent,
                user_id: userId,

            });

          
            console.log(cardData)
            const updatedCardData = cardData.map(review => {
                console.log(review.id)
                if (review.id === selectedReviewId) {
                    // console.log(review.reviewreply)
                    const updatedReplies = review.reviewreply ? [...review.reviewreply, response.data.data] : [response.data.data];
                    // console.log(updatedReplies)
                    return { ...review, reviewreply: updatedReplies };
                }
                return review;
            });
            // console.log(cardData)
            setCardData(updatedCardData);

            setShowReplyForm(false);
            setReplyContent('');
        } catch (error) {
            console.error('Failed to add reply:', error);
        }
        setShowReplyForm(false);
    };




    const handleLoadMore = () => {
        setVisibleCards(visibleCards + 3);
    };

    // Function to handle "View All" button click
    const handleViewAllClick = () => {
        setShowAllComments(!showAllComments);
    };


    const handleLikeDislikeClick = async (reviewId, action) => {
        try {
            let likeValue = 0;
            let dislikeValue = 0;

            // Check if user has already liked/disliked this review
            if (action === 'like' && likedReviews.includes(reviewId)) {

                return; // Exit function early
            } else if (action === 'dislike' && dislikedReviews.includes(reviewId)) {

                return; // Exit function early
            }

            if (action === 'like') {
                likeValue = 1;
            } else if (action === 'dislike') {
                dislikeValue = 0;
            }

            const response = await axios.post('api/website/review/likesupdate', {
                id: reviewId,
                like: likeValue,
                dislike: dislikeValue,
            });

            const updatedReview = response.data.updatedReview;

            if (action === 'like') {
                const updatedLikedReviews = [...likedReviews, reviewId];
                setLikedReviews(updatedLikedReviews);

            } else if (action === 'dislike') {
                const updatedDislikedReviews = [...dislikedReviews, reviewId];
                setDisLikedReviews(updatedDislikedReviews);

            }

            // Update review data in cardData state to reflect new likes/dislikes count
            const updatedCardData = cardData.map(review => {
                if (review.id === reviewId) {
                    return { ...review, likes: updatedReview.likes, dislikes: updatedReview.dislikes };
                }
                return review;
            });

            setCardData(updatedCardData);

        } catch (error) {
            console.error('Failed to update like/dislike:', error);
        }
    };

    // Function to handle like button click
    const handleLikeClick = (reviewId) => {
        handleLikeDislikeClick(reviewId, 'like');
    };

    // Function to handle dislike button click
    const handleDislikeClick = (reviewId) => {
        handleLikeDislikeClick(reviewId, 'dislike');
    };

    return (
        <>
            <section className='bg-white py-3'>
                <div className="container">
                    <h2 className='fw-bold text-blue mb-3'>{data.name} Overall Rating</h2>
                    <div className="row py-5 bg-skyBlue rounded">
                        <div className="col-md-6 col-lg-4">
                            <h4 className='fw-bold text-blue text-center'>{avgRating} Overall Rating</h4>
                            <div className={'starRating d-flex flex-row mb-2 justify-content-center'}>
                                {renderStars()}
                            </div>
                            <h6 className='text-black text-center'>(Based on {totalReviews} reviews)</h6>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3 col-lg-4">
                            <h4 className='text-blue fw-bold text-center mb-3'>Distribution of Rating</h4>
                            {ratingDistribution.map((rating) => (
                                <div key={rating.stars} className="rating-bar">
                                    <span>{rating.stars} stars</span>
                                    <div className="progress">
                                        <div
                                            className="progress-bars"
                                            style={{ width: rating.count ? `${(rating.count / totalReviews) * 100}%` : '10%' }}
                                        >
                                            {rating.count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-6 col-10 mx-auto col-lg-3 mt-3 mt-md-5 mt-lg-0 mx-md-auto border p-3 text-center">
                            <h4 className='text-blue fw-bold text-center mb-4'>Write a helpful review!</h4>
                            <p className='text-black text-center mb-5'>It's not about being good or bad; what matters is being honest and genuine.</p>
                            <Link href={`/write-review`} className='btn writeReviewBtn'>Write a Review</Link>
                        </div>
                    </div>

                    <div className="row col-md-12 col-10  mx-md-0 mx-auto pt-5">
                        {cardData.slice(0, visibleCards).map((review) => (
                            <div key={review.id} className="card p-3 mb-5 bg-skyBlue">
                                <div className="row">
                                    <div className="col-md-2 text-center">
                                        <i className="fs-1 bi bi-person-circle"></i>
                                    </div>
                                    <div className="col-md-10 d-flex justify-content-md-between justify-content-center flex-md-row flex-column">
                                        <div className='align-self-center'>
                                            <h4 className='fw-bold text-blue'>{review.name}</h4>
                                        </div>
                                        <div className='align-self-center'>
                                            <h6 className='text-blue pb-3 pb-md-0'><span><i className="bi bi-patch-check-fill text-success"></i></span> Verified</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ms-auto col-md-10">
                                        <h6>{review.userrating} Reviewed <span className={'starRatings ms-1 me-1 mt-3'}>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    className={`star ${value <= review.userrating ? 'selected' : ''}`}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </span> on {format(new Date(review.created_at), 'MMM dd, yyyy hh:mm a')}
                                        </h6>
                                    </div>
                                    <div className="ms-auto col-md-10">
                                        <ul>
                                            <li>Batch {review.passing_year}</li>
                                            <li>B.Tech (Bachelor of Technology)</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <h6 className='text-black fw-bold'>Student Comments:</h6>
                                    <p>
                                        {review.content}
                                    </p>
                                </div>
                                <div className="d-flex ">
                                    {/* <button className='btn text-blue click-like' onClick={() => handleLikeClick(review.id)}><i className="bi bi-hand-thumbs-up"></i> {review.likes}</button> */}
                                    <button className='btn text-blue' onClick={() => handleLikeClick(review.id)}>
                                        <i className={`bi ${likedReviews.includes(review.id) ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i> {review.likes}
                                    </button>

                                    <button className='btn text-blue ' onClick={() => handleDislikeClick(review.id)}>
                                        <i className={`bi ${dislikedReviews.includes(review.id) ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`}></i> {review.dislikes}
                                    </button>

                                    {/* <button className='btn text-blue' onClick={() => handleDisLikeClick(review.id)}><i className="bi bi-hand-thumbs-down"></i> {review.dislikes}</button> */}
                                    <button className='btn text-blue' style={{ cursor: 'default' }}><i className="bi bi-flag"></i> Report</button>
                                    <button className='btn text-blue' onClick={() => toggleReplyForm(review.id)}><i className="bi bi-reply"></i> Reply</button>

                                </div>

                                {showReplyForm && selectedReviewId === review.id && (
                                    <div className="d-flex align-items-start">
                                        <form onSubmit={handleReplySubmit} className="d-flex align-items-center col-md-8 col-12">
                                            <textarea
                                                className="form-control"
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Write your reply..."
                                                required
                                            ></textarea>
                                            <button type="submit" className="btn btn-primary ms-2">Submit</button>
                                        </form>
                                    </div>

                                )}

                                {/* Display Review Replies */}
                                {review.reviewreply && review.reviewreply.length > 0 && (
                                    <div className="review-replies">
                                        {/* Show limited replies initially */}
                                        <h6 className='fw-bold text-black '>Replies:</h6>
                                        {review.reviewreply.slice(0, showAllComments ? undefined : 2).map(reply => (
                                            <div className="reply" key={reply.id}>

                                                <p>{reply.content}</p>
                                            </div>
                                        ))}
                                        {/* "View All Replies" Button */}
                                        {review.reviewreply.length > 2 && (
                                            <div className="text-start mt-2">
                                                <button className="btn viewMoreCollegeBtn" onClick={handleViewAllClick}>
                                                    {showAllComments ? 'Show Less ' : `View All (${review.reviewreply.length})`}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}


                            </div>
                        ))}




                    </div>
                    <div className="text-center">
                        {cardData.length > visibleCards ? ( // Show load more button only if there are more reviews to load
                            <button className="btn viewMoreCollegeBtn" onClick={handleLoadMore}>
                                Load More
                            </button>
                        ) : ''}
                    </div>

                </div>
            </section>
        </>
    );
};

export default ReviewSec;
