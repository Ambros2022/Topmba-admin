import Link from 'next/link';
import React from 'react';
import NewsCarousel from 'src/views/Homepage/Components/NewsCarousel';

import { format } from 'date-fns';
const LatestUpdateSec = ({ updates }) => {




    return (
        <section className='bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue text-center'>
                    Latest Updates on Boards
                </h2>
                <div className='py-3 position-relative boardCarosuel'>
  
                    <div className="card-con pt-5 card-board">
                        <NewsCarousel items={updates.map((item) => (
                            <div className="col-12 mb-1" style={{ margin: '0px 5px' }} key={item.id}>
                                <Link href={`/news/${item.id}/${item.slug}`}>
                                    <div className="newsBlosCards">
                                        <div className="mb-5 mx-lg-3 mx-0">
                                            <div className="card h-100 hover-card" style={{ background: 'url(/images/icons/Card.webp)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                                <div className="card-body newsheight">
                                                    <h5 className="card-title fw-bold text-blue text-truncate">{item.name}</h5>
                                                    <h6 className="card-subtitle py-2 mb-2 text-body-secondary">
                                                        {item.created_at ? format(new Date(item.created_at), 'dd-MMM-yyyy') : 'No Date Available'}
                                                    </h6>
                                                    <div className="row mb-3">
                                                        <div className="col-xl-8">
                                                            <p className="card-text">{item.meta_description}</p>
                                                        </div>
                                                    </div>
                                                    <Link href={`/news/${item.id}/${item.slug}`} className="btn viewDetailBtn">
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LatestUpdateSec;
