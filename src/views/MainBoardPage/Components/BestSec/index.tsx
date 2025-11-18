import React, { useState } from 'react';
import ContactForm from 'src/@core/components/popup/ContactForm';

const BestSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 8000; // Adjust this value to change when the "Read More" button appears

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
                        className="btn viewMoreClgBtn"
                    >
                        Read More
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <section className='bg-white pt-2 pb-md-5 pb-3'>
                <div className="container">
                    <h2 className='text-md-start text-center fw-bold text-blue'>
                        Best Education Boards in India
                    </h2>
                    <div className="row py-2">
                        <div className="col-lg-8 col-md-7">
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
                        <div className="col-lg-4 pt-4 pt-md-0 col-md-5 mx-auto">
                            <ContactForm heading={'Contact Us'} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BestSec;
