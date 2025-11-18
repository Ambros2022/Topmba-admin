import Link from 'next/link'
import axios1 from 'src/configs/axios';
import React, { useCallback, useEffect, useState } from 'react';

const BannerSec = () => {
    const [banners, setBanners] = useState<any[]>([]);

    const getbanner = useCallback(async () => {
        try {
            const roleparams: any = { page: 1, size: 10000 };
            const response = await axios1.get('api/website/banner/get?promo_banner=Services_Page', { params: roleparams });
            setBanners(response.data.data);
        } catch (err) {
            console.error(err);
        } 
    }, []);

    useEffect(() => {
        getbanner();
    }, [getbanner]);
    return (
        <>
            <section className='ServiceBanner bg-white'>
                {banners?.map((banner, index) => (
               
                        <img
                            width={1400}
                            height={300}
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                            // priority={true}
                            alt={`Banner ${index}`}
                        />
                  
                ))}
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-2">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>Services</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec