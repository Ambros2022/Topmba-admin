// ** React Imports
import React from 'react'

// ** Formik + Yup
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// ** Axios
import axios1 from 'src/configs/axios'

const ContactForm404 = () => {


    const emailRegExp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
        contact_number: Yup.string().required('Phone Number is required'),
        // message: Yup.string().required('Message is required'),
    })

    const handleSubmit = async (values, { resetForm }) => {
        try {

            const response = await axios1.post('api/website/enquiry', values)
            alert('Successfully Submitted')
            console.log('Response:', response.data)
            resetForm()
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return (
        <>
            <h5 className='pb-3 fw-bold text-center text-blue'>Contact Us</h5>
            <Formik
                initialValues={{ name: '', email: '', contact_number: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                resetForm
            >
                <Form>
                    <div className='mb-3'>
                        <Field type='text' name='name' placeholder='Enter Name' className='form-control' />
                        <ErrorMessage name='name' component='div' className='error text-danger' />
                    </div>
                    <div className='mb-3'>
                        <Field type='email' name='email' placeholder='Enter Email' className='form-control' />
                        <ErrorMessage name='email' component='div' className='error text-danger' />
                    </div>
                    <div className='mb-3'>
                        <Field type='text' name='contact_number' placeholder='Enter Phone Number' className='form-control' />
                        <ErrorMessage name='contact_number' component='div' className='error text-danger' />
                    </div>
                    <div className='mb-3'>
                        <Field as='textarea' name='message' placeholder='Enter message' className='form-control' />
                        <ErrorMessage name='message' component='div' className='error text-danger' />
                    </div>
                    <div className='d-grid'>
                        <button type='submit' className='submitBtn btn-xl btn-block btn submitBtn'>
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default ContactForm404