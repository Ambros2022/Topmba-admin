import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
const CollegeCard = dynamic(() => import('src/@core/components/college-card'), { ssr: false });

function FeaturedCollegeSection({ data }) {
  const [colleges, setColleges] = useState<any[]>([]);

  const getcolleges = useCallback(async () => {
    try {
      const roleparams: any = {
        page: 1,
        size: 10,
        type: 'college',
        stream_id: [data?.generalcourse?.stream_id]
      };
      const response = await axios1.get('api/website/colleges/get', { params: roleparams });
      setColleges(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [data?.generalcourse?.stream_id]);

  useEffect(() => {
    getcolleges();
  }, [getcolleges]);

  if (!colleges || colleges.length === 0) {
    return null; // Don't render anything if there are no colleges
  }

  return (
    <section className="FeaturedClgCon bg-white innercourse_height" id="animation5" data-aos="fade-up">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center mb-5">
          Top {data.short_name} Featured Colleges
        </h2>
        <MainCarousel items={colleges.map(college => (
          <CollegeCard key={college.id} college={college} />
        ))} />
        <div className="d-flex justify-content-center pb-5">
          <Link href={{
            pathname: "/colleges",
            // query: { stream_id: data.generalcourse.stream_id }
          }}
            className='btn viewMoreClgBtn'>View More</Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollegeSection
