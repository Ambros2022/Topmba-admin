import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';

function BannerSection({ data }) {

  return (
    <>
      <section className="bg-blue dentalCourseCon py-5">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className="align-items-center">
            <div className="row px-5 px-md-0 d-flex">
              <div className="align-content-center col-md-2 p-2 col-lg-1 col-6 mx-md-0 mb-md-0 mb-3 mx-auto bg-white rounded d-flex justify-content-center">
                <div className="align-content-center">
                  <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`} width={100} height={100} alt={data.name} />
                </div>
              </div>
              <div className="align-content-center my-auto gap-2 col-md-10 col-lg-11 col-12 flex-column d-flex">
                <div className="align-content-center row ps-lg-3 ps-md-2">
                  <div className="col-12">
                    <h1 className='text-white text-md-start text-center'>{data.name} Courses: Eligibility, Syllabus, Colleges, Admission</h1>
                  </div>
                </div>
                <div className="align-content-center row ps-lg-3 ps-md-2 text-md-start text-center py-2 py-md-0">
                  <div className="col-12">
                    <GlobalEnquiryForm className="btn btn-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container linkFontSize'>
          <p><Link href={'/'} className="text-black">Home <i className='bi bi-chevron-right'></i></Link><Link href={'/courses'} className="text-black"> Courses <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>
            {data.name}
          </span>
          </p>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
