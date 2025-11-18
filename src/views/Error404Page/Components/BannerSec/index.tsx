// ** React Imports
import React from 'react'

// ** Next Importse'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// ** Dynamic Form Component
const ContactForm = dynamic(() => import('./ContactForm404'), { ssr: false })

const BannerSec = () => {
    return (
        <section className='errCon py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 d-flex justify-content-center'>
                        <div className='w-100 text-center'>
                            <h1 className='fw-bold text-blue'>404: The page you are looking for isn't here</h1>
                            <h6>
                                You either tried some shady route or you came here by mistake. Whichever it is, try using the
                                navigation
                            </h6>
                            <div className='pt-4'>
                                <img
                                    src='/images/icons/404-error.jpg'
                                    width='300'
                                    height='300'
                                    alt='error 404 image'
                                    loading='lazy'
                                    decoding='async'
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                            <Link href='/' className='mt-3 btn errBtn mb-3'>
                                BACK TO HOME
                            </Link>
                        </div>
                    </div>
                    <div className='col-md-4 px-md-5 px-5'>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerSec
