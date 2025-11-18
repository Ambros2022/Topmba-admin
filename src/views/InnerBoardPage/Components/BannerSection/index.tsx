import React from 'react'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
function BannerSection({ data }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <section className='bg-blue collegeDetailBanner py-1'>
        <div className="container-fluid ">
          <div className="card w-100 mb-3 collegeDetailCard text-md-start ">


            <div className="row g-0">
              <div className="col-lg-2 col-xl-1 text-center col-md-2 d-flex justify-content-between">
                <div className="innerClgImg mx-0 mx-md-auto mt-md-3">
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
                {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-flex justify-content-center align-items-center d-md-none col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
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
              <div className="col-lg-7 ps-xl-5 col-xl-8 col-md-10">
                <div className="card-body text-white">
                  <h1 className="card-title fw-bold mb-3 pt-3 pt-md-0">{data.name}</h1>
                  <h6 className='mb-3 d-flex '><i className='bi bi-geo-alt-fill text-danger me-1'></i> <span>{data.address}</span></h6>
                  <h6 className='mb-3 d-flex'>
                    <><i className="text-warning bi bi-trophy-fill me-1 ">
                    </i> <span ><span className='fw-bold'>Approvals and Recognition</span>:&nbsp;
                        {data.boardrecognitions.length > 0 && data.boardrecognitions[0].brdrecognitions.recognition_approval_name}
                      </span>&nbsp;</>
                  </h6>
                  <div className='d-flex justify-content-md-start  mt-4 gap-md-5 gap-3 flex-wrap'>
                    <h6 className='mb-3 fw-bold'>Est Year:&nbsp;<span className='fw-normal'>{
                      data.established
                    }</span></h6>
                    <h6 className='mb-3 fw-bold'><>Gender Accepted:&nbsp;</><span className='fw-normal'>{
                      data.gender
                    }</span></h6>
                  </div>

                </div>
              </div>
              {data?.avg_rating && data?.avg_rating !== 0 ? (<div className=" d-none d-md-block col-lg-3 col-xl-3 col-md-10 pt-lg-3 ms-md-auto mb-md-3 mb-3 ps-md-3 ps-0">
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
            <div className="d-flex flex-wrap justify-content-md-end justify-content-center flex-md-row  gap-3 ps-md-3 ps-0 ">

              <button className='btn btn-danger resultDateBtn'><><i className="me-2 bi bi-alarm-fill"></i>Result Date : {formatDate(data.result_date)}</></button>
              <GlobalEnquiryForm className='align-content-center btn freeBtn' buttonText="Enquire Now" />
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default BannerSection
