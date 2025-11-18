import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'src/configs/axios';
import NewsList from '../newsList';
import SideContactUsForm from 'src/@core/components/popup/SideContactUsForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CustomCarousel from '../CustomCarousel';
import 'react-multi-carousel/lib/styles.css';
const FaqSec = dynamic(() => import('src/@core/components/cutom-faq/index'), { ssr: false });


function OverviewSec({ data }) {
  const [examData, setExamData] = useState<any[]>([]);
  const isMountedRef = useIsMountedRef();
  const [promoban, setPromoban] = useState<any[]>([]);






  const items = [
    { id: 'info', label: 'OVERVIEW', content: data?.overview },
    { id: 'exams', label: 'EXAM DATES', content: data?.exam_dates },
    { id: 'eligibility', label: 'ELIGIBILITY & REGISTRATION', content: data?.eligibility_criteria },
    { id: 'admitcard', label: 'ADMIT CARD', content: data?.admit_card },
    { id: 'examcenters', label: 'EXAM CENTRES', content: data?.exam_centers },
    { id: 'syllabus', label: 'EXAM PATTERN & SYLLABUS', content: data?.syllabus },
    { id: 'results', label: 'RESULT', content: data?.results },
    { id: 'cutoff', label: 'CUTOFF', content: data?.cutoff },
    { id: 'counseling', label: 'COUNSELLING', content: data?.counseling },
    { id: 'prepretiontips', label: 'PREPARATION TIPS', content: data?.prepretion_tips },
    { id: 'acceptcolleges', label: 'ACCEPTING COLLEGES', content: data?.accept_colleges },
    { id: 'gallery', label: 'GALLERY', content: data?.clggallery },
    {
      id: 'faq',
      label: 'FAQ',
      content: data?.examfaqs && data?.examfaqs.length > 0 ? <FaqSec data={data?.examfaqs} /> : null
    },
  ].filter(tab => tab.content && tab.content !== '' && tab.content !== 'null' && tab.content !== '<p>null</p>' && tab.content !== '<p><br></p>'); ''



  const [activeTab, setActiveTab] = useState(items[0]?.id);


  const getPromobanner = useCallback(async () => {
    try {
      const response = await axios.get('api/website/banner/get?promo_banner=All_Exam_page');
      if (isMountedRef.current) {
        setPromoban(response.data?.data);
      }
    } catch (error) {
      console.error('Failed to fetch trending courses:', error);
    }
  }, [isMountedRef]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Determine the day and its suffix
    const day = date.getDate();
    const daySuffix = (n: number) => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const suffix = daySuffix(day);

    // Get the month name and year
    const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const [month, year] = date.toLocaleDateString('en-US', options).split(' ');

    // Return formatted date
    // return `${day}${suffix} ${month} `;
    return `${day}${suffix} ${month} ${year}`;
  }

  const getExams = useCallback(async () => {
    try {
      const roleparams: Record<string, any> = {
        page: 1,
        size: 10000,
      };

      const response = await axios.get('api/website/exams/get', { params: roleparams });

      const currentDate = new Date(); // Get the current date and time

      // Map and format exam data
      const examData = response.data?.data?.map((exam: any) => ({
        id: exam.id,
        title: exam.exam_title,
        slug: exam.slug,
        date: formatDate(exam.upcoming_date), // Format the date here
        upcoming_date: new Date(exam.upcoming_date), // Parse for filtering and sorting
      }));

      // Filter out exams with a date before the current date
      const upcomingExams = examData.filter(exam => exam.upcoming_date >= currentDate);

      // Sort exams by the upcoming_date in ascending order
      const sortedData = upcomingExams.sort(
        (a, b) => a.upcoming_date.getTime() - b.upcoming_date.getTime()
      );



      if (isMountedRef.current) {
        setExamData(sortedData);
      }
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  }, [isMountedRef, setExamData]);


  useEffect(() => {
    getExams();
    getPromobanner();
  }, [getPromobanner, getExams]);



  const PromoAddBanner = ({ url }) => {
    return (
      <section className='bg-skyBlue addBanner rounded'>
        <div className="container py-5">
          <div className="card col-md-12 col-lg-9 col-xl-10 mx-auto p-0">
            <div className="row g-0">
              <div className="col-md-4 addImgClg position-relative">
                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
              </div>
              <div className="col-md-8">
                <div className="card-body" style={{ zIndex: '200' }}>
                  <h5 className="card-text">PES University</h5>
                  <h3 className="card-title fw-bold">B.Tech 2025 - Admissions Open</h3>
                  <Link href='/colleges' className='btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };



  const renderContent = (content) => {
    if (typeof content === 'string') {
      return (
        <div className="row">
          <div className="text-black pt-3">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="text-black pt-3">
          {content}
        </div>
      </div>
    );
  };





  return (
    <section className='clgInfoSec bg-white'>
      <div className="container">
        <div className='carouselInnerCourse position-relative exam' style={{ zIndex: '2' }}>
          <CustomCarousel items={items} setActiveTab={setActiveTab} />


          <div className="row">
            <div className="col-md-8 text-black pt-3">
              <div className="tab-content" id="nav-tabContent">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                    id={`nav-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`nav-${item.id}-tab`}
                  >
                    {renderContent(item.content)}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4 mb-md-5 fixed-column pt-5">
              <div className='bg-skyBlue px-lg-5 px-3  mb-5 rounded'>
                <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
                <SideContactUsForm />
              </div>
              <NewsList newsItems={examData} />
            </div>
          </div>
        </div>
        {/* </div> */}
        {promoban.map((ele, index) => (
          <PromoAddBanner key={index} url={ele.banner_url} />
        ))}
      </div>
    </section>
  );
}

export default OverviewSec;
