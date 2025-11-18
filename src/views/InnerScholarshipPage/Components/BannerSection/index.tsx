import React from 'react'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from 'next/link';


function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}



function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container">

          <div className="w-100 card mb-3 collegeDetailCard text-md-start ">
            <div className="row d-flex">
              <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
                <div className='innerClgImg  mx-0 mx-md-auto'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`}
                    alt={data.name}
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                    className="img-fluid p-2 bg-white rounded"
                  />
                </div>
              </div>
              <div className="col-lg-7 ps-xl-5 col-xl-8 col-md-10">
                <div className="py-md-3 py-2 text-white">
                  <h1 className="card-title fw-bold mb-3">{data.name}: Eligibility, Deadline, Amount</h1>

                  <div className="d-flex flex-column flex-md-row align-items-md-center gap-md-5">
                    <div className="mb-3  d-flex align-items-center">
                      <i className="bi bi-alarm-fill text-warning bi-icon me-2"></i>
                      <span className="fw-bold text-start" style={{ fontSize: '16px' }}>Last Date of Application: <span className='fw-normal text-white'>{formatDate(data.last_date)}</span></span>
                      <span className="ms-2 text-start"></span>
                    </div>

                    <div className="mb-3  d-flex align-items-center">
                      <i className="bi bi-currency-rupee bi-icon text-danger me-2"></i>
                      <span className="fw-bold" style={{ fontSize: '16px' }} >INR</span>
                      <span className="ms-2">{data.amount}</span>
                    </div>
                  </div>


                </div>
              </div>

            </div>
            <div className="text-md-end text-center mt-md-3 mt-0">
              <GlobalEnquiryForm
                buttonText=" Apply Now for Scholarship"
                className="btn btn-success"
              />
            </div>
          </div>
        </div>
      </section >

      <section className='bg-white'>
        <div className='container py-2 linkFontSize'>
          <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><Link href="/scholarships" className='text-black'> Scholarships <i className='bi bi-chevron-right me-2'></i></Link><span className='text-blue'>{data.name}</span>
        </div>



      </section>
    </>
  )
}

export default BannerSection
