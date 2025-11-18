import Link from 'next/link'
import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const BannerSec = () => {
    return (
        <>
            <section className='scholarshipSec bg-blue'>
                <div className=' h-100 w-100 d-flex justify-content-center'>
               
                    <div className=' h-100 w-100 d-flex justify-content-center' style={{ top: '0px' }}>
                        <div className="align-content-center text-center">

                            <h1 className='fw-bold text-white mb-3 minhrighth1'> MBBS Abroad For Indian Students </h1>
                            <GlobalPopupEnquiry className="btn btn-success" />

                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='scholarshipSec'>
                <div className='position-relative scholarShipImg'>
                    <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
                    <div className='position-absolute h-100 w-100 d-flex justify-content-center' style={{ top: '0px' }}>
                        <div className="align-content-center text-center">

                            <h1 className='fw-bold text-white mb-3'> MBBS Abroad For Indian Students </h1>
                            <GlobalPopupEnquiry className="btn btn-success" />

                        </div>
                    </div>
                </div>
            </section> */}
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> MBBS Abroad</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec