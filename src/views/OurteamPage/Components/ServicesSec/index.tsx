import React from 'react';
import SideContactUsFormfrom from 'src/@core/components/popup/SideContactUsForm';

const ServicesSec = () => {


    return (
        <>
            <section className='bg-skyBlue py-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-xl-7 col-lg-7">
                            <div className='text-center h-100 d-flex justify-content-start servicesImg'>
                                <img src='/images/icons/ServicePage.webp' className='img-fluid align-self-center' width={700} height={700} alt='services-img' />
                            </div>
                        </div>
                        <div className="col-md-5 col-xl-5 col-lg-5 border rounded px-xl-5 px-lg-4 col-10 mx-md-0 mx-auto">
                            <h2 className='pt-3 mb-3 fw-bold text-blue text-center'>
                                Talk to Our Experts
                            </h2>
                            <SideContactUsFormfrom />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ServicesSec;
