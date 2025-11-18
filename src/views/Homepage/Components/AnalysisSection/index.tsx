import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
const AnimatedCounter = dynamic(() => import('../AnimatedCounters/animatedCounter'), { ssr: false });
const AnimatedCounter2 = dynamic(() => import('../AnimatedCounters/animatedCounter2'), { ssr: false });
const AnimatedCounter3 = dynamic(() => import('../AnimatedCounters/animatedCounter3'), { ssr: false });


function AnalysisSection() {
  return (
    <div className="Analysis-Section" >
      <div className="container pt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 mb-5 ">
            <div className="row">
              <div className="col-md-3 col-4 text-end ps-2 ps-md-4 d-flex justify-content-end">
                <div style={{ width: 70, height: 70, position: 'relative' }}>
                  <Image
                    src="/images/icons/applications-filled.svg"
                    alt="applications-filled-icon"
                    fill
                    sizes="70px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* <Image src="/images/icons/applications-filled.svg" width={70} height={70} alt="applications-filled-icon" /> */}
              </div>
              <div className="col-md-9 col-8 text-start mt-2 mt-md-0">
                {/* <h4 className="fw-bold" style={{ minHeight: 30 }}><AnimatedCounter /></h4> */}
                <h4
  className="fw-bold"
  style={{
    minHeight: 30,
    minWidth: '8ch', // enough for "500,000+"
    display: 'inline-block'
  }}
>
  <AnimatedCounter />
</h4>
                <h6> Admission Success</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5 ">
            <div className="row">
              <div className="col-md-3  col-4 text-end d-flex justify-content-end">
                <div style={{ width: 70, height: 70, position: 'relative' }}>
                  <Image
                    src="/images/icons/admission-done.svg"
                    alt="applications-filled-icon"
                    fill
                    sizes="70px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* <Image src="/images/icons/admission-done.svg" width={70} height={70} alt="admission-done-icon" /> */}
              </div>
              <div className="col-md-9 col-8 text-start mt-2 mt-md-0">
                <h4 className="fw-bold" style={{ minHeight: 30 }}><AnimatedCounter3 /></h4>

                <h6> Partner Colleges/Universities</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5 ">
            <div className="row">
              <div className="col-md-3 col-4 text-end d-flex justify-content-end">
                <div style={{ width: 70, height: 70, position: 'relative' }}>
                  <Image
                    src="/images/icons/expert-counsellor.svg"
                    alt="applications-filled-icon"
                    fill
                    sizes="70px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* <Image src="/images/icons/expert-counsellor.svg" width={70} height={70} alt="expert-counsellor-icon" /> */}
              </div>
              <div className="col-md-9 col-8 text-start mt-2 mt-md-0">
                <h4 className="fw-bold" style={{ minHeight: 30 }}><AnimatedCounter2 /></h4>
                <h6> Faster Admission Process</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisSection
