import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    WhatsappShareButton,
} from 'next-share';
import { RWebShare } from 'react-web-share';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ExpertSec = ({ data }) => {
    const router = useRouter();
    const location = `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`;

    return (
        <>
            <Head>
   

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={data?.meta_title || "Default Title"} />
                <meta property="og:description" content={data?.meta_description || "Default Description"} />
                <meta
                    property="og:image"
                    content={
                        data?.banner_image
                            ? `${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`
                            : "/images/Learntech160.webp"
                    }
                />
                <meta property="og:url" content={location} />
                <meta property="og:site_name" content="LearnTech Blog" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={data?.meta_title || "Default Title"} />
                <meta name="twitter:description" content={data?.meta_description || "Default Description"} />
                <meta
                    name="twitter:image"
                    content={
                        data?.banner_image
                            ? `${process.env.NEXT_PUBLIC_IMG_URL}/${data.banner_image}`
                            : "/images/Learntech160.webp"
                    }
                />
                <meta name="twitter:url" content={location} />
                <meta name="twitter:site" content="@LearnTech" />

                {/* Pinterest */}
                <meta name="pinterest-rich-pin" content="true" />
            </Head>

            <section className="bg-white py-3">
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
        </>
    );
};

export default ExpertSec;
