import React, { useCallback, useEffect, useState } from 'react';
import ContactForm from 'src/@core/components/popup/ContactForm';
import axios1 from 'src/configs/axios';
const ScholarshipAbroadSec = ({ data = {} }: { data?: { top_description?: string } }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State for handling read more
  const maxLength = 7700; // Adjust this value to control when "Read More" appears
  const [banners, setBanners] = useState<any[]>([]);

  const getbanner = useCallback(async () => {
    try {
      const roleparams: any = { page: 1, size: 10000 };
      const response = await axios1.get('api/website/banner/get?promo_banner=All_Scholarship_page', { params: roleparams });
      setBanners(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {

    }
  }, []);

  useEffect(() => {
    getbanner();
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (!data.top_description) return null;

    if (data.top_description.length <= maxLength || isExpanded) {
      return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
    }

    const truncatedText = data.top_description.slice(0, maxLength) + '...';
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
        <div className='text-center mb-5'>
          <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read More</button>
        </div>
      </>
    );
  };

  return (
    <>
      <section className='bg-white'>
        <div className="container py-3">
          <h2 className='fw-bold text-blue'>Scholarships in India and Abroad</h2>
          <div className="row pt-2">
            <div className="col-md-8">
              {renderDescription()}
              {isExpanded && (
                <div className='text-center'>
                  <button onClick={toggleReadMore} className="btn viewMoreClgBtn mb-3">Read Less</button>
                </div>
              )}
            </div>
            <div className="col-md-4 pt-0 pt-md-0">
              <ContactForm heading={'Contact Us'} />


              <div className="scholarship-banner pt-3 pt-md-5">
                {banners?.map((banner, index) => (

                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                    // priority={true}
                    alt={`Banner ${index}`}
                    width={420}
                    height={400}
                    className='img-fluid'
                    // layout="responsive" // Allows scaling in mobile

                  />

                ))}
              </div>



            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScholarshipAbroadSec;
