import React from 'react'

function FaqSec() {
  return (
    <>
      <section className='bg-white faqSec pb-5'>
        <div className="container">
          <h2 className='text-center text-blue fw-bold pt-5 pb-3'>FAQs</h2>
          <div className="row faqImgCon">
            <div className="col-md-6 faqImgSec mb-3 rounded d-flex flex-fill">
              <div className='bg-skyBlue rounded text-center'>
                <img src="/images/icons/FAQ-Banner.webp" className='rounded w-100 h-100 img-fluid px-md-0' style={{ objectFit: 'cover' }} width={500} height={500} alt='faq-img' />
              </div>
            </div>
            <div className="col-md-6 mb-3 rounded ">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header text-white">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      What is the MBBS eligibility criteria?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className='text-black'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      What is the MBBS course duration and fee?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className='text-black'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Name some of the best private colleges in Banagalore?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className='text-black'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      How to get MBBS admission in Bangalore?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className='text-black'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      Which are the top MBBs colleges in Bangalore?
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p className='text-black'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et dolores dolorem aut ut, consequatur repellendus fuga modi numquam repellat officia quasi! Assumenda eveniet deleniti nostrum molestias recusandae laudantium dolorum autem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </>
  )
}

export default FaqSec

