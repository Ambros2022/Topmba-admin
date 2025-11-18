import React from 'react'

interface EducationSecProps {
    scrollToExamSec: () => void;
}

const EducationSec: React.FC<EducationSecProps> = ({ scrollToExamSec }) => {
    return (
        <section className='py-5 EduSec bg-skyBlue'>
            <div className="container">
                <h4 className='text-blue fw-bold'>Education for All</h4>
                <h2 className='text-black fw-bold'>STUDENTS USUALLY BELONG TO ANY OF THE <span className='text-blue'>FOLLOWING GROUPS:</span></h2>
                <div className="row">
                    <div className="col-12">
                        <div className="education-img-wrap position-relative">
                            <div className="education-img-2 text-center">
                                <img src='/images/icons/goodHappy.png' width={700} height={700} style={{zIndex:1}} alt="good-logo" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-3'></div>
                <h6>However, Following our services can help you end up in a good college irrespective of the group in which you belong.</h6>
                <div className="row py-3">
                    <div className="col-lg-6 col-sm-6 mb-3">
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Services Offered Before Entrance Exams
                        </h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3">
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Services Offered Post Exam
                        </h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3">
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Services Offered for Entrance Exam
                        </h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3"> 
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Unique Services
                        </h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3"> 
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Additional Services
                        </h5>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-3"> 
                        <h5 className='text-black fw-bold'>
                            <i className='bi bi-check-circle-fill text-blue me-2'></i>Special Services - (On Demand)
                        </h5>
                    </div>
                </div>
                <div className="mb-3">
                    <button className='btn viewMoreCollegeBtn p-3' onClick={scrollToExamSec}>View Detailed Services <i className='bi bi-chevron-double-right'></i></button>
                </div>
            </div>
        </section>
    )
}

export default EducationSec
