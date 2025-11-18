import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
    const handleScrollToCurrentOpening = () => {
        const currentOpeningSection = document.getElementById('currentOpeningSection');
        if (currentOpeningSection) {
            currentOpeningSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <>
            <section className='careerSec' style={{ backgroundImage: 'url(/images/icons/Career_02.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
                <div className="container d-flex justify-content-center align-content-center text-center h-100 flex-column">
                    <h1 className='fw-bold text-white'>WE ARE HIRING</h1>
                    <h5 className='text-white mb-3'>Come join one of the Best Educational Service Provider Firms as rated by ISO 9001:2008 Certified.</h5>
                    <div>
                        <button onClick={handleScrollToCurrentOpening} className='btn currentOpeningBtn'>Current Openings</button>
                    </div>
                </div >
            </section>
            <section className='bg-white'>
                <div className="container linkFontSize py-3">
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>Career</span>
                </div>
            </section>
        </>
    )
}

export default BannerSec