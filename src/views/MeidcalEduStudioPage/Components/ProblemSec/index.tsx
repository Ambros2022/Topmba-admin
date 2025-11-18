import React from 'react'

const ProblemSec = () => {
    return (
        <>
            <section className='py-5 bg-white problemSec'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center mb-5'>DO YOU FACE PROBLEMS LIKE
                    </h2>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className='card p-3 border-0 rounded  card-hover-effect'>
                                <img src='/images/icons/confusion.svg' className='mx-auto' alt='confusion-logo' width={150} height={150} />
                                <h4 className='text-center pt-2 fw-bold text-blue'>Confusion</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className='card p-3 border-0 rounded  card-hover-effect'>
                                <img src='/images/icons/scared.svg' className='mx-auto' alt='scared-logo' width={150} height={150} />
                                <h4 className='text-center pt-2 fw-bold text-blue'>Exam Fear</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className='card p-3 border-0 rounded  card-hover-effect'>
                                <img src='/images/icons/bullying.svg' className='mx-auto' alt='bullying-logo' width={150} height={150} />
                                <h4 className='text-center pt-2 fw-bold text-blue'>Lack of Guidance</h4>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className='card p-3 border-0 rounded  card-hover-effect'>
                                <img src='/images/icons/stress.svg' className='mx-auto' alt='scared-logo' width={150} height={150} />
                                <h4 className='text-center pt-2 fw-bold text-blue'>Stress</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProblemSec