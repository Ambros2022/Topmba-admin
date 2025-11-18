import React from 'react';

interface ServicesSecProps {
    scrollToBannerSec: () => void;
    scrollToExamSec: () => void;
}

const ServicesSec: React.FC<ServicesSecProps> = ({ scrollToBannerSec, scrollToExamSec }) => {
    return (
        <section className='bg-skyBlue py-5 servicesCardSec'>
            <div className="container">
                <h2 className='text-blue fw-bold text-center mb-5'>MEDICAL EDU STUDIO SERVICES</h2>
                <h4 className='text-blue fw-bold text-center mb-5'>(Sapphire & Diamond Packages)</h4>
                <div className="row bg-white d-flex">
                    <div className="col-md-4">
                        <div className="card border-0 p-3 rounded">
                            <h4 className='text-center mb-3 fw-bold'><img src='/images/icons/sapphire.svg' width={50} height={50} className='me-2 img-fluid' alt='saphhhire-img' />
                                Sapphire package</h4>
                            <div className='bg-blue text-white text-center p-3 rounded'>
                                <h5 className='fw-bold'>INR</h5>
                                <h2><i className='bi bi-currency-rupee'></i>15,000</h2>
                                <h4>+ GST (Inclusive of all taxes)</h4>
                            </div>
                            <div className='py-3 text-blue'>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Before Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered for Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered Post Exam</h5>
                                <h5><i className='bi bi-x-circle-fill text-danger'></i> Services Offered Post Exam</h5>
                            </div>
                            <div className="text-center">
                                <button className='btn viewMoreCollegeBtn px-4 py-2' onClick={scrollToBannerSec}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 p-3 rounded">
                            <h4 className='text-center mb-3 fw-bold'><img src='/images/icons/diamond.svg' width={50} height={50} className='me-2 img-fluid' alt='saphhhire-img' />
                                Diamond package</h4>
                            <div className='bg-gray text-white text-center p-3 rounded'>
                                <h5 className='fw-bold'>INR</h5>
                                <h2><i className='bi bi-currency-rupee'></i>30,000</h2>
                                <h4>+ GST (Inclusive of all taxes)</h4>
                            </div>
                            <div className='py-3 text-blue'>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Before Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered for Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered Post Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered Post Exam</h5>
                            </div>
                            <div className="text-center">
                                <button className='btn viewMoreCollegeBtn px-4 py-2' onClick={scrollToBannerSec}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 p-3 rounded">
                            <h4 className='text-center mb-3 fw-bold'><img src='/images/icons/luggage.svg' width={50} height={50} className='me-2 img-fluid' alt='saphhhire-img' />
                                Diamond package <br />
                                <span className='fs-5 ms-3'>(For NRI Students)</span></h4>
                            <div className='bg-blue text-white text-center p-5 rounded'>
                                <h2>$ 850 USD</h2>
                            </div>
                            <div className='py-3 text-blue'>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Before Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered for Entrance Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered Post Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Services Offered Post Exam</h5>
                                <h5><i className='bi bi-check-circle-fill'></i> Counselling at Your Place (1)</h5>
                            </div>
                            <div className="text-center">
                                <button className='btn viewMoreCollegeBtn px-4 py-2' onClick={scrollToBannerSec}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        <button onClick={scrollToExamSec} className='btn viewMoreCollegeBtn py-3 px-5'>Services Offered at GCC Countries</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesSec;
