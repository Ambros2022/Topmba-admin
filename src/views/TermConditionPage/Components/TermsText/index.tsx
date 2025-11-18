import React from 'react'

const TermsText = ({ data }) => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container text-center">
                    <h2 className='text-blue fw-bold w-100 mt-2'>Welcome to Learntech Edu Solutions Pvt. Ltd.
                    </h2>
                    {/* <div className="d-flex justify-content-center w-100"> */}
                        <div dangerouslySetInnerHTML={{ __html: data?.top_description }} />
                    {/* </div> */}
                </div>
            </section>
        </>
    )
}

export default TermsText