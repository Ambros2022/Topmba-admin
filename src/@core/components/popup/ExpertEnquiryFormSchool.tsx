import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import PhoneInputField from 'src/@core/components/popup/PhoneInput';

interface Props {
    page?: any;
    onChanges?: any;
}

const EnquiryForm: FC<Props> = ({ }) => {
    const router = useRouter();

    const grades = [
        { label: 'Playgroup', value: 'Playgroup' },
        { label: 'Nursery', value: 'Nursery' },
        { label: 'LKG', value: 'LKG' },
        { label: 'UKG', value: 'UKG' },
        { label: 'Grade 1', value: 'Grade 1' },
        { label: 'Grade 2', value: 'Grade 2' },
        { label: 'Grade 3', value: 'Grade 3' },
        { label: 'Grade 4', value: 'Grade 4' },
        { label: 'Grade 5', value: 'Grade 5' },
        { label: 'Grade 6', value: 'Grade 6' },
        { label: 'Grade 7', value: 'Grade 7' },
        { label: 'Grade 8', value: 'Grade 8' },
        { label: 'Grade 9', value: 'Grade 9' },
        { label: 'Grade 10', value: 'Grade 10' },
        { label: 'Grade 11', value: 'Grade 11' },
        { label: 'Grade 12', value: 'Grade 12' },
    ];

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    });

    const handleSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
        try {
            toast.loading('Processing');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('contact_number', values.contact_number);
            formData.append('location', values.location);
            formData.append('course_in_mind', values.course);
            formData.append('current_url', window.location.href);
            const response = await axios.post('/api/website/enquiry', formData);

            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                router.push('/thank-you');
            } else {
                toast.error('Failed to submit form. Please try again.');
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Error submitting form. Please try again later!');
        }
    };

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                contact_number: '',
                course: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ }) => (
                <Form className="container expertInquirySec">
                    <div className='row mb-3'>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field type="text" name="name" placeholder="Enter Name" className="form-control text-black" />
                            <ErrorMessage name="name" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <PhoneInputField name="contact_number" />
                            <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error text-danger" />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-3 px-xl-4 px-lg-3 px-md-5">
                            <Field as="select" name="course" className="form-control custom-select-bold-arrow"
                            >
                                <option value="">Select Grade</option>
                                {grades.map((item) => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="course" component="div" className="error text-danger" />
                        </div>
                    </div>
                    <div className="text-center px-xl-4 px-lg-3 px-md-3 px-1">
                        <button type="submit" className="btn reqBtn">Request for a Call Back</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EnquiryForm;
