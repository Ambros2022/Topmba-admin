import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required').trim(),
    contact: Yup.string().required('Contact Number is required').trim(),
    email: Yup.string().email('Invalid email address').required('Email is required').trim(),
    location: Yup.string().required('Location is required').trim(),
    country: Yup.string().required('Preferred Country is required').trim(),
    college: Yup.string().notRequired().trim(),
    message: Yup.string().notRequired().trim(),
    terms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions"),
});

const MedicalSec = ({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 20000;

    const initialValues = {
        name: '',
        contact: '',
        email: '',
        location: '',
        country: '',
        college: '',
        message: '',
        terms: false,
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('contact_number', values.contact);
            formData.append('email', values.email);
            formData.append('location', values.location);
            formData.append('country', values.country);
            formData.append('college_name', values.college || '');
            formData.append('message', values.message || '');
            formData.append('current_url', window.location.href);
            const response = await axios.post('api/website/enquiry', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                router.push('/thank-you');
            }
        } catch (error) {
            toast.error('Please try again later!');
            console.error('Error submitting form:', error);
        }
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const renderDescription = () => {
        if (!data.top_description) return null;

        if (data.top_description.length <= maxLength || isExpanded) {
            return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
        }

        const truncatedText = data.top_description.slice(0, maxLength) + '...';
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
                <div className='text-center'>
                    <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read More</button>
                </div>
            </>
        );
    };

    return (
        <section className='py-3 bg-white'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-8 col-xl-8 minehightinnercourse">
                        {renderDescription()}
                        {isExpanded && (
                            <div className='text-center'>
                                <button onClick={toggleReadMore} className="btn viewMoreClgBtn">Read Less</button>
                            </div>
                        )}
                    </div>
                    <div className="col-md-5 col-lg-4 col-xl-4 pt-3 pt-md-0">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {() => (
                                <Form className='bg-skyBlue mbbsAbroad rounded p-3'>
                                    <h2 className='text-blue fw-bold text-center mb-3'>Start Your Medical Journey</h2>
                                    <p className='text-black fw-bold text-center mb-3'>Fill This & Help Us Book a Flight for Your Successful Medical Career</p>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='name' placeholder='Full Name*' />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <PhoneInputField name='contact' />
                                        <ErrorMessage name="contact" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="email" className='form-control' name='email' placeholder='Email ID*' />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='location' placeholder='Location*' />
                                        <ErrorMessage name="location" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='country' placeholder='Preferred Country*' />
                                        <ErrorMessage name="country" component="div" className="text-danger" />
                                    </div>
                                    <div className="mb-3">
                                        <Field type="text" className='form-control' name='college' placeholder='Preferred College' />
                                    </div>
                                    <div className="mb-3">
                                        <Field as="textarea" className='form-control' name='message' placeholder='Type your message' />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <Field type="checkbox" name="terms" className="form-check-input border-black" id="terms" />
                                        <label className="form-check-label" htmlFor="terms">
                                            By Clicking this, I agree to the <Link href="/terms-and-conditions" >Terms & Conditions</Link>
                                        </label>
                                        <ErrorMessage name="terms" component="div" className="error text-danger" />
                                    </div>
                                    <div className="mb-3 text-center">
                                        <button type="submit" className='btn submitBtn'>Make me a Doctor!</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicalSec;
