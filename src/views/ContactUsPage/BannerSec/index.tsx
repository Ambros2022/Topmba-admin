import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='scholarshipSec contactuspage bg-blue minehightinnercourse'>
                <div className='h-100 d-flex justify-content-center'>
                    {/* <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' /> */}
                    <div className=' w-100 h-100 innercourse_height' style={{ top: '0px' }}>
                        <div className="container">
                            <div className="py-5 text-start">
                                <h1 className='fw-bold text-white mb-4 text-center'>Contact Us</h1>
                                <p className='text-white text-center'>For students seeking admissions guidance or institutions looking to boost their branding, our expert team is ready to provide personalized support. Fill out the form below, and we'll get in touch with you shortly to address your specific needs and offer tailored solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='scholarshipSec contactuspage'>
                <div className='position-relative scholarShipImg'>
                    <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
                    <div className='position-absolute w-100 h-100' style={{ top: '0px' }}>
                        <div className="container">
                            <div className="py-5 text-start">
                                <h1 className='fw-bold text-white mb-4 text-center'>Contact Us</h1>
                                <p className='text-white text-center'>For students seeking admissions guidance or institutions looking to boost their branding, our expert team is ready to provide personalized support. Fill out the form below, and we'll get in touch with you shortly to address your specific needs and offer tailored solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Contact Us</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec