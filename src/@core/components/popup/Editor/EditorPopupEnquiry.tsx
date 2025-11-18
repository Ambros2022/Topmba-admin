import React, { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import EnquiryForm from 'src/@core/components/popup/Editor/Editorform';


interface Props {
    className?: any;
    title?: any;
    pagename?: any;
    buttonText?: any;

}



const GlobalPopupEnquiry: FC<Props> = ({ className, title, pagename, buttonText, }) => {
    const [modalShow, setModalShow] = React.useState(false);
    function onChanges() {

        setModalShow(false);
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal className="modal fade px-3" id="exampleModal"  {...props} >
                <div className="modal-content">
                    <div className="searchForm">
                        <h5 className="pb-3 fw-bold text-center text-blue">{props.title}</h5>
                        <EnquiryForm onChanges={onChanges} page={props.pagename} />
                    </div>
                </div>
            </Modal>

        );
    }

    return (
        <>

            <a onClick={() => setModalShow(true)} className={className ? className : 'applyNowButton btn'} style={{ cursor: 'pointer' }}>
                {buttonText ? buttonText : 'Apply Now'}
            </a>

            <MyVerticallyCenteredModal
                title={title ? title : 'Let’s build a better future for you'}
                pagename={pagename ? pagename : 'no'}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default GlobalPopupEnquiry;