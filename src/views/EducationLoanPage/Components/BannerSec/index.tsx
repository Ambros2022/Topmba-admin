import dynamic from 'next/dynamic';
import Link from 'next/link'
import React from 'react'
// import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'
const GlobalPopupEnquiry = dynamic(() => import("src/@core/components/popup/GlobalPopupEnquiry"), {
    ssr: false,
    loading: () =>
        <a className="btn btn-success2" style={{ cursor: 'pointer' }}>
            Apply Now
        </a>
});
const BannerSec = () => {
    return (
        <>
            <section className='eduLoanSec position-relative'>
                <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' fetchPriority="high"
                    loading="eager" />
                <div className="position-absolute h-100 w-100" style={{ top: '0px' }}>
                    <div className="container d-flex justify-content-center flex-column h-100">
                        <h1 className='text-white fw-bold text-center align-self-center'>
                            Your Complete Guide to Secure Education Loans for India and Abroad
                        </h1>

                        <div className='align-self-center pt-3'>
                            <GlobalPopupEnquiry className='btn btn-success2' />

                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link className='text-black' href='/'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Education-Loan</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec