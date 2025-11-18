import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    return (
        <>
            <section className='SitemapSec position-relative'>
                <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' />
                <div className="d-flex h-100 w-100 justify-content-center position-absolute" style={{ top: '0' }}>
                    <div className="container h-100 row justify-content-center text-center align-content-center">
                        <h1 className="col-12 text-white text-bold text-center align-self-center">Sitemap</h1>
                        <p className='col-12 text-white pt-2'>Navigate Your Way to a Realm of Information
                        </p>
                    </div>
                </div>
            </section>
            <section className='bg-white py-3'>
                <div className="container linkFontSize">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Sitemap</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec