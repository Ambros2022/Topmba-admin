import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import Link from 'next/link';
import dynamic from 'next/dynamic';
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
// const CollegeCard = dynamic(() => import('src/@core/components/college-card'), { ssr: false });
function FeaturedCollegeSection({ data }) {
  const [colleges, setColleges] = useState<any[]>([]);


  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      roleparams['type'] = "university";
      roleparams['country_id'] = [data?.country_id];
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
      <div className="mx-xl-4 mx-lg-2 mx-md-2 mx-5 card featuredClgCard mb-4">
        <div className='card-image'>
          <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${college.banner_image}`} width={200} height={200} className="card-Image-top" alt="featured-college" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-blue text-truncate">{college.name}</h5>
          <p className="text-truncate">
            <i className='bi bi-geo-alt-fill text-danger fs-5 me-1'></i>
            <span className='card-text'>{college.address}</span>
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
      {colleges && colleges.length > 0 ? (
        <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
          <div className="container pt-5 position-relative">
            <h2 className="fw-bold text-blue text-center mb-5">Top Universities to Study in {data?.country?.name}</h2>
            <MainCarousel items={colleges.map(college => (
              <CollegeCard key={college.id} college={college} />
            ))} />
            {/* <div className="d-flex justify-content-center pb-5">
          <Link href='/colleges' className='btn viewMoreClgBtn'>View More</Link>
          </div> */}
          </div>
        </section>
      ) : ''}

    </>
  )
}

export default FeaturedCollegeSection
