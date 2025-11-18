
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <section className='bg-white py-3 medHeader'>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link href='/'>
                            <img src='/images/icons/medicalEdulogo.png' width={200} height={200} alt='medical-logo' className="img-fluid navbar-brand" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex gap-3">
                                <li className="nav-item d-flex">
                                    <img src='/images/icons/24-7.png' width={50} height={50} alt='medical-logo' className="img-fluid navbar-brand align-self-center" />
                                </li>
                                <div className='d-flex flex-xl-row gap-xl-3 flex-lg-column flex-column'>
                                    <li className="nav-item d-flex">
                                        <Link className='d-flex' href='tel:+91 90058 00200'>
                                            <img src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 img-fluid navbar-brand my-auto" /><h6 className='m-0 text-black align-self-center'>+91 90058 00200</h6>
                                        </Link>
                                    </li>
                                    <li className="nav-item d-flex">
                                        <Link className='d-flex' href='tel:+91 90057 00300'>
                                            <img src='/images/icons/whatsapp.png' width={20} height={20} alt='medical-logo' className="me-1 img-fluid navbar-brand my-auto" /><h6 className='m-0 text-black align-self-center'>+91 90057 00300</h6>
                                        </Link>
                                    </li>
                                </div>
                                <li className="nav-item d-flex">
                                    <Link className='d-flex' href='mailto:meds@learntechww.com'>
                                        <img src='/images/icons/gmail.png' width={25} height={25} alt='medical-logo' className="me-1 align-self-center img-fluid navbar-brand my-auto" /><h6 className='m-0 text-black align-self-center'>meds@learntechww.com</h6>
                                    </Link>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <Link href='/'>
                                    <img src='/images/Learntech325.webp' width={250} height={250} alt='learntech-logo' className="marginLogo img-fluid" />
                                </Link>
                            </form>
                        </div>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Header