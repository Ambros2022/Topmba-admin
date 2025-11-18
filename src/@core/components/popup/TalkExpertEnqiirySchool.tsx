import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
interface Props {
  page?: any;
  onChanges?: any;
  type?: any;
}

const EnquiryForm: FC<Props> = ({ type, }) => {
  const router = useRouter();

  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').trim(),
    email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
    contact_number: Yup.string()
      .required("Phone Number is required")
      .test(
        "is-valid-contact",
        "Enter valid 10 digits Number",
        function (value) {
          if (!value) return false;
          if (value.startsWith("+91-")) {
            return /^\+91-\d{10}$/.test(value); // Apply strict rule for +91-
          }
          return true; // Accept other formats (other country codes)
        }
      ),
    course: Yup.string().required('Grade is required').trim(),
    location: Yup.string().required('Location is required').trim(),
  });

  const handleSubmit = async (values, { resetForm }) => {

    try {
      toast.loading('Processing');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('contact_number', values.contact_number);
      formData.append('location', values.location);
      formData.append('course_in_mind', values.course);
      formData.append('college_name', values.college_name);
      formData.append('current_url', window.location.href);
      const response = await axios.post('api/website/enquiry', formData);


      if (response.status === 200) {
        toast.dismiss();
        toast.success('Thank you. We will get back to you.');
        resetForm();


        router.push('/thank-you');
      }

    } catch (error) {
      toast.error('try again later!');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        contact_number: '',
        course: '',
        college_name: '',
        location: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      resetForm
    >
      <Form className="container w-75 m-auto">
        <div className='row mb-3'>
          <div className="col-lg-6 col-md-12 mb-3 px-xl-4 px-lg-3 px-md-5">
            <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
            <ErrorMessage name="name" component="div" className="error text-danger" />
          </div>
          <div className="col-lg-6  col-md-12 mb-3 px-xl-4 px-lg-3 px-md-5">
            <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error text-danger" />
          </div>
          <div className=" col-lg-6 col-md-12 mb-3 px-xl-4 px-lg-3 px-md-5">
            <PhoneInputField name="contact_number" />
            {/* <Field type="text" name="phoneNumber" placeholder="Enter Phone Number" className="form-control" /> */}
            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
          </div>

          <div className=" col-lg-6  col-md-12 mb-3 px-xl-4 px-lg-3 px-md-5">
            <Field type="text" name="course" placeholder="Enter Grade" className="form-control" />
            <ErrorMessage name="course" component="div" className="error text-danger" />
          </div>
          <div className=" col-lg-6  col-md-12 mb-3 px-xl-4 px-lg-3 px-md-5">
            <Field type="text" name="college_name" placeholder={type ? type : "College Name"} className="form-control" />
            <ErrorMessage name="college_name" component="div" className="error text-danger" />
          </div>
          {/* <div className=" col-md-3 mb-3">
                        <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                        <ErrorMessage name="location" component="div" className="error text-danger" />
                    </div> */}
        </div>

        <div className="text-center px-xl-4 px-lg-3 px-md-3 px-1">
          <button type="submit" className="btn-success btn">Submit</button>
        </div>

      </Form>
    </Formik>
  );
};

export default EnquiryForm;