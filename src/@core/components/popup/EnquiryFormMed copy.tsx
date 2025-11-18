import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';

const EnquiryFormMed = ({ heading }: { heading: string }) => {
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
        location: Yup.string().required('Location is required').trim(),
        course: Yup.string().required('Course is required').trim(),
        message: Yup.string().trim(),
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
            formData.append('current_url', window.location.href);
            formData.append('message', values.message);
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
        <div className='bg-skyBlue px-3 rounded'>
            <h5 className='fw-bold text-blue text-center pt-3 mb-3'>{heading}</h5>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    contact_number: '',
                    message: '',
                    course: '',
                    location: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                resetForm
            >
                <Form>
                    <div className="mb-3">
                        <Field type="text" name="name" placeholder="Full Name*" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <PhoneInputField name="contact_number" />
                        <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="email" name="email" placeholder="Email ID*" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="text" name="location" placeholder="Location*" className="form-control" />
                        <ErrorMessage name="location" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field type="text" name="course" placeholder="Interested Course*" className="form-control" />
                        <ErrorMessage name="course" component="div" className="error text-danger" />
                    </div>
                    <div className="mb-3">
                        <Field as="textarea" name="message" placeholder="Type your message" className="form-control" />
                        <ErrorMessage name="message" component="div" className="error text-danger" />
                    </div>

                    <div className="text-center pb-3">
                        <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Reserve Now</button>
                    </div>
                </Form>
            </Formik>
        </div>

    );
};

export default EnquiryFormMed;
