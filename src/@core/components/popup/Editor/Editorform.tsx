import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'src/configs/axios';
import { toast } from 'react-hot-toast'

import PhoneInputField from 'src/@core/components/popup/PhoneInput';
import Link from 'next/link';
interface Props {
    page?: any;
    onChanges?: any;
}
// Add this at the top of the file
const phoneRules: Record<string, RegExp> = {
    "^\\+91-": /^\+91-\d{10}$/,  // India → 10 digits
    "^\\+966-": /^\+966-\d{9}$/, // Saudi Arabia → 9 digits
    "^\\+971-": /^\+971-\d{9}$/, // UAE → 9 digits
    "^\\+974-": /^\+974-\d{8}$/, // Qatar → 8 digits
    "^\\+968-": /^\+968-\d{8}$/, // Oman → 8 digits
    "^\\+965-": /^\+965-\d{8}$/, // Kuwait → 8 digits
    "^\\+973-": /^\+973-\d{8}$/, // Bahrain → 8 digits
    "^\\+977-": /^\+977-\d{10}$/ // Nepal → 10 digits
};

const EnquiryForm: FC<Props> = ({ page, onChanges, }) => {

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').trim(),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
        contact_number: Yup.string()
            .required("Phone Number is required")
            .test("is-valid-contact", "Enter a valid phone number", function (value) {
                if (!value) return false;

                // Iterate through all phone rules
                for (const [prefixPattern, regex] of Object.entries(phoneRules)) {
                    if (new RegExp(prefixPattern).test(value)) {
                        return regex.test(value); // ✅ Valid if it matches the country's rule
                    }
                }

                return false; // ❌ Not matching any supported country
            }),

        course: Yup.string().required('Course is required').trim(),
        location: Yup.string().required('Location is required').trim(),
        terms: Yup.boolean()
            .oneOf([true], "You must accept the terms and conditions"),
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
            const response = await axios.post('api/website/enquiry', formData);


            if (response.status === 200) {
                toast.dismiss();
                toast.success('Thank you. We will get back to you.');
                resetForm();
                onChanges();
                window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/thank-you`;


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
                location: '',
                terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            resetForm
        >
            <Form>
                <div className="mb-3">
                    <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                    <ErrorMessage name="name" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <PhoneInputField name="contact_number" />
                    <ErrorMessage name="contact_number" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="course" placeholder="Enter Course" className="form-control" />
                    <ErrorMessage name="course" component="div" className="error text-danger" />
                </div>
                <div className="mb-3">
                    <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                    <ErrorMessage name="location" component="div" className="error text-danger" />
                </div>
                <div className="mb-3 form-check">
                    <Field type="checkbox" name="terms" className="form-check-input border-black" id="terms" />
                    <label className="form-check-label" htmlFor="terms">
                        By Clicking this, I agree to the <Link href="/terms-and-conditions" >Terms & Conditions</Link>
                    </label>
                    <ErrorMessage name="terms" component="div" className="error text-danger" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">
                        {page && page == "Brochure" ? "Download Brochure" : "Submit"}


                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default EnquiryForm;


// import React, { FC } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'src/configs/axios';
// import { toast } from 'react-hot-toast'

// import PhoneInputField from 'src/@core/components/popup/PhoneInput';
// import Link from 'next/link';
// interface Props {
//     page?: any;
//     onChanges?: any;
// }

// const EnquiryForm: FC<Props> = ({ page, onChanges, }) => {

//     const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().required('Name is required').trim(),
//         email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required').trim(),
//         contact_number: Yup.string()
//             .required("Phone Number is required")
//             .test(
//                 "is-valid-contact",
//                 "Enter valid 10 digits Number",
//                 function (value) {
//                     if (!value) return false;
//                     if (value.startsWith("+91-")) {
//                         return /^\+91-\d{10}$/.test(value); // Apply strict rule for +91-
//                     }
//                     return true;
//                 }
//             ),
//         course: Yup.string().required('Course is required').trim(),
//         location: Yup.string().required('Location is required').trim(),
//         terms: Yup.boolean()
//             .oneOf([true], "You must accept the terms and conditions"),
//     });

//     const handleSubmit = async (values, { resetForm }) => {


//         try {
//             toast.loading('Processing');
//             const formData = new FormData();
//             formData.append('name', values.name);
//             formData.append('email', values.email);
//             formData.append('contact_number', values.contact_number);
//             formData.append('location', values.location);
//             formData.append('course_in_mind', values.course);
//             formData.append('current_url', window.location.href);
//             const response = await axios.post('api/website/enquiry', formData);


//             if (response.status === 200) {
//                 toast.dismiss();
//                 toast.success('Thank you. We will get back to you.');
//                 resetForm();
//                 onChanges();
//                 window.location.href = `${process.env.NEXT_PUBLIC_WEB_URL}/thank-you`;


//             }

//         } catch (error) {
//             toast.error('try again later!');
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <Formik
//             initialValues={{
//                 name: '',
//                 email: '',
//                 contact_number: '',
//                 course: '',
//                 location: '',
//                 terms: false,
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             resetForm
//         >
//             <Form>
//                 <div className="mb-3">
//                     <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
//                     <ErrorMessage name="name" component="div" className="error text-danger" />
//                 </div>
//                 <div className="mb-3">
//                     <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
//                     <ErrorMessage name="email" component="div" className="error text-danger" />
//                 </div>
//                 <div className="mb-3">
//                     <PhoneInputField name="contact_number" />
//                     <ErrorMessage name="contact_number" component="div" className="error text-danger" />
//                 </div>
//                 <div className="mb-3">
//                     <Field type="text" name="course" placeholder="Enter Course" className="form-control" />
//                     <ErrorMessage name="course" component="div" className="error text-danger" />
//                 </div>
//                 <div className="mb-3">
//                     <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
//                     <ErrorMessage name="location" component="div" className="error text-danger" />
//                 </div>
//                 <div className="mb-3 form-check">
//                     <Field type="checkbox" name="terms" className="form-check-input border-black" id="terms" />
//                     <label className="form-check-label" htmlFor="terms">
//                         By Clicking this, I agree to the <Link href="/terms-and-conditions" >Terms & Conditions</Link>
//                     </label>
//                     <ErrorMessage name="terms" component="div" className="error text-danger" />
//                 </div>
//                 <div className="d-grid">
//                     <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">
//                         {page && page == "Brochure" ? "Download Brochure" : "Submit"}


//                     </button>
//                 </div>
//             </Form>
//         </Formik>
//     );
// };

// export default EnquiryForm;