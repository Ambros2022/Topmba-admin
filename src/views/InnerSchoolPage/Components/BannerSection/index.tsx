import React from 'react'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1 clsheight'>
        <div className="container-fluid">
          <div className="card w-100 mb-3 collegeDetailCard">

            <div className="row g-0">
              <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
                <div className='innerClgImg  mx-0 mx-md-auto mt-md-3'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data?.icon}`}
                    alt={data?.name}
                    width="100"
                    height="100"
                    loading="lazy"
                    decoding="async"
                    className="img-fluid p-2 bg-white rounded"
                  />
                </div>
                {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-flex justify-content-center align-items-center d-md-none col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                  <div className="d-flex gap-2 justify-content-md-end justify-content-start">

                    <i className={`bi bi-star-fill ${data?.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data?.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data?.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data?.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                    <i className={`bi bi-star-fill ${data?.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>

                    <h6 className='mb-0 text-white align-self-center'>{data?.avg_rating}/5 Review</h6>
                  </div>
                </div>) : ''}
              </div>
              <div className="col-lg-7 ps-xl-5 col-xl-8 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3 mt-3 mt-md-1">{data?.name}</h1>
                  <h6 className='mb-3 d-flex '><i className='bi bi-geo-alt-fill text-danger me-1'></i> <span>{data?.address}</span></h6>
                  <h6 className='mb-3 location-img'><i className='bi bi-mortarboard-fill text-warning me-2'></i><strong>Board: </strong>

                    {/* {data.schoolboard.short_name} */}

                    {data?.boardschools.map((value) => value?.schbordname?.short_name).join(', ')}

                  </h6>
                  <h6 className='mb-3 location-img d-flex'>
                    <i className='bi bi-award-fill text-primary me-2'></i>
                    <strong className='flex-shrink-0'>School Level:</strong>&nbsp;
                    {data?.schoollevels.map((value) => value?.schlevelname?.name).join(', ')}
                  </h6>
                </div>
              </div>
              {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-none d-md-block col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
                <div className="d-flex gap-2 justify-content-md-end justify-content-start">

                  <i className={`bi bi-star-fill ${data?.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data?.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data?.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data?.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                  <i className={`bi bi-star-fill ${data?.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>

                  <h6 className='mb-0 text-white align-self-center'>{data?.avg_rating}/5 Review</h6>
                </div>
              </div>) : ''}



            </div>
            <div className="d-flex justify-content-center justify-content-md-end flex-md-row flex-wrap gap-1 gap-md-3 ps-md-0 ps-0">
              <GlobalEnquiryForm pagename="Brochure" className='align-content-center btn downloadBtn' placeholder="Class" title="Download Brochure" />
              <GlobalEnquiryForm className='align-content-center btn freeBtn' placeholder="Class" buttonText="Get Fee Structure" />
            </div>

          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection
