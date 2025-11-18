import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import Link from 'next/link';
import dynamic from 'next/dynamic';
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
const CollegeCard = dynamic(() => import('src/@core/components/school-card'), { ssr: false });
function FeaturedCollegeSection() {
  const [colleges, setColleges] = useState<any[]>([]);

  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      const response = await axios1.get('api/website/schools/get', { params: roleparams });

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
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">Top Featured Schools</h2>
        <MainCarousel items={colleges.map(college => (
          <CollegeCard key={college.id} college={college} />
        ))} />
        <div className="d-flex justify-content-center pb-5">
          <Link href='/schools' className='btn viewMoreClgBtn'>View More</Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollegeSection
