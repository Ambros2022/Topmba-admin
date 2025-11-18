import React from 'react'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      {/* <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container-fluid ">
          <div className="card w-100 mb-3 collegeDetailCard">
            <div className="row g-0">
              <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
                <div className='innerClgImg  mx-0 mx-md-auto mt-md-3'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`}
                    alt={data.name}
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                    className="img-fluid p-2 bg-white rounded"
                  />
                </div>
                {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-flex justify-content-center align-items-center d-md-none col-lg-3 col-xl-3 col-md-10 
                pt-auto pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                  <div className="d-flex gap-2 justify-content-md-end justify-content-start">

                    <i className={`bi bi-star-fill ${data.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>

                    <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                  </div>
                </div>) : ''}
              </div>
              <div className="col-lg-7 ps-xl-5 col-xl-9 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3 mt-3 mt-md-1">{data.name}</h1>
                  <h6 className='mb-3 d-flex '><i className='bi bi-geo-alt-fill text-danger me-1'></i> <span>{data.address}</span></h6>
                  <h6 className='mb-3 d-flex'>
                    <i className="text-warning bi bi-trophy-fill me-1"></i>
                    <strong className='flex-shrink-0'>Approved by :&nbsp;</strong>
                    <div>
                      {
                        data.collegerecognitions && data.collegerecognitions.map((element, index) => {
                          return (
                            <>
                              {index == 0 ? ' ' + element.clgrecognitions.recognition_approval_name : ', ' + element.clgrecognitions.recognition_approval_name}
                            </>
                          )
                        })
                      }
                    </div>
                  </h6>
                  <button className='btn PrivateBtn'>{data.college_type}</button><br />
                </div>
              </div>
              {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-none d-md-block col-lg-3 col-xl-2 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                <div className="d-flex gap-2 justify-content-md-end justify-content-start">

                  <i className={`bi bi-star-fill ${data.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>

                  <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                </div>
              </div>) : ''}



            </div>
            <div className="d-flex justify-content-end flex-md-row flex-column gap-1 gap-md-3 ps-md-0 ps-0 align-items-center">
              <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" />
              <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Fee Structure" />
            </div>
          </div>
        </div>
      </section > */}

      <section className='bg-blue collegeDetailBanner py-1'>
  <div className="container-fluid">
    <div className="card w-100 mb-3 collegeDetailCard">

      {!data ? (
        /* 🔹 Skeleton Loader with same layout */
        <div className="row g-0">
          {/* Left image area */}
          <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
            <div className='innerClgImg mx-0 mx-md-auto mt-md-3'>
              <div className="placeholder-glow">
                <div className="placeholder bg-light rounded" style={{ width: 100, height: 100 }}></div>
              </div>
            </div>
          </div>

          {/* Middle content area */}
          <div className="col-lg-7 ps-xl-5 col-xl-9 col-md-10">
            <div className="card-body text-white">
              <div className="placeholder-glow mb-3">
                <span className="placeholder col-8"></span>
              </div>
              <div className="placeholder-glow mb-3">
                <span className="placeholder col-6"></span>
              </div>
              <div className="placeholder-glow mb-3">
                <span className="placeholder col-10"></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-3"></span>
              </div>
            </div>
          </div>

          {/* Right rating area */}
          <div className="d-none d-md-block col-lg-3 col-xl-2 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
            <div className="placeholder-glow">
              <span className="placeholder col-6"></span>
            </div>
          </div>
        </div>
      ) : (
        /* 🔹 Actual content */
        <>
          <div className="row g-0">
            <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
              <div className='innerClgImg  mx-0 mx-md-auto mt-md-3'>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.logo}`}
                  alt={data.name}
                  width="100"
                  height="100"
                  loading="lazy"
                  decoding="async"
                  className="img-fluid p-2 bg-white rounded"
                />
              </div>
              {data?.avg_rating && data?.avg_rating !== 0 ? (
                <div className=" d-flex justify-content-center align-items-center d-md-none col-lg-3 col-xl-3 col-md-10 
                pt-auto pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                  <div className="d-flex gap-2 justify-content-md-end justify-content-start">
                    <i className={`bi bi-star-fill ${data.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>
                    <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                  </div>
                </div>
              ) : ''}
            </div>

            <div className="col-lg-7 ps-xl-5 col-xl-9 col-md-10">
              <div className="card-body text-white">
                <h1 className="card-title fw-bold mb-3 mt-3 mt-md-1">{data.name}</h1>
                <h6 className='mb-3 d-flex '>
                  <i className='bi bi-geo-alt-fill text-danger me-1'></i> 
                  <span>{data.address}</span>
                </h6>
                <h6 className='mb-3 d-flex'>
                  <i className="text-warning bi bi-trophy-fill me-1"></i>
                  <strong className='flex-shrink-0'>Approved by :&nbsp;</strong>
                  <div>
                    {data.collegerecognitions && data.collegerecognitions.map((element, index) => (
                      <React.Fragment key={index}>
                        {index === 0 
                          ? ' ' + element.clgrecognitions.recognition_approval_name
                          : ', ' + element.clgrecognitions.recognition_approval_name}
                      </React.Fragment>
                    ))}
                  </div>
                </h6>
                <button className='btn PrivateBtn'>{data.college_type}</button><br />
              </div>
            </div>

            {data?.avg_rating && data?.avg_rating !== 0 ? (
              <div className=" d-none d-md-block col-lg-3 col-xl-2 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                <div className="d-flex gap-2 justify-content-md-end justify-content-start">
                  <i className={`bi bi-star-fill ${data.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>
                  <h6 className='mb-0 text-white align-self-center'>{data.avg_rating}/5 Review</h6>
                </div>
              </div>
            ) : ''}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end flex-md-row flex-column gap-1 gap-md-3 ps-md-0 ps-0 align-items-center">
            <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' title="Download Brochure" />
            <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Get Fee Structure" />
          </div>
        </>
      )}
    </div>
  </div>
</section>

    </>
  )
}

export default BannerSection
