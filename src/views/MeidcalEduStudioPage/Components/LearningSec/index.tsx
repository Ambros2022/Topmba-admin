import Link from 'next/link'
import React from 'react'

const LearningSec = () => {
    return (
        <>
            <section className='bg-white py-5'>
                <div className="container">
                    <h4 className='text-blue fw-bold'>Learning Experience</h4>
                    <h2 className='text-black fw-bold mb-5'>Medical Edu Studio-Changing Lives of Medical Aspirants!</h2>
                    <div className="row d-flex justify-content-center mb-3">
                        <div className="col-lg-4 text-center">
                            <div className="event-img video-wrap">
                                <img src='/images/icons/event-img-5.webp' width={500} height={500} alt='event-img' className='img-fluid' />
                                <div className="video-content">
                                    <Link href="https://www.youtube.com/watch?v=F1OI7LZbm6E" target='blank' className='video-btn'> <i className='bi bi-play-circle-fill'></i></Link>
                                </div>
                                <div className="event-shape-1 rotated">
                                    <img src='/images/icons/event-shape-1.png' className='img-fluid' width={500} height={500} alt='event-img' />
                                </div>
                                <div className="event-shape-2">
                                    <img src='/images/icons/event-shape-2.png' className='img-fluid' width={500} height={500} alt='event-img' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <video src='/videos/Comp.m4v' autoPlay muted loop style={{
                        background: 'white', maxWidth: '500px', margin: '0 auto', padding: '1rem', display: 'block', position: 'relative', width: '100%',
                        height: '100',
                        objectFit: 'cover'
                    }}>
                    </video>
                </div>
            </section >
        </>
    )
}

export default LearningSec