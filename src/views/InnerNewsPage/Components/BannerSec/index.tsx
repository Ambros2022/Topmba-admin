import Link from 'next/link'
import React from 'react'

const BannerSec = ({ data }) => {
    return (
        <>
            <section className='newsBannerSec'>
                <div className='position-relative'>
                    <div>
                        <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`} width={1400} height={400} alt='banner-img' className='position-relative ' />
                    </div>
                    
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><Link href="/news" className='text-black'> News <i className='bi bi-chevron-right'></i></Link>   <span className='text-blue'>{data.name}</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec