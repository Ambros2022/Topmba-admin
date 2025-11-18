import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios1 from 'src/configs/axios';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordForm: React.FC<{ onNext: () => void, setEmail: (email: string) => void, onBackToSignIn: () => void }> = ({ onNext, setEmail, onBackToSignIn }) => {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="container mt-3">
      <h5 className="text-center text-black">Forgot Password</h5>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        })}
        onSubmit={async (values: ForgotPasswordValues, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          let url = 'api/auth/user/forgotPassword';
          const formData = new FormData();
          formData.append('email', values.email);
          try {
            let response = await axios1.post(url, formData);
            if (response.data.status === 1) {
              toast.success(response.data.message);
              setEmail(values.email);
              onNext();
              setSubmitting(false);
              resetForm();
            } else {
              toast.error(response.data.errors[0].msg);
              setSubmitting(false);
            }
          } catch (err: any) {
            console.error(err);
            toast.error(err.errors[0].msg);
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-black">Email address</label>
              <Field type="email" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btnSignUp btn-block">Verify Password</button>
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

export default ForgotPasswordForm;
