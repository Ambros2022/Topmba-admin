import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
  return (
    <>
      <section className='TermCon w-100 position-relative'>
        <img src='/images/icons/BannerBG.webp' height={300} width={1400} alt='banner-img' />
        <div className="w-100 position-absolute h-100" style={{ top: '1px' }}>
          <div className="container d-flex justify-content-center h-100">
            <div className="align-content-center text-center">
              <h1 className='text-white fw-bold mb-3'>Privacy Policy</h1>
              <h5 className='text-white'>Stay up-to-date with Top Colleges, Universities, Exam updates.</h5>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-3">
        <div className="container linkFontSize">
          <Link className='text-black' href="/">Home <i className='bi bi-chevron-right me-2'></i></Link><span className="text-blue">Privacy Policy</span>
        </div>
      </section>
    </>
  )
}

export default BannerSec;