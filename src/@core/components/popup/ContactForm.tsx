import React from 'react'
import SideContactUsForm from './SideContactUsForm';

const ContactForm = ({ heading }) => {

    return (
        <div className='bg-skyBlue px-lg-5 px-3 rounded'>
            <h2 className='fw-bold text-blue text-center pt-3 mb-3'>{heading}</h2>
            <SideContactUsForm />
        </div>
    )
}

export default ContactForm