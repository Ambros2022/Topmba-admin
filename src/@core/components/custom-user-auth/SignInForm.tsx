import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios1 from 'src/configs/axios';
import router from 'next/router';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpVerificationForm from './OtpVerificationForm';
import NewPasswordForm from './NewPasswordForm';




interface FormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleBackToSignIn = () => {
    setEmail('');
    setOtp('');
    setIsForgotPassword(false);
    setIsOtpVerification(false);
    setIsNewPassword(false);
  };

  const handleOtpVerificationNext = () => {
    setIsForgotPassword(false);
    setIsOtpVerification(true);
  };

  const handleNewPasswordNext = () => {
    setIsOtpVerification(false);
    setIsNewPassword(true);
  };


  return (
    <>
      <div className="container mt-3">
        {isForgotPassword ? (
          <ForgotPasswordForm onNext={handleOtpVerificationNext} setEmail={setEmail} onBackToSignIn={handleBackToSignIn} />
        ) : isOtpVerification ? (
          <OtpVerificationForm onNext={handleNewPasswordNext} email={email} setOtp={setOtp} onBack={handleForgotPasswordClick} />
        ) : isNewPassword ? (
          <NewPasswordForm email={email} otp={otp} onBackToSignIn={handleBackToSignIn} />
        ) : (
          <>
            <h5 className="text-center text-black">Welcome back!</h5>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
                password: Yup.string().required('Password is Required').trim(),
              })}
              onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const url = 'api/auth/user/signin';
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('password', values.password);
                try {
                  const response = await axios1.post(url, formData);
                  if (response.data.status === 1) {
                    localStorage.setItem("UserData", JSON.stringify(response.data.data));
                    window.dispatchEvent(new Event("storage"));
                    toast.success(response.data.message);
                    setSubmitting(false);
                    resetForm();
                    router.push('/write-review');
                    closeModal();
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
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-black">Email address</label>
                    <Field type="email" className="form-control" id="email" name="email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-black">Password</label>
                    <div className="input-group passwordInput">
                      <Field type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" />
                      <button
                        className="btn eyeBtn"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} style={{ color: "#254692" }}></i>
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 text-center">
                    <small className="btn-link text-blue" style={{ cursor: "pointer" }} onClick={handleForgotPasswordClick}>Forgot Password?</small>
                  </div>
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btnSignUp btn-block">Log In</button>
                  </div>
                </Form>
              )}
            </Formik>

          </>
        )}
      </div>
    </>
  );
};

export default SignInForm;
