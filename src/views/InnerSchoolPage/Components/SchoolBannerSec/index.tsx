import React from 'react';
import GlobalPopupEnquiry from 'src/@core/components/popup/GlobalPopupEnquiry';


const SchoolBannerSec = ({ data }) => {
    return (
        <>
            <section
                className='py-3 d-flex justify-content-center flex-column'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image})`,
                    backgroundRepeat: 'no-repeat',
                    height: "400px",
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            >
                <h4 className='align-self-center text-center fw-bold p-3 text-white rounded'>Interested in Studying at This School?</h4>
                <h2 className='align-self-center text-center mx-md-0 mx-5 text-white fw-bold p-3 bg-blue rounded'>{data.name}</h2>
                <div className='text-center mt-3'>
                    <GlobalPopupEnquiry className='viewMoreCollegeBtn btn btn-success2' placeholder="Class" />
                </div>
            </section>
        </>
    );
}

export default SchoolBannerSec;
