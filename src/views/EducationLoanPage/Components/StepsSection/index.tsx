import React from 'react'

const StepSection = () => {
    return (
        <section className='bg-white py-5'>
            <div className="container bg-skyBlue rounded p-3 p-md-5">
                <h2 className='fw-bold text-center text-blue pt-2 mb-4'>How to Apply for Student Loan in India</h2>
                <div className='pt-3 d-flex justify-content-center gap-5 gap-md-3 flex-wrap'>
                    <div className="row justify-content-center align-items-baseline">

                        <div className='rounded col-12 col-md-8 custom-edu-loan' >
                            <img src='/images/icons/Filling_up_of_Application_Form.jpg' className='rounded img-fluid' width={500} height={500} alt='filling-up-of-application-form' loading='lazy' />
                            <p className='fw-bold text-black my-3 mb-0 mb-md-3 text-center'>Fill out the Student Loan Application Form</p>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='align-self-center d-flex justify-content-center'>
                                <i className='bi fw-bold fs-5 bi-arrow-right-square-fill arrow-right text-blue'></i>
                                <i className="bi fw-bold bi-arrow-down-square-fill arrow-down text-blue" style={{ fontSize: '1.5rem' }}></i>

                            </span>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-baseline">

                        <div className='rounded col-12 col-md-8 custom-edu-loan' >
                            <img src='/images/icons/Document_Verification_Interview.jpg' className='rounded img-fluid' width={500} height={500} alt='document-verification-interview' loading='lazy' />
                            <p className='fw-bold text-black my-3 mb-0 mb-md-3 text-center'>Submit the Required Documents   </p>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='align-self-center d-flex justify-content-center'>
                                <i className='bi fw-bold fs-5 bi-arrow-right-square-fill arrow-right text-blue'></i>
                                <i className="bi fw-bold bi-arrow-down-square-fill arrow-down text-blue" style={{ fontSize: '1.5rem' }}></i>
                            </span>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-baseline">

                        <div className='rounded col-12 col-md-8 custom-edu-loan' >
                            <img src='/images/icons/Loan_Approval.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-approval' loading='lazy'  />
                            <p className='fw-bold text-black my-3 mb-0 mb-md-3 text-center'>Application Review by the Bank</p>
                        </div>
                        <div className='col-12 col-md-2'>
                            <span className='align-self-center d-flex justify-content-center'>
                                <i className='bi fw-bold fs-5 bi-arrow-right-square-fill arrow-right text-blue'></i>
                                <i className="bi fw-bold bi-arrow-down-square-fill arrow-down text-blue" style={{ fontSize: '1.5rem' }}></i>
                            </span>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-baseline">

                        <div className='rounded col-12 col-md-8 custom-edu-loan' >
                            <img src='/images/icons/Loan_Disbursal.jpg' className='rounded img-fluid' width={500} height={500} alt='loan-disbursal' loading='lazy'  />
                            <p className='fw-bold text-black my-3 mb-0 mb-md-3 text-center'>Pay the Loan to your Educational Institute</p>
                        </div>
                        <div className='col-12 col-md-2'>
               
                        </div>
                    </div>



             
                </div>
            </div>
        </section>
    )
}

export default StepSection
