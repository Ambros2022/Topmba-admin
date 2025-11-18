import dynamic from 'next/dynamic';
import React from 'react'
const NewsLetterEnquiry = dynamic(() => import('src/@core/components/popup/NewsLetterEnquiry'), { ssr: false });


const NewsLetterSec = () => {
    return (
        <>
            <section className='py-md-5 py-5'>
                <div className="container bg-skyBlue rounded">
                    <h2 className='fw-bold text-blue text-md-start text-center mb-3'>Subscribe to our Newsletter
                    </h2>
                    <p className="text-black  text-md-start text-center mb-5">
                        Subscribe to our website to stay informed about the latest developments in college admissions, education, and career guidance. Get valuable advice and tips from experienced professionals to help you navigate the college application process with confidence. Discover and explore various scholarship options to help fund your education and achieve your goals. Gain a competitive advantage in the college admissions process. Receive tailored information and guidance based on your interests and needs, ensuring you stay on track and focused throughout your academic journey and much more.
                    </p>
                    <NewsLetterEnquiry />
                </div>
            </section>
        </>
    )
}

export default NewsLetterSec