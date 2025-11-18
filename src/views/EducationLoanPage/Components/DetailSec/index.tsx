import React from 'react'
import EducationLoanPage from 'src/@core/components/popup/EducationloanForm'

const DetailSec = () => {


    return (
        <>
            <section className='bg-white DetailSec'>
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src='/images/icons/contact-team.webp' width={500} height={500} alt='contact-form' style={{ objectFit: 'cover' }} className='w-100 h-100' loading='lazy' />
                    </div>
                    <div className="col-md-6 bg-skyBlue px-md-5 px-2 py-5">
                        <h2 className='fw-bold text-center text-blue mb-3'>Get Comprehensive Admission & Loan Assistance</h2>
                        <EducationLoanPage />
                    </div>
                </div>
            </section>
        </>
    )
}

export default DetailSec
