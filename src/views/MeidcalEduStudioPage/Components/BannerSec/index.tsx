import React from 'react';
import EnquiryFormMed from 'src/@core/components/popup/EnquiryFormMed';

const BannerSec = (refview) => {
    console.log("refview",refview);
    return (
        <section className='medSec position-relative'>
            <video src="/videos/bannerMeds.webm" muted autoPlay loop></video>
            <div className="position-absolute h-100 w-100" style={{ top: '0', backgroundColor: "rgb(0,0,0,0.4)" }}>
                <div className="container h-100">
                    <div className="row d-flex h-100">
                        <div className="col-lg-8 col-md-7 col-10 mx-auto align-self-center py-3">
                            <h1 className='text-warning fw-bold text-center mb-3'>
                                Medical <span className='text-white'>Edu Studio</span>
                            </h1>
                            <h5 className="text-white mb-3">
                                Medical Edu Studio is an aid provided by Learntech Group that was commenced to help medical students in India, UAE, Bahrain and plenty more countries.
                            </h5>
                            <h5 className="text-white mb-3">
                                The Medical Edu Studio services include counselling medical aspirants for course selection and assisting them with admission and post-admission care in top colleges around the world. The panel of Educationalists/ Professionals are backed by extensive experience, established connections and many more.
                            </h5>
                            <h5 className="text-white mb-3">
                                Every student will have their career mapped after several rounds of interviews. After which, the experts will help the candidate to choose a direction based on their aptitude.
                            </h5>
                            <h5 className="text-white mb-3">
                                Medical Edu Studio aims to be the helping hand of every medical aspirant!
                            </h5>
                        </div>
                        <div className="col-lg-4 col-md-5 col-10 mx-auto align-self-center bg-skyBlue rounded p-3">
                            <h4 className='fw-bold text-blue text-center mb-3' ref={refview?.refview}></h4>
                            <EnquiryFormMed heading='Grab Your Opportunity!' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSec;
