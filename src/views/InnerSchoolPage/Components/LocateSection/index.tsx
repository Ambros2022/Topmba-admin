

function LocationSection({ data }) {
  console.log(data.map)
  return (
    <>
      <section className='locationSec bg-white pb-0 pb-md-5 pt-5'>
        <div className="container">
          <h2 className='pt-0 text-center mb-4 text-blue fw-bold'>Locate the School</h2>
          <div className="row px-3">
            <div className="col-md-6 mb-md-0 mb-3 d-flex justify-content-start locatedSec py-5 rounded px-md-5">
              <div className="w-100 card mb-3 bg-lightCard p-3">
                <div className="row rounded g-0 bg-white">
                  <div className="col-lg-4 mx-auto text-center locationClgImg" role="img" aria-label={data?.name}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`}
                      alt={data?.name || "College Logo"}
                      width={100}
                      height={100}
                      loading="lazy"
                      decoding="async"
                      className="clgImg"
                      style={{ objectFit: "contain", display: "block", margin: "0 auto" }}
                    />
                  </div>

                  <div className="col-lg-12 d-flex bg-blue">
                    <div className="card-body align-content-start text-white p-0 mt-2 text-lg-start text-center text-md-center ">
                      <h3 className="card-title fw-bold mb-3 pt-3">{data.name}</h3>
                      <h6 className="card-text mb-0 mt-2 innerTextAddress"><i className='bi bi-geo-alt-fill text-danger me-1 fs-5'></i><span className="mt-2">{data.address}</span></h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className='p-2 bg-blue rounded h-100 w-100'>
                {data.map ? (
                  <iframe
                    src={data.map}
                    width="100%"
                    height="500px"
                    style={{ border: 0 }}
                    // loading="lazy"
                    allowFullScreen
                    className='rounded'
                  ></iframe>
                ) : (
                  ""
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocationSection
