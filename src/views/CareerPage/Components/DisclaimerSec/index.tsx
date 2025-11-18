import React from 'react'

const DisclaimerSec = ({ data }) => {
    return (
        <>
            <section className='bg-white innercourse_height'>
                <div className="container  rounded py-3 px-2 px-md-5">
                    <h2 className='text-center fw-bold text-blue'>Disclaimer</h2>
                    <div dangerouslySetInnerHTML={{ __html: data?.bottom_description }} />
                </div>
            </section>
        </>
    )
}

export default DisclaimerSec