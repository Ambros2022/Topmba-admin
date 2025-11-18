import dynamic from 'next/dynamic';
import React from 'react';
const ExpertEnquiryForm = dynamic(() => import('src/@core/components/popup/ExpertEnquiryForm'), { ssr: false });

function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue innercourse_height" id="animation15">
      <div className="container py-5 py-md-5">
        <h3 className="fw-bold text-center text-blue mb-3">Get In Touch With Our Expert Counsellor</h3>
        <ExpertEnquiryForm placeholder={'Stream'} />
      </div>
    </section>
  );
}

export default ExpertSection;
