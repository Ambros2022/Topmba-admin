import React from 'react';
import TALKExpertForm from 'src/@core/components/popup/TalkExpertEnqiirySchool';

function ExpertSection() {
  return (
    <section className='collegeExpertSection bg-blue py-5'>
      <div className="row">
        <div className="col-md-5 d-flex innerCollege bg-blue g-0">
          <div className='container d-flex justify-content-center'>
            <div className='px-2 px-md-0 ps-lg-5 text-white text-spacing align-content-center'>
              <h2 className='fw-bold mb-3'>Choose the Best School for Your Child Today!
              </h2>
              <p>Looking to Finalize Your Choice?
              </p>
              <p>Need Additional Assistance?</p>
              <p>Get Help Finding the Top School for Your Child!</p>
            </div>
          </div>
        </div>
        <div className="col-md-7 bg-blue py-3 g-0">
          <h2 className='fw-bold text-center  text-white pb-2'>Talk to our Expert</h2>
          <TALKExpertForm type={'School Name'}/>
        </div>
      </div>
    </section>
  );
}

export default ExpertSection;
