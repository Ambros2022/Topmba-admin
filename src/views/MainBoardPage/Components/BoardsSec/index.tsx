import React from 'react';
import Link from 'next/link';

const BoardsSec = ({ boardItems, activeTab, displayCount, setActiveTab, setDisplayCount }) => {

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setDisplayCount(4); // Reset display count when switching tabs
    };

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 4);
    };

    return (
        <>
            <section className='py-md-5 py-3 bg-white browseNews'>
                <div className="container">
                    <div className="row justify-content-center newsTabsClr gap-0 gap-md-3">
                        {['all', 'state', 'national', 'international'].map((tabName) => (
                            <div key={tabName} className="col-6 col-md-auto p-0 d-flex justify-content-center"> {/* col-6 for two per row on mobile, col-md-auto for auto width on larger screens */}
                                <button
                                    className={`btn bg-skyBlue hover-card ${activeTab === tabName ? 'active' : ''} tab-button`}
                                    onClick={() => handleTabClick(tabName)}
                                >
                                    {tabName.charAt(0).toUpperCase() + tabName.slice(1) + ' Boards'}
                                </button>
                            </div>
                        ))}
                    </div>




                    <div className='row mb-3 mt-5'>
                        <div className="col-12">
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade show active`} id={`pills-${activeTab}`} role="tabpanel" aria-labelledby={`pills-${activeTab}-tab`}>
                                    <div className="row">
                                        {boardItems.map((item, index) => (
                                            index < displayCount && (
                                                <div key={item.id} className="d-flex mx-auto col-md-6 mx-md-0 mb-3">
                                                    <div className="card hover-card newsImgSize w-100 bg-skyBlue">

                                                        <div className="card-body">
                                                            <div className="row d-flex">
                                                                <div className="col-lg-4 col-xl-3 align-self-center mb-lg-0 mb-3 d-flex">
                                                                    <div className="innerClgImg text-center align-content-center">
                                                                        <img
                                                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.logo}`}
                                                                            alt={item.name}
                                                                            width="100"
                                                                            height="100"
                                                                            loading="lazy"
                                                                            decoding="async"
                                                                            className="img-fluid p-2 bg-white rounded"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-8 col-xl-6 align-content-center">
                                                                    <h5 className="fw-bold card-title text-blue">{item.name}</h5>
                                                                </div>
                                                                {item?.avg_rating && <div className="col-xl-3 align-content-center">
                                                                    <div className="d-flex justify-content-xl-end gap-2 fs-5 me-2 pt-1">

                                                                        <i className={`bi bi-star-fill ${item.avg_rating >= 1 ? "text-warning" : "text-white"} `}></i>
                                                                        <i className={`bi bi-star-fill ${item.avg_rating >= 2 ? "text-warning" : "text-white"} `}></i>
                                                                        <i className={`bi bi-star-fill ${item.avg_rating >= 3 ? "text-warning" : "text-white"} `}></i>
                                                                        <i className={`bi bi-star-fill ${item.avg_rating >= 4 ? "text-warning" : "text-white"} `}></i>
                                                                        <i className={`bi bi-star-fill ${item.avg_rating >= 5 ? "text-warning" : "text-white"} `}></i>


                                                                    </div>
                                                                </div>}
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12 mt-3">
                                                                    <p className='text-black mb-2'><span className='fw-bold'>Est Year :</span> {item.established}</p>
                                                                    <p className='text-black mb-2'><span className='fw-bold'>Location :</span> {item.address}</p>
                                                                    <p className='text-black'><span className='fw-bold'>Approvals and Recognition :</span>{
                                                                        item.boardrecognitions && item.boardrecognitions.map((element, index) => {
                                                                            return (
                                                                                <>
                                                                                    {index == 0 ? ' ' + element.brdrecognitions.recognition_approval_name : ', ' + element.brdrecognitions.recognition_approval_name}
                                                                                </>
                                                                            )
                                                                        })
                                                                    }</p>
                                                                    <p className='text-black'><span className='fw-bold'>Genders Accepted :</span> {item.gender}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-md-content-end">
                                                                <Link href={`/board/${item.id}/${item.slug}`} className='btn viewMoreCollegeBtn'>View Details</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    {displayCount < boardItems.length && (
                                        <div className="d-flex justify-content-center">
                                            <button className="btn viewMoreCollegeBtn mt-3" onClick={handleLoadMore}>Load More</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BoardsSec;
