import Image from "next/image";
import dynamic from 'next/dynamic'; 
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
const SignupForm = dynamic(() => import('src/@core/components/custom-user-auth/SignUpFrom'), { ssr: false });
const SignInForm = dynamic(() => import('src/@core/components/custom-user-auth/SignInForm'), { ssr: false });



const ConditionalModal = ({ showModal, closeModal }) => {
    const router = useRouter();


    useEffect(() => {
        if (localStorage.getItem("UserData")) {
            closeModal();
            router.push("/write-review")


        }
    }, []);

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            //@ts-ignore
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, closeModal]);

    return (
        <>
            {showModal && (
                <div className="modal fadeModal show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                    <div className="modal-dialog position-relative modal-dialog-centered modal-lg modal-md w-sm-form">
                        <div className="modal-content" ref={modalRef}>
                            <h4 className="z-3 position-absolute text-white">Please Sign In to write a review</h4>
                            <div className="row gx-0">
                                <div className="col-md-6 formImgCon d-none d-md-flex justify-content-center formImage px-0 mx-0 py-5">
                                    <div className="align-content-center">
                                        <Image src="/images/icons/form-img.png" width={300} height={200} alt="form-image" />
                                    </div>
                                </div>
                                <div className="col-md-6 signForm">
                                    <div className="text-end pt-3 pe-3">
                                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
    </div>
                                    <div className="d-flex justify-content-center gap-4 pt-2 mb-1" role="tablist">
                                        <a href="#" className="nav-link" id="pills-SignUp-tab" data-bs-toggle="pill" data-bs-target="#pills-SignUp" type="button" role="tab" aria-controls="pills-SignUp" aria-selected="true">Sign Up</a>
                                        <a href="#" className="nav-link active" id="pills-SignIn-tab" data-bs-toggle="pill" data-bs-target="#pills-SignIn" type="button" role="tab" aria-controls="pills-SignIn" aria-selected="false">Log In</a>
                                    </div>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade" id="pills-SignUp" role="tabpanel" aria-labelledby="pills-SignUp-tab">
                                            <SignupForm closeModal={closeModal} />
                                        </div>
                                        <div className="tab-pane fade show active" id="pills-SignIn" role="tabpanel" aria-labelledby="pills-SignIn-tab">
                                            <SignInForm closeModal={closeModal} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConditionalModal; 