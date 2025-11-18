import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import toast from 'react-hot-toast'
import Link from 'next/link';
import axios1 from 'src/configs/axios'
import router from 'next/router';

interface FormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const SignupForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegExp = /^(91\d{10}|(?!91)\d{3,})$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-3">
      <h5 className="text-center text-black">Create new account</h5>
      <Formik
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          agree: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required').trim(),
          email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
          mobile: Yup.string().matches(phoneRegExp, 'Phone is not valid').required('Required').trim(),
          password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters').trim(),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required').trim(),
          agree: Yup.boolean().oneOf([true], 'Must agree to terms and conditions').required('Required'),
        })}
        onSubmit={async (values: FormValues, { setSubmitting, resetForm }) => {


          setSubmitting(true);
          let url = 'api/auth/user/signup';
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('mobile', values.mobile);
          formData.append('password', values.password);
          formData.append('confirmpassword', values.confirmPassword);
          try {
            let response = await axios1.post(url, formData)
            console.log(response, "response")

            if (response.data.status == 1) {
              localStorage.setItem("UserData", JSON.stringify(response.data.data));
              toast.success(response.data.message)
              setSubmitting(false);
              resetForm();
              router.push('/write-review');
              closeModal();
            }
            else {

              toast.error(response.data.message)
              setSubmitting(false);

            }
          } catch (err: any) {
            console.error(err);
            toast.error(err.message)
            setSubmitting(false);


          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-black">Name</label>
              <Field type="text" className="form-control" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-black">Email address</label>
              <Field type="email" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-black">Phone</label>
              <PhoneInput
                country={'in'}
                value={values.mobile}
                onChange={(value) => setFieldValue('mobile', value)}
                inputProps={{
                  name: 'mobile',
                  id: 'mobile',
                  className: 'form-control',
                  placeholder: '',
                }}
              />
              <ErrorMessage name="mobile" component="div" className="text-danger" />
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-black">Confirm Password</label>
              <div className="input-group passwordInput">
                <Field type={showConfirmPassword ? 'text' : 'password'} className="form-control" id="confirmPassword" name="confirmPassword" />
                <button
                  className="btn eyeBtn"
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'} style={{ color: "#254692" }}></i>
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <div className="mb-3 form-check">
              <Field type="checkbox" className="form-check-input" id="agree" name="agree" />
              <label className="form-check-label text-black" htmlFor="agree">By signing up, you will agree to our
                <Link href="/terms-and-conditions"><span className='text-blue fw-bold'> Terms, Data Policy </span></Link> and <span className='text-blue fw-bold'> Cookies Policy.</span></label>

              <ErrorMessage name="agree" component="div" className="text-danger" />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btnSignUp btn-block">Sign Up</button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="d-flex justify-content-between mb-3 flex-wrap">

      </div>

    </div >
  );
};

export default SignupForm;
