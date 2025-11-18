import React from 'react'
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry'

const ExpertSec = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container bg-white text-center p-5" style={{ backgroundSize: 'cover', backgroundImage: 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/images/icons/NRI-Quota.webp")', backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>
                    <h2 className='text-white fw-bold mb-3'>Do You Qualify for Admission under the NRI Category?
                    </h2>
                    <p className='text-blue  rounded fw-bold p-3 mb-3' style={{ display: "inline-block", backgroundColor: "white" }}>Connect with our Expert Counsellors to Acquire NRI Quota Seats.</p><br />
                    <GlobalPopupEnquiry className='btn reqBtn' buttonText='Request a Call Back' />
                </div>
            </section>
        </>
    )
}

export default ExpertSec