import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios1 from 'src/configs/axios';

interface NewPasswordValues {
    password: string;
    confirmPassword: string;
}

const NewPasswordForm: React.FC<{ email: string, otp: string, onBackToSignIn: () => void }> = ({ email, otp, onBackToSignIn }) => {
    return (
        <div className="container mt-3">
            <h5 className="text-center text-black">Set New Password</h5>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').trim(),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required').trim(),
                })}
                onSubmit={async (values: NewPasswordValues, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    let url = 'api/auth/user/newPassword';
                    const formData = new FormData();
                    formData.append('email', email);
                    formData.append('token', otp);
                    formData.append('password', values.password);
                    try {
                        let response = await axios1.post(url, formData);
                        if (response.data.status === 1) {
                            toast.success(response.data.message);
                            onBackToSignIn();
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
                            <label htmlFor="password" className="form-label text-black">New Password</label>
                            <Field type="password" className="form-control" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label text-black">Confirm Password</label>
                            <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </div>
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btnSignUp btn-block">Set New Password</button>
                        </div>
                        <div className="mb-3 text-center">
                            <small className="btn-link text-blue" style={{ cursor: "pointer" }} onClick={onBackToSignIn}>Back to Log In</small>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewPasswordForm;
