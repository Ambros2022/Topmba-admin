
import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import dynamic from 'next/dynamic';
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
const CollegeCard = dynamic(() => import('src/@core/components/college-card'), { ssr: false });
function AssociatedClg() {
  const [colleges, setColleges] = useState<any[]>([]);

  //get all banners
  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {};
      roleparams['page'] = 1;
      roleparams['size'] = 10;
      const response = await axios1.get('api/website/colleges/get?is_associated=1', { params: roleparams });

      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log("colleges", colleges)

  useEffect(() => {

    getcolleges();

  }, [getcolleges]);



  return (
    <>
    {colleges && colleges.length>0 ? (
      <section className="FeaturedClgCon bg-skyBlue" id="animation5" data-aos="fade-up">
        <div className="container pt-5 position-relative">
          <h2 className="fw-bold text-blue text-center mb-5">Our Associated Colleges and Universities</h2>
          <MainCarousel items={colleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))} />
          {/* <div className="d-flex justify-content-center pb-5">
            <Link href='/colleges' className='btn viewMoreClgBtn'>View More</Link>
          </div> */}
        </div>
      </section>):''}
    </>
  )
}

export default AssociatedClg

