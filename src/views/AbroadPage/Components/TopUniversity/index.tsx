import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });
import axios1 from 'src/configs/axios'
import Link from 'next/link';

function TopUniversity({ data }) {
  const [colleges, setColleges] = useState<any[]>([]);
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      roleparams['country_id'] = [data?.country_id];
      roleparams['type'] = "university";
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {

    getcolleges();

  }, [getcolleges]);


  function CollegeCard({ college }) {
    // alert(JSON.stringify(college))
    return (
      <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card featuredClgCard hover-card mb-4">
        <div className='card-image'>
          <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={200} height={200} className="card-Image-top" alt="featured-college" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-blue text-truncate">{college.name}</h5>
          <p className="text-truncate">
            <i className='bi bi-geo-alt-fill me-1 text-danger'></i>
            <span className='card-text'>
              {college.address}
            </span>
          </p>
          <div className="d-flex justify-content-between">
            <GlobalEnquiryForm className="applyNowButton btn" />
            <Link href={`/${data.slug}/${college.id}/${college.slug}`} className="btn">View More</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {
        colleges && colleges.length>0? (
          <section className='topUniSec'>
            <div className="container">
              <h2 className='pt-5 pb-3 fw-bold text-center text-blue'>Top Universities to <br className='d-block d-md-none'/> Study in {data?.country?.name}</h2>
            </div>
            <div className='position-relative topUniCardCon container pb-5'>

              <MainCarousel items={colleges.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))} />
            </div>
          </section>
        ):'' 
      }
    </>
  )
}

export default TopUniversity
