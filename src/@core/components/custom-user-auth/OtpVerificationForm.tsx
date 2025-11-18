import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios1 from 'src/configs/axios';

interface OtpVerificationValues {
    otp: string;
}

const OtpVerificationForm: React.FC<{ onNext: () => void, email: string, setOtp: (otp: string) => void, onBack: () => void }> = ({ onNext, email, setOtp, onBack }) => {
    return (
        <div className="container mt-3">
            <h5 className="text-center text-black">Verify OTP</h5>
            <Formik
                initialValues={{
                    otp: '',
                }}
                validationSchema={Yup.object({
                    otp: Yup.string().required('OTP is required').trim(),
                })}
                onSubmit={async (values: OtpVerificationValues, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    let url = 'api/auth/user/forgotPassword/tokenverify';
                    const formData = new FormData();
                    formData.append('email', email);
                    formData.append('token', values.otp);
                    try {
                        let response = await axios1.post(url, formData);
                        if (response.data.status === 1) {
                            setOtp(values.otp);
                            toast.success(response.data.message);
                            onNext();
                            setSubmitting(false);
                            resetForm();
                        } else {
                            toast.error(response.data.message);
                            setSubmitting(false);
                        }
                    } catch (err: any) {
                        console.error(err);
                        toast.error(err.message);
                        setSubmitting(false);
                    }
                }}
            >
                {() => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label text-black">OTP</label>
                            <Field type="text" className="form-control" id="otp" name="otp" />
                            <ErrorMessage name="otp" component="div" className="text-danger" />
                        </div>
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btnSignUp btn-block">Verify OTP</button>
                        </div>
                        <div className="mb-3 text-center">
                            <small className="btn-link text-blue" style={{ cursor: "pointer" }} onClick={onBack}>Back to Forgot Password</small>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default OtpVerificationForm;
