import React from 'react';

import Link from 'next/link'

const BannerSec = () => {

    return (
        <>
            <section className='AdvertiseBanner'>
                <img
                    // src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                    src="/images/icons/handshake.webp"
                    // priority={true}
                    alt={`Banner advertisement`}
                    height={300}
                    width={1400}
                    className='img-fluid'
                />


            </section >
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link className='text-black' href='/'>Home <i className='bi bi-chevron-right me-2'></i></Link><span className='text-blue'>Advertise With Us </span>
                </div>
            </section>
        </>
    )
}

export default BannerSec