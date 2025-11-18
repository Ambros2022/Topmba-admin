import Link from 'next/link';
import React, { useState } from 'react';

const ScholarshipAbroadSec = ({ data = {} }: { data?: { top_description?: string } }) => {
    const [isExpanded, setIsExpanded] = useState(false); // State for handling read more
    const maxLength = 5400; // Adjust this value to control when "Read More" appears

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
                <div className='text-center mb-2 mt-2'>
                    <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read More</button>
                </div>
            </>
        );
    };

    return (
        <>

            <section className='bg-white'>
                <section className="container InnerCollegeNavigationLink linkFontSize pt-2">
                    <p className='mb-3'><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Schools</span></p>
                </section>
                <div className="container py-3">
                    <h2 className='fw-bold text-blue text-center pb-3'>List of Best Schools in India</h2>
                    <div>
                        {renderDescription()}
                        {isExpanded && (
                            <div className='text-center'>
                                <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read Less</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ScholarshipAbroadSec;
