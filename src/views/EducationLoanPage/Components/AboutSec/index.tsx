import React, { useState } from 'react'

const AboutSec = ({ pagedata }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 5000; // Adjust this value to change when the "Read More" button appears

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const renderDescription = () => {
        if (!pagedata?.top_description) return null;

        if (pagedata?.top_description.length <= maxLength || isExpanded) {
            return <div dangerouslySetInnerHTML={{ __html: pagedata?.top_description }} />;
        }

        const truncatedText = pagedata?.top_description.slice(0, maxLength) + '...';
        return (
            <>



                <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
                <div className='text-center'>
                    <button
                        onClick={toggleReadMore}
                        className="btn viewMoreClgBtn"
                    >
                        Read More
                    </button>
                </div>

            </>
        );
    };

    return (
        <section className='py-3 bg-white'>
            <div className="container">
                <h2 className='text-blue fw-bold mb-3  text-center'>Educational Loan for students in India

                </h2>
                {/* <div dangerouslySetInnerHTML={{ __html: pagedata?.top_description }} /> */}
                <div className='texteditior' >
                    {renderDescription()}
                </div>
                {isExpanded && (
                    <div className='text-center'>
                        <button
                            onClick={toggleReadMore}
                            className="btn viewMoreClgBtn"
                        >
                            Read Less
                        </button>
                    </div>
                )}
            </div>
        </section >
    )
}

export default AboutSec