import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    WhatsappShareButton,
} from 'next-share'
import { RWebShare } from "react-web-share";
interface Props {
    className?: any;
    title?: any;
    pathname?: any;
    logourl?: any;
}


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="share-this"
        >
            <Modal.Header closeButton className="close"></Modal.Header>
            <Modal.Body >
                <div className="backgroundwhite mt-30">
                    <h4>Share Our Blogs To</h4>
                    <ul className='d-flex justify-content-around pt-3 ' style={{ listStyle: "none" }}>
                        <li>
                            <LinkedinShareButton url={props.pathname}>
                                <button className='btn btn-primary'><i className="bi bi-linkedin"></i></button>
                            </LinkedinShareButton>
                        </li>
                        <li>
                            <TwitterShareButton
                                url={props.pathname}
                                title={props?.meta_title}
                            >
                                <button className='btn btn-dark text-white'><i className="bi bi-twitter-x"></i></button>
                            </TwitterShareButton>
                        </li>
                        <li>
                            <FacebookShareButton
                                url={props.pathname}
                                quote={props?.meta_title}
                                hashtag={props?.meta_title}
                            >
                                <button className='btn btn-primary text-white'><i className="bi bi-facebook"></i> </button>
                            </FacebookShareButton>
                        </li>
                        <li>
                            <PinterestShareButton
                                url={props.pathname}
                                media={props?.meta_title}
                            >
                                <button className='btn btn-danger text-white'><i className="bi bi-pinterest"></i></button>
                            </PinterestShareButton>
                        </li>
                        <li>
                            <WhatsappShareButton
                                url={props.pathname}
                                title={props?.meta_title}

                            >
                                <button className='btn btn-success text-white'> <i className="bi bi-whatsapp"></i></button>
                            </WhatsappShareButton>
                        </li>
                        <li>
                            <RWebShare
                                data={{
                                    text: `${props?.meta_title}`,
                                    url: `${props.pathname}`,
                                    title: `${props?.meta_title}`,
                                }}

                            >
                                <button className='btn btn-dark text-white'><i className="bi bi-share-fill"></i></button>
                            </RWebShare>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const GlobalPopupShare: FC<Props> = ({  title, pathname, logourl }) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>

            <a onClick={() => setModalShow(true)} style={{ cursor: "pointer" }}>
                <span className='share-icon'>
                    <img src='/images/icons/icon-share.png' width={35} height={35} style={{
                        bottom: '20px', right: '20px', backgroundColor: 'rgba(0,0,0,0.5)'
                    }} className='position-absolute img-fluid rounded p-1' alt='share-icon' />
                </span>
            </a>
            <MyVerticallyCenteredModal
                title={title ? title : 'Apply Now'}
                show={modalShow}
                pathname={pathname}
                logourl={logourl}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default GlobalPopupShare;