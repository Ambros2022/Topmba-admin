import React from 'react';
import Link from 'next/link';
import ContactPageUsForm from 'src/@core/components/popup/ContactPageUsForm';



const CareerSec = () => {

    return (
        <section className='bg-white py-5 careerLink'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-md-6 mb-md-0 mb-3 section1">
                        <div className='bg-blue p-md-4 p-3 h-100 rounded'>
                            <h2 className="fw-bold text-white">Connect with Our Expert Advisors</h2>
                            <p className='text-white mb-5'>Fill and submit the form to initiate a conversation with our expert advisors, who will promptly reach out to provide insightful guidance and tailored support for your inquiries.
                            </p>
                            <div className="d-flex mb-3">
                                <div className='align-self-center'>
                                    <img src='/images/icons/phoneAbout1R.png' width={30} height={30} alt='phone1' className='img-fluid' />
                                </div>
                                <div>
                                    <h6 className='ms-3 text-white'><Link href='tel:18001208696'>1800-120-8696</Link> (Tollfree)</h6>
                                    <h6 className='ms-3 text-white'>(Monday to Saturday | (9am to 6pm))</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <img src='/images/icons/phoneAbout2.png' className='img-fluid' width={30} height={30} alt='phone2' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href='tel:08022454991'>080-22454991</Link>, <Link href='tel:26631169'>26631169</Link></h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className='faxicon'>
                                    <img src='/images/icons/fax2.svg' className='img-fluid' width={30} height={30} alt='phone3' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href='tel:08022454991'>080-22454991</Link></h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3">
                                <div className=''>
                                    <img src='/images/icons/email-icon.svg' width={30} height={30} alt='email' className='img-fluid icon-white' />
                                </div>
                                <div className='align-self-center'>
                                    <h6 className='ms-3 text-white my-auto'><Link href="mailto:info@learntechww.com">info@learntechww.com</Link></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-6">
                        <div className="bg-skyBlue rounded">
                            <ContactPageUsForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerSec;
