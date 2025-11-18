import dynamic from 'next/dynamic';
import Link from 'next/link'
import React from 'react'
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });


function BannerSection({ data }) {

  return (
    <>
      <section className="bg-blue dentalCourseCon py-5  minehightcoursesneew">
        <div className="container h-100 flex-column column-gap-0 d-flex justify-content-center">
          <div className='align-items-center '>
            <h1 className=' fw-bold text-white mb-3'> {data?.name} : Course, Duration, Eligibility, Fees, Admissions, Opportunities
            </h1>
            <div className='text-white  mb-2 row'>
              <h4 className='col-12 mb-3 f20'>Duration : {data.duration}</h4>
              <div className="d-flex">
                <GlobalEnquiryForm className='btn btn-success font-18' />
              </div>
            </div>
            <div className=''>

            </div>
          </div>
        </div>
      </section>
      <section className='py-3 bg-white'>
        <div className='container linkFontSize'>
          <p><Link href={'/'} className="text-black">Home <i className='bi bi-chevron-right'></i></Link>

            <Link href={'/courses'} className="text-black"> Courses  <i className='bi bi-chevron-right'></i></Link>

            <Link href={`/course/${data?.streams?.id}/${data?.streams?.slug}`} className="text-black"> {data.streams.name}  <i className='bi bi-chevron-right'></i></Link>

            <span className="text-blue"> {data.short_name}</span></p>
        </div>
      </section>
    </>
  )
}

export default BannerSection
