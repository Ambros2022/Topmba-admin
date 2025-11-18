import React from 'react'

const HelpSec = () => {
    return (
        <section className='helpSec position-relative'>
            <img src='/images/icons/helpBanner.webp' className='bannerHelp' alt='help-banner' width={1400} height={500} />
            <div className="d-flex justify-content-center position-absolute h-100 w-100" style={{ top: '0px', backgroundColor: 'rgb(0,0,0,0.7)' }}>
                <div className="container d-flex flex-column justify-content-center h-100">
                    <h2 className='text-white fw-bold text-center align-self-center mb-5'>WE WILL HELP YOU FROM BEGINNING TO END</h2>
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 mb-5">
                            <div className="card card-hover-effect p-3 border-white bg-transparent ">
                                <img src='/images/icons/expert.svg' className='mx-auto' alt='help-banner' width={150} height={150} />
                                <h5 className='text-white fw-bold text-center'>Team of Experts:</h5>
                                <h6 className='text-white mb-0mb-0 text-center'>We have a dedicated team of experts who are determined to help you walk down the path.</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 mb-5">
                            <div className="card card-hover-effect p-3 border-white bg-transparent ">
                                <img src='/images/icons/feedback.svg' className='mx-auto' alt='help-banner' width={150} height={150} />
                                <h5 className='text-white fw-bold text-center'>Insider Knowledge:</h5>
                                <h6 className='text-white mb-0 text-center'>Top Colleges, Pre and Post-Exam Process, Opportunities Abroad- We know it all!</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 mb-5">
                            <div className="card card-hover-effect p-3 border-white bg-transparent ">
                                <img src='/images/icons/idea.svg' className='mx-auto' alt='help-banner' width={150} height={150} />
                                <h5 className='text-white fw-bold text-center'>Latest Developments:</h5>
                                <h6 className='text-white mb-0 text-center'>We closely monitor all the changes and developments for you so that you can focus on your preparation process.</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 mb-5">
                            <div className="card card-hover-effect p-3 border-white bg-transparent ">
                                <img src='/images/icons/pathway.svg' className='mx-auto' alt='help-banner' width={150} height={150} />
                                <h5 className='text-white fw-bold text-center'>Guidance for Every Course:</h5>
                                <h6 className='text-white mb-0 text-center'>Medicine doesn’t end with MBBS and nor do our services. We provide guidance for any medical course that you desire to join.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HelpSec