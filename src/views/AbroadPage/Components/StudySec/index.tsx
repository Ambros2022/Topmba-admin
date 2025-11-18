import React from 'react';
import dynamic from 'next/dynamic';

const AbroadEnquiryForm = dynamic(() => import('src/@core/components/popup/AbroadEnquiryForm'), { ssr: false });

const StudySec = ({ data }) => {


  return (
    <>
      <section className='bg-white studySec'>
        <div className='container pt-3 pb-2'>
          <h2 className='fw-bold text-blue mb-3 text-center text-md-start'>Study In {data?.country?.name}</h2>
          <div className="row pt-3 pb-2">
            <div className="col-md-6 col-lg-7 col-xl-7 text-black order-1 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: data?.info }} />
            </div>
            <div className="col-md-6 col-lg-5 col-xl-5 order-2 order-md-2 mb-md-0 mb-3">
              <AbroadEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudySec;
