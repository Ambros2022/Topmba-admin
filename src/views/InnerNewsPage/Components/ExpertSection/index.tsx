import React from 'react';
import NewsLetterEnquiry from 'src/@core/components/popup/NewsLetterEnquiry';

function ExpertSection() {
  return (
    <section className="ExpertCon" id="animation15">
      <div className="container py-3 py-md-5">
        <h3 className="fw-bold text-md-start text-center text-blue mb-3">Subscribe to our Newsletter</h3>
        <p className="text-black">Subscribe to our website to stay informed about the latest developments in college admissions, education, and career guidance. Get valuable advice and tips from experienced professionals to help you navigate the college application process with confidence. Discover and explore various scholarship options to help fund your education and achieve your goals. Gain a competitive advantage in the college admissions process. Receive tailored information and guidance based on your interests and needs, ensuring you stay on track and focused throughout your academic journey and much more.</p>
        <NewsLetterEnquiry />
      </div>
    </section>
  );
}

export default ExpertSection;
