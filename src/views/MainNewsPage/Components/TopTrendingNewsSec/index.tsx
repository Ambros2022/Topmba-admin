import React from 'react'
import Carousel3 from 'src/@core/components/carousel3'
import Link from 'next/link';



const TopTrendingNews = ({ newsItems, loading }) => {

    const newsCards = newsItems.map(news => (

        <Link className='text-blue' href={`/news/${news.id}/${news.slug}`}>
        {/* <Link className='text-blue' href={`/news/${news.id}/${encodeURIComponent(news.title)}`}> */}
            <div key={news.id} className="col-8 col-md-10 mx-auto mb-1">
                <div className="card h-100 topNewsImg d-flex flex-fill  hover-card   ">
                    <img
                        src={news.imageUrl}
                        width={400}
                        height={300}
                        // layout="responsive"
                        // quality={75}
                        className="card-img-top"
                        alt={news.title}
                    />
                    <div className="card-body bg-skyBlue">

                        <h6 className="card-title text-blue fw-bold text-truncate">{news.title}</h6>

                        <p className="card-text">{news.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    ));

    return (
        <>
            <section className='topnewsSec bg-white py-5'>
                <div className="container">
                    <h2 className='text-blue fw-bold text-center mb-5'>Trending News</h2>
                    {loading ? (

                        <div className='text-center'> Loading....</div>

                    ) : (
                        <div className='newsCardCarousel position-relative'>
                            <Carousel3 items={newsCards} />
                        </div>

                    )}
                </div>
            </section>
        </>
    )
}

export default TopTrendingNews
