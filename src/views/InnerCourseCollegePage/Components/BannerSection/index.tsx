import Link from 'next/link';
import React from 'react';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';

function BannerSection({ data }) {
  console.log("ddd", data);
  return (
    <>
      <section className="bg-blue collegeCourseCon py-5 minehightnriquto">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className="align-items-center">
            <div className="row px-5 px-md-0">

              <div className="col-md-12 col-12">
                <div className="row">
                  <div className="col-12">
                    <h1 className='text-white text-center'>{data?.title} Course:  Duration, Eligibility, Fee Structure <br /
                    ><br /><span>{data.college.name}</span></h1>
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12 text-center">
                    <GlobalEnquiryForm className='btn btn-success' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container linkFontSize'>
          <p><Link href={'/'} className="text-black">Home <i className='bi bi-chevron-right'></i></Link><Link href={'/colleges'} className="text-black">Colleges <i className='bi bi-chevron-right'></i></Link> <Link href={`/college/${data.college.id}/${data.college.slug}`} className="text-black">{data.college.name} <i className='bi bi-chevron-right'></i></Link><span className='text-blue'>{data?.course_short_name}</span></p>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
