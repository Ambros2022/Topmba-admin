import React from 'react'

const JourneySec = () => {
    return (
        <>
            <section className='bg-white pt-0 pt-md-0'>
                <div className="container">
                    <h2 className='fw-bold text-blue text-center mb-3'>
                        The Journey of Learntech Edu Solutions
                    </h2>
                    <p className="text-black mb-5 text-center">
                    </p>
                    <div style={{ margin: 'auto' }} className='bg-blue rounded p-2 journey-video'>
                        <iframe src="https://www.youtube.com/embed/ubcwVybnL4Q?si=osGRhTdono9EcJxK" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='h-100 rounded w-100'></iframe>
                    </div>
                </div>
            </section>
        </>
    )
}

export default JourneySec