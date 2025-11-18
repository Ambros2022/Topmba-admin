import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='bg-skyBlue disclaimerCon w-100 position-relative'>
                <img src='/images/icons/BannerBG.webp' alt='banner-img' width={1400} height={300} />
                <div className="h-100 position-absolute w-100" style={{ top: '0px' }}>
                    <div className="container h-100 px-0">
                        <div className="d-flex h-100 justify-content-center">
                            <h1 className='align-self-center text-white px-md-0  fw-bold'>Learntech Edu Solutions Pvt. Ltd.</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-2">
                <div className="container linkFontSize">
                    <p className=''><Link className='text-black' href="/">Home <i className='bi bi-chevron-right'>
                    </i></Link><span className='text-blue'> Disclaimer</span></p>
                </div>
            </section>
        </>
    )
}

export default BannerSec