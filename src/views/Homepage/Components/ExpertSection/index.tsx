import dynamic from 'next/dynamic';
import React from 'react';
const ExpertEnquiryForm = dynamic(() => import('src/@core/components/popup/ExpertEnquiryForm'), { ssr: false });

function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue" >
      <div className="container py-5 pt-3 py-md-5 ">
        <h2 className="fw-bold text-center text-blue mb-2">Connect with Our Elite Academic Advisors
        </h2>
        <p className="text-black">
          Unlock personalized strategies tailored to your educational goals. Let our experts guide you through every step of your academic journey, ensuring you make informed and impactful decisions.
        </p>
        <ExpertEnquiryForm placeholder={'Stream'} />
      </div>
    </section>
  );
}

export default ExpertSection;
