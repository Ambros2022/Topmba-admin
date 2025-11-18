import React from 'react';

const VideoSec = ({ cards, totalPages, getScholarshipData, setCurrentPage, currentPage }) => {

  // Filter cards to only include those with type "Testimonial_page"
  const filteredCards = cards.filter(card => card.type === 'Testimonial_page');

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getScholarshipData(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      getScholarshipData(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      getScholarshipData(newPage);
    }
  };

  return (
    <section className='bg-skyBlue py-5'>
      <div className="container">
        <div className="row">
          {filteredCards.map((card) => (
            <div key={card.id} className="col-md-6 d-flex mb-4">
              <div className="card p-3 d-flex flex-column flex-fill">
                <div className="row flex-fill">
                  <div className="col-md-6 embedly-responsive d-flex align-items-center">
                    <iframe
                      width="100%"
                      height="auto"
                      src={card.video_url}
                      allowFullScreen
                      className='embedly-embed'
                    ></iframe>
                  </div>
                  <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div className="p-2 flex-fill">
                      <h5 className="text-black fw-bold pt-2">{card.name}</h5>
                      <p className="text-black studentSpeakCardBody overflow-y-auto">{card.designation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row col-md-12 blogCardspage">
          <div className='d-flex justify-content-center'>
            <nav aria-label="Page navigation example">
              <ul className="pagination d-flex gap-3">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                    <span aria-hidden="true">{'<'}</span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNextPage} aria-label="Next">
                    <span aria-hidden="true">{'>'}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSec;
