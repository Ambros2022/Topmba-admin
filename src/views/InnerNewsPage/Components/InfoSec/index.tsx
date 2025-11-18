import React, { useCallback, useEffect, useState } from 'react';
import NewsList from '../newsList';
import axios from 'src/configs/axios';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    WhatsappShareButton,
} from 'next-share';
import { RWebShare } from 'react-web-share';
import { useRouter } from 'next/router';

const InfoSec = ({ data }) => {
    const [newsData, setNewsData] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [loading, setLoading] = useState(true); // State to manage loading status
    console.log(data?.id, "data1");

    // console.log("InfoSec data object:", data);

    const getNews = useCallback(async () => {
        setNewsData([]);
        try {
            const roleparams = { page: 1, size: 10000, orderby: 'Desc', columnname: 'created_at' };
            const response = await axios.get('/api/website/news/get', { params: roleparams });

            const formattedNews = response.data.data
                .filter((item) => item.id !== data?.id) // Exclude news with matching id
                .map((item) => ({
                    imageSrc: `${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`,
                    name: item.name || 'No description available',
                    id: item.id,
                    slug: item.slug,
                }));
            setNewsData(formattedNews);
        } catch (err) {
            console.error('Failed to fetch news:', err);
        }
    }, [data?.id]); // Include data?.id in dependency array

    useEffect(() => {
        getNews();
    }, [getNews]);



    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleIframeLoad = () => {
        setLoading(false); // Hide loader once PDF is loaded
    };
    const handleViewClick = (val: any) => {
        const url = `${process.env.NEXT_PUBLIC_IMG_URL}/${val}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    const router = useRouter();
    const location = `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`;
    return (
        <section className='bg-white'>

            <div className="container innerNewsSec">

                <div className="row pt-3 pt-md-3 pb-0">

                    <div className="col-md-9 mb-3">
                        {/* <h1 className='text-blue fw-bold'>{data.meta_title}</h1>     */}
                        <h1 className='text-blue fw-bold'>{data?.name}</h1>    



                    </div>
                    {data.pdf_file && data.pdf_name && (
                        <div className="col-md-3 pb-3 pb-md-0">
                            <button
                                className="btn applyNowButton align-content-center"
                                onClick={() => handleViewClick(data?.pdf_file)}
                            >
                                {data?.pdf_name ? data?.pdf_name : "View PDF"}
                            </button>
                            {/* <button className="btn applyNowButton align-content-center" onClick={handleOpenModal}>
                                {data?.pdf_name ? data?.pdf_name : "View PDF"}
                            </button> */}


                        </div>
                    )}
                </div>
                <section className="bg-white py-2">
                    <div className="container">
                        <div className="d-flex justify-content-md-start justify-content-center gap-3 flex-wrap mb-3">
                            <LinkedinShareButton url={location}>
                                <button className="btn btn-primary">
                                    <i className="bi me-2 bi-linkedin"></i>Share
                                </button>
                            </LinkedinShareButton>
                            <TwitterShareButton url={location} title={data?.meta_title}>
                                <button className="btn btn-dark me-2 text-white">
                                    <i className="bi me-2 bi-twitter-x"></i>Tweet
                                </button>
                            </TwitterShareButton>
                            <FacebookShareButton url={location} quote={data?.meta_title} hashtag={data?.meta_title}>
                                <button className="btn btn-primary text-white">
                                    <i className="bi me-2 bi-facebook"></i>Share
                                </button>
                            </FacebookShareButton>
                            <PinterestShareButton url={location} media={data?.meta_title}>
                                <button className="btn btn-danger text-white">
                                    <i className="bi me-2 bi-pinterest"></i>Pin
                                </button>
                            </PinterestShareButton>
                            <WhatsappShareButton url={location} title={data?.meta_title}>
                                <button className="btn btn-success text-white">
                                    <i className="bi me-2 bi-whatsapp"></i>Share
                                </button>
                            </WhatsappShareButton>
                            <RWebShare
                                data={{
                                    text: `${data?.meta_title}`,
                                    url: `${location}`,
                                    title: `${data?.meta_title}`,
                                }}
                            >
                                <button className="btn btn-dark text-white">
                                    <i className="bi me-2 bi-share-fill"></i>Share
                                </button>
                            </RWebShare>
                        </div>
                    </div>
                </section>
                <div className='pt-0'>
                    <div className="row">
                        <div className="col-md-8 text-black overflow-auto " style={{ maxWidth: '100%' }}>
                            {/* <p > */}
                                <div  dangerouslySetInnerHTML={{ __html: data.overview }} />
                            {/* </p> */}
                        </div>
                        <div className="col-md-4">
                            <NewsList newsItems={newsData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for PDF preview */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-blue">{data.pdf_name}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                {loading && (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.pdf_file}`}
                                    title={data.pdf_name}
                                    style={{ width: '100%', height: '500px', display: loading ? 'none' : 'block' }}
                                    frameBorder="0"
                                    onLoad={handleIframeLoad}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default InfoSec;
