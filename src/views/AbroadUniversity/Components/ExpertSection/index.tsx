import dynamic from 'next/dynamic';
import React from 'react';
const ExpertEnquiryForm = dynamic(() => import('src/@core/components/popup/ExpertEnquiryForm'), { ssr: false });

function ExpertSection() {
  return (
    <section className="Expert-bg-skyBlue" id="animation15">
      <div className="container py-5 py-md-5">
        <h3 className="fw-bold text-center text-blue pb-2">Get In Touch With Our Expert Counsellor</h3>
        {/* <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> */}
        <ExpertEnquiryForm />
      </div>
    </section>
  );
}

export default ExpertSection;
