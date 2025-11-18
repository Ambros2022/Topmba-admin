import React from 'react';
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry';

const ExpertSec = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container bg-white text-center p-5" style={{ backgroundSize:'cover',backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/images/icons/mbbs-abroad.png")', backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
                    <h2 className='text-white fw-bold mb-3 rounded'>Are You Eligible for MBBS Abroad?</h2>
                    <p className='text-blue rounded p-2 mb-3' style={{ display: 'inline-block', backgroundColor: 'white' }}>
                        Connect with our experts to avail admission assistance for MBBS Abroad
                    </p><br />
                    <GlobalPopupEnquiry className='btn reqBtn btn-success2' buttonText='Request a Call Back' />
                </div>
            </section>
        </>
    );
};

export default ExpertSec;
