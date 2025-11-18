import Link from 'next/link'
import React from 'react'

const BannerSec = () => {
  return (
    <>
      <section className='TermCon w-100 position-relative'>
        <img src='/images/icons/BannerBG.webp' height={300} width={1400} alt='banner-img' />
        <div className="position-absolute h-100 w-100" style={{ top: '0px' }}>
          <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
              <div className="align-content-center text-center h-100">
                <h1 className='text-white px-md-0 px-0 fw-bold'>Terms and Conditions</h1>
                <h6 className='text-white'>Stay up-to-date with Top Colleges, Universities, Exam updates.</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-2">
        <div className="container linkFontSize">
          <p className=''><Link className='text-black' href="/">Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Terms and Conditions</span></p>
        </div>
      </section>
    </>
  )
}

export default BannerSec;