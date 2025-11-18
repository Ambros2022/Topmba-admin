import React, { useState } from 'react';

const TopExamSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 1000; // Adjust this value to change when the "Read More" button appears

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const renderDescription = () => {
        if (!data.top_description) return null;

        if (data.top_description.length <= maxLength || isExpanded) {
            return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
        }

        const truncatedText = data.top_description.slice(0, maxLength) + '...';
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
                <div className='text-center'>
                    <button
                        onClick={toggleReadMore}
                        className="btn viewMoreClgBtn mt-3"
                    >
                        Read More
                    </button>
                </div>
            </>
        );
    };

    return (
        <section className='py-5 bg-white'>
            <div className="container">
                <h2 className='text-blue fw-bold text-center mb-4'>
                    Top Entrance Exams in India and Exams for Abroad Study
                </h2>
                {renderDescription()}
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
        </section>
    );
};

export default TopExamSec;