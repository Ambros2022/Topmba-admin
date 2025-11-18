import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios';
import Image from "next/image";
import Head from "next/head";
import Link from 'next/link';

const BannerSec = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [firstBannerUrl, setFirstBannerUrl] = useState<string | null>(null);

  const getbanner = useCallback(async () => {
    try {
      const response = await axios1.get(
        'api/website/banner/get?promo_banner=All_about_page',
        { params: { page: 1, size: 10000 } }
      );
      const data = response.data.data;
      setBanners(data);
      if (data?.length > 0) {
        setFirstBannerUrl(`${process.env.NEXT_PUBLIC_IMG_URL}/${data[0].image}`);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getbanner();
  }, [getbanner]);

  return (
    <>
     {firstBannerUrl && (
  <Head>
    <link
      rel="preload"
      as="image"
      href={firstBannerUrl}
      imageSrcSet={firstBannerUrl}
    />
  </Head>
)}

      <section className='aboutUsPageSec position-relative d-flex justify-content-center'>
        {banners.map((banner, i) => (
          <Image
            key={i}
            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
            alt="Banner-img"
            width={1700}
            height={300}
            priority={i === 0} // Only the first image gets priority
            className="banner-image-about"
          />
        ))}

        <div
          className='position-absolute w-100 h-100 d-flex justify-content-center AdvertiseBanner'
          style={{ top: '0px' }}
        >
          <div className="container d-flex justify-content-center h-100 w-100">
            <div className="align-content-center">
              <div className="py-5 text-center">
                <h1
                  className='fw-bold text-white mb-3 rounded p-3'
                  style={{ backgroundColor: "rgb(37,70,146)" }}
                >
                  About Learntech Edu Solutions
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white'>
        <div className='container py-2 linkFontSize'>
          <Link href='/' className='text-black'>
            Home <i className='bi bi-chevron-right'></i>
          </Link>
          <span className='text-blue'> About Us</span>
        </div>
      </section>
    </>
  )
}

export default BannerSec

// import Link from 'next/link'
// import React, { useCallback, useEffect, useState } from 'react'
// import axios1 from 'src/configs/axios';

// import Image from "next/image";


// const BannerSec = () => {
//     const [banners, setBanners] = useState<any[]>([]);
//     const getbanner = useCallback(async () => {
//         try {
//             const roleparams: any = { page: 1, size: 10000 };
//             const response = await axios1.get('api/website/banner/get?promo_banner=All_about_page', { params: roleparams });
//             setBanners(response.data.data);
//             console.log(response.data.data)
//         } catch (err) {
//             console.error(err);
//         }
//     }, []);

//     useEffect(() => {
//         getbanner();
//     }, [getbanner]);
//     return (
//         <>
//             <section className=' aboutUsPageSec position-relative d-flex justify-content-center ' >
//                 {banners.map((banner) => (

//                     <img
//                         width={1700} height={300}
//                         src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
//                         fetchPriority="high"
//                         loading="eager"
//                         alt={`Banner-img`}
//                         className="banner-image-about"
//                     />
//                        <Image
//          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
//       alt="Banner-img"
//       width={1700}
//       height={300}
//       priority 
//       className="banner-image-about"
//     />

//                 ))}
//                 <div className='position-absolute w-100 h-100 d-flex justify-content-center AdvertiseBanner' style={{ top: '0px' }}>
//                     <div className="container d-flex justify-content-center h-100 w-100">
//                         <div className="align-content-center">
//                             <div className="py-5 text-center">
//                                 <h1 className='fw-bold text-white mb-3 rounded p-3' style={{ backgroundColor: "rgb(37,70,146)" }}>About Learntech Edu Solutions</h1>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className='bg-white'>
//                 <div className='container py-2 linkFontSize'>
//                     <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> About Us</span>
//                 </div>
//             </section>
//         </>

//     )
// }

// export default BannerSec