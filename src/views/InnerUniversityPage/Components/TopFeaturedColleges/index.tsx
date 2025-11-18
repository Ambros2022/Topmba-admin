import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import Link from 'next/link';
import dynamic from 'next/dynamic';
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
const UniversityCard = dynamic(() => import('src/@core/components/university-card'), { ssr: false });
function FeaturedCollegeSection() {
  const [colleges, setColleges] = useState<any[]>([]);

  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      roleparams['type'] = 'university';
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);



  useEffect(() => {

    getcolleges();

  }, [getcolleges]);



  return (
    <section className="FeaturedClgCon bg-white" id="animation5" data-aos="fade-up">
      <div className="container pt-3 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Top Featured Universities</h2>
        <MainCarousel items={colleges.map(college => (
          <UniversityCard key={college.id} college={college} />
        ))} />
        <div className="d-flex justify-content-center pb-5">
          <Link href='/universities' className='btn viewMoreClgBtn'>View More</Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollegeSection
