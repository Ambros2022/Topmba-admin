import React from 'react'

const AboutSec = ({data}) => {

    return (
        <section className='bg-white  minehightinnercourse'>
            <div className="container  py-3 rounded">
                <div className="container px-0 px-md-5">
                    <h2 className='text-center text-blue fw-bold mb-3'>About Learntech Edu Solutions Pvt. Ltd.</h2>
                    <div className='minheight200mobile'  dangerouslySetInnerHTML={{ __html: data?.top_description }} />
                </div>
            </div>
        </section>
    )
}

export default AboutSec