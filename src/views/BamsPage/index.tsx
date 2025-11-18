'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
const backgroundImageUrl = '/images/bams/Home-Banner.webp';
const whyimg1 = '/images/bams/whyimg1.webp';
const whyimg2 = '/images/bams/whyimg2.webp';
const whyimg3 = '/images/bams/whyimg3.webp';
const whyimg4 = '/images/bams/whyimg4.webp';
const AACCC = '/images/bams/AACCC.webp'
const KEA = '/images/bams/KEA.webp'
import Modal from 'react-bootstrap/Modal';
const Amrutha = '/images/bams/Amrutha.webp'
const Ashwini = '/images/bams/Ashwini.webp'
const Atreya = '/images/bams/Atreya.webp'
const JSS = '/images/bams/JSS.webp'
const Kankanawadi = '/images/bams/Kankanawadi.webp'
const Indian = '/images/bams/old-Indian.webp'
const SDM = '/images/bams/SDM.webp'
const Sharada = '/images/bams/Sharada.webp'
const Shri = '/images/bams/Shri.webp'
const Sri = '/images/bams/Sri.webp'
const Sushrutha = '/images/bams/Sushrutha.webp'
const Yenepoya = '/images/bams/Yenepoya.webp'
const contactbanner = '/images/bams/contactbanner.webp';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Field, Form, Formik } from 'formik';
// ErrorMessage, 
import { toast } from 'react-hot-toast';
import axios from 'src/configs/axios';




// dqfqwfqw
const whatsappc = '/images/bams/whatsappc.gif';
// const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });
const BamsPage = () => {
    // useEffect(() => {
    //     import('bootstrap/dist/js/bootstrap.bundle.min.js');
    // }, []);

    // useEffect(() => {
    //     import('bootstrap/dist/js/bootstrap.bundle.min.js');
    // }, []);
    const router = useRouter();


    const initialValues = {
        name: '',
        email: '',
        contact: '',
        neetrank: '',
        location: '',
        description: '',
    };

   

    const handleSubmit = async (values, { resetForm }) => {
    try {
        toast.loading('Processing');

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('contact_number', values.contact); 
        formData.append('location', values.location);
        formData.append('neetrank', values.neetrank);
        formData.append('current_url', window.location.href); 
        formData.append('description', values.description);
          formData.append('SourceCampaign', 'BAMS Counselling 2025-26'); 

        const response = await axios.post('api/website/landingpage/enquiry', formData);

        if (response.status === 200) {
            toast.dismiss();
            toast.success('Thank you. We will get back to you.');
            resetForm();
            router.push('/thank-you');
        }
    } catch (error) {
        toast.dismiss();
        toast.error('Try again later!');
        console.error('Error submitting form:', error);
    }
};

    const scheduleData = [
        {
            process: "Registration",
            round1: "Aug 28 - Sept 3, 2024\n(Till 5:00 PM)",
            round2: "Sept 18 - Sept 23, 2024\n(Till 2:00 PM)",
            round3: "Oct 9 - Oct 14, 2024\n(Till 2:00 PM)",
            stray: "Oct 28 - Oct 31, 2024\n(Till 2:00 PM)",
        },
        {
            process: "Payment",
            round1: "Aug 28 -Sept 3, 2024\n(Till 8:00 PM)",
            round2: "Sept 18 - Sept 23, 2024\n(Till 5:00 PM)",
            round3: "Oct 9 - Oct 14, 2024\n(Till 5:00 PM)",
            stray: "Oct 28 - Oct 31, 2024\n(Till 5:00 PM)",
        },
        {
            process: "Choice-Filling",
            round1: "Aug 29 - Sept 3, 2024\n(Till 11:55 PM)",
            round2: "Sept 19 - Sept 23, 2024\n(Till 11:55 PM)",
            round3: "Oct 10 - Oct 14, 2024\n(Till 11:55 PM)",
            stray: "Oct 29 - Oct 31, 2024\n(Till 11:55 PM)",
        },
        {
            process: "Choice-Locking",
            round1: "Sept 3, 2024\n(6:00 PM to 11:55 PM)",
            round2: "Sept 23, 2024\n(2:00 PM to 11:55 PM)",
            round3: "Oct 14, 2024\n(2:00 PM to 11:55 PM)",
            stray: "Oct 31, 2024\n(2:00 PM to 11:55 PM)",
        },
        {
            process: "Seat Allotment Processing",
            round1: "Sept 4, 2024",
            round2: "Sept 24 - Sept 25, 2024",
            round3: "Oct 15 - Oct 16, 2024",
            stray: "November 1, 2024",
        },
        {
            process: "Result",
            // round1: "**September 5, 2024**",

            round1: "<strong>September 5, 2024</strong>",
            round2: "<strong>September 26, 2024</strong>",
            round3: "<strong>October 17, 2024</strong>",
            stray: "<strong>November 2, 2024</strong>",

            // round1: "<strong>September 5, 2024</strong>",
            // round2: "**September 26, 2024**",
            // round3: "**October 17, 2024**",
            // stray: "**November 2, 2024**",
        },
        {
            process: "Reporting",
            round1: "Sept 6 - Sept 11, 2024",
            round2: "Sept 27 - Oct 3, 2024",
            round3: "Oct 18 - Oct 22, 2024",
            stray: "Nov 3 - Nov 7, 2024",
        },
        {
            process: "Candidates' Data Verification by Institutes",
            round1: "Sept 12 - Sept 13, 2024",
            round2: "Oct 4 - Oct 5, 2024",
            round3: "Oct 23 - Oct 24, 2024",
            stray: "Nov 8 - Nov 9, 2024",
        },
    ];
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    
    const navigate = (id, offset = 0) => {
        const elementToView = document.getElementById(id);
        if (elementToView) {
            const offsetTop = elementToView.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - offset,
                behavior: "smooth"
            });
         
        } else {
            console.error("Element not found:", id);
        }
    };


    const closeNavbar = () => {
        const navbar = document.getElementById('navbarNav');
        if (navbar && navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        }
    };
    useEffect(() => {
        const img = new window.Image();
        img.src = backgroundImageUrl;
    }, [backgroundImageUrl]);
    return (


        <section className='bams-main '>
            <Head>
                <title> BAMS Counselling 2025-26: Complete Guide for India & Karnataka
                </title>
                <meta
                    name="description"
                    content=" Know all about the BAMS Counselling 2025-26 Process in India & Karnataka: BAMS Counselling Schedule, Required Documents, Top BAMS Colleges, and More. Apply Now!
"
                />
                {/* <link rel="stylesheet" href="/css/bamslandingpage.css" /> */}
                 <link rel="canonical" href="https://learntechww.com/bams-counselling-process " />
            </Head>

            <div className="text-md-start">

                <a href="tel:09036020076" className="phone-iconphone">

                    <Image src="/images/icons/Phone-blue.svg" width={40} height={28} alt="phone-iconphone" className="red-filter" />
                </a>
            </div>


            <a
                href="https://wa.me/+919036020076"
                style={{
                    position: 'fixed',
                    width: 63,
                    height: 64,
                    bottom: 8,
                    right: 8,
                    borderRadius: 50,
                    textAlign: 'center',
                    fontSize: 44,
                    zIndex: 1059,
                }}
                target="_blank "
            >
                <img src={whatsappc} alt="whtsplogo" style={{ width: '66px' }}></img>
            </a>




















            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top py-md-5  " style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                backgroundColor: '#fff',
                zIndex: 1000,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
                <div className="container-fluid navbar-bams-top navbarmobilebams">
                    <Link className="navbar-brand d-flex align-items-center p-md-5" href="/">
                        <Image src="/images/bams/logo.webp" alt="Logo" width={209} height={58} priority />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse justify-content-end bamsnavbar" id="navbarNav">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => {
                                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); closeNavbar();
                            }}>Home</a></li>
                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => { navigate('whyus', 80); closeNavbar(); }}>Why Us?</a></li>


                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => { navigate('counceling', 80); closeNavbar(); }}>BAMS Counselling</a></li>
                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => { navigate('predictor', 100); closeNavbar(); }}>NEET Rank Predictor</a></li>
                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => { navigate('topcollege', 100); closeNavbar(); }}>Top Colleges</a></li>


                            {/* <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => {
                                document.getElementById('#')?.scrollIntoView({ behavior: 'smooth' }); closeNavbar();
                            }}>FAQs</a></li> */}
                            <li className="nav-item   bams-navbar-tag"><a className="nav-link" onClick={() => {
                                document.getElementById('contactus')?.scrollIntoView({ behavior: 'smooth' }); closeNavbar();
                            }}>Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </nav>


            <section
                className="d-flex align-items-center pb-0 px-0"
                id="home"
            >
                <div
                    className="container-fluid bamsimage"
                    id="home"
                    style={{
                        background: `linear-gradient(341deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)), url(${backgroundImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div
                        className="container-fluid aos-init aos-animate p-md-2 p-4"
                        data-aos="zoom-out"
                        data-aos-delay={100}
                    >
                        <div className="row  gap-md-0 gap-4 margin-top-home-banner bams-home-padding mt-md-5 mt-0">
                            <div className="col-xl-7 col-lg-7 col-md-7 text-center pt-4 pt-md-0">
                                <div className="bgblacksvyasa slide-in px-md-0 px-2 mt-5 mt-md-0">
                                    <h1 className="text-center h1svyasa pt-4 pt-md-5">
                                        Navigate through the NEET-UG 2025 BAMS Counselling Process
                                    </h1>
                                    <h2 className="text-center bams-blue pt-4 blinking-text pb-md-0 pb-2">
                                        Begin Your Journey in Ayurvedic Medicine Today!
                                    </h2>


                                    <p className="bams-phomepage pt-md-4">
                                        Get into the Best Ayurvedic Colleges in Karnataka and Other Indian States through the NEET All-India Counselling and the KEA Counselling with the Help of Expert Counsellors.
                                    </p>
                                    <div className="form-group text-center mt-md-4 pb-md-4 mt-4 pb-3">
                                        <button onClick={handleShow}
                                            className="btn btn-success btn-bds-add-svyasa-apply color-btn-add-apply p-3 px-4 mb-md-0 mb-3"
                                        >
                                            Talk to an Expert Now!

                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-5 col-lg-5 col-md-5">
                                <div className="form-boxamb p-md-4 slide-in2 ">
                                    <h3
                                        className="f700 pb-2 bams-font20"
                                        style={{ color: 'white', textAlign: 'center' }}
                                    >
                                        
                                        Fill Out the Form to Get Assistance in Securing Your BAMS Seat for
                                        A.Y. 2025-26

                                    </h3>

                                 
                                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                        {() => (
                                            <Form>
                                                <div className="form-group mb-3">
                                                    <Field
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        placeholder="Name"
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Field
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Your Email"
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Field
                                                        type="number"
                                                        id="contact"
                                                        name="contact"
                                                        placeholder="Contact No."
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Field
                                                        type="number"
                                                        id="neetrank"
                                                        name="neetrank"
                                                        placeholder="NEET Score"
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Field
                                                        as="select"
                                                        id="location"
                                                        name="location"
                                                        required
                                                        className="browser-default custom-select form-control white-bg-black-text"
                                                    >
                                                        <option value="">State</option>
                                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                        <option value="Assam">Assam</option>
                                                        <option value="Bihar">Bihar</option>
                                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                                        <option value="Goa">Goa</option>
                                                        <option value="Gujarat">Gujarat</option>
                                                        <option value="Haryana">Haryana</option>
                                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                                        <option value="Jharkhand">Jharkhand</option>
                                                        <option value="Karnataka">Karnataka</option>
                                                        <option value="Kerala">Kerala</option>
                                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                        <option value="Maharashtra">Maharashtra</option>
                                                        <option value="Manipur">Manipur</option>
                                                        <option value="Meghalaya">Meghalaya</option>
                                                        <option value="Mizoram">Mizoram</option>
                                                        <option value="Nagaland">Nagaland</option>
                                                        <option value="Odisha">Odisha</option>
                                                        <option value="Punjab">Punjab</option>
                                                        <option value="Rajasthan">Rajasthan</option>
                                                        <option value="Sikkim">Sikkim</option>
                                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                                        <option value="Tripura">Tripura</option>
                                                        <option value="Telangana">Telangana</option>
                                                        <option value="Uttarakhand">Uttarakhand</option>
                                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        <option value="West Bengal">West Bengal</option>
                                                        <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                                                        <option value="Chandigarh">Chandigarh</option>
                                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                                        <option value="Daman & Diu">Daman & Diu</option>
                                                        <option value="Delhi">Delhi</option>
                                                        <option value="Lakshadweep">Lakshadweep</option>
                                                        <option value="Puducherry">Puducherry</option>
                                                    </Field>
                                                </div>

                                                <div className="form-group mb-3">
                                                    <Field
                                                        as="textarea"
                                                        id="description"
                                                        name="description"
                                                        placeholder="Message (Optional)"
                                                        className="form-control"
                                                        rows={3}
                                                    />
                                                </div>

                                                <div className="form-group text-center">
                                                    <button
                                                        type="submit"
                                                        id="about"
                                                        name="submit"
                                                        className="btn btn-success btn-bds-add-svyasa-apply color-btn-add-apply p-3 px-5"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section>
                <div className="col-lg-12 text-center  pb-3 bg-white" id='whyus'>
                    <h3 className="f3mount-svayauni pt-md-2 pt-4 mt-md-4 mb-md-4">
                        Why Us?
                    </h3>
                </div>

                <section className="why-us-section  text-white">


                    <div className="container">

                        <div className="row text-center">
                            {[
                                {
                                    title: "Team of Experts",
                                    desc: "Our team of qualified experts with decades of experience in the All-India BAMS Counselling and the BAMS state Counselling processes help students navigate their dreams with ease.",
                                    icon: whyimg1,
                                },
                                {
                                    title: "Personalised Sessions",
                                    desc: "Aspirants get 1-1 admission guidance, enabling them to smoothly glide through the complicated NEET BAMS Counselling process. Sessions are customised as per the student’s rank, preferences and budget.",


                                    icon: whyimg2,
                                },
                                {
                                    title: "No-Time Wasted",
                                    desc: "Preparations for the All India Medical Counselling/ Karnataka BAMS Counselling can be time-consuming. This is where the insight of our experts comes into play, as they can help in preparing you for the counselling process within a short period.",
                                    icon: whyimg3,
                                },
                                {
                                    title: "Post-Admission Support",
                                    desc: "The experts will continue to assist you with activities even after seat allotment.This includes help with document collection, college reporting, and ensuring a smooth transition to campus life.",
                                    icon: whyimg4,
                                },
                            ].map((item, i) => (
                                <div key={i} className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="why-us-card p-4 h-100 text-center">
                                        <div
                                            className="icon-wrapper mb-3"
                                            style={{
                                                backgroundImage: `url(${item.icon})`,
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                width: '60px',
                                                height: '60px',
                                                margin: '0 auto',
                                            }}
                                        ></div>
                                        <h5 className="fw-bold">{item.title}</h5>
                                        <p className="small">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </section>




            <section id='counceling'>
                <div className="col-lg-12 text-center  pb-3 bg-white">
                    <h3 className="f3mount-svayauni pt-md-2 pt-4 mt-md-4 mb-md-4">
                        All About NEET-UG BAMS Counselling 2025
                    </h3>
                </div>
                <section className="neet-counselling-section ">
                    <div className="container">



                        {/* <div className="info-card d-flex flex-column flex-md-row align-items-center gap-4 p-4 p-md-0 mb-5">
                            <div className="logo-box text-center">
                                <Image src={AACCC} alt="AACCC Logo" width={120} height={120} priority />



                            </div>
                            <div className="text-box">
                                <h2 className="counselling-heading m-0 fw-bold">All India BAMS Counselling 2025</h2>
                            </div>
                        </div> */}

                        <div className="info-card d-flex flex-column flex-md-row align-items-center gap-4 p-4 p-md-4 mb-5 shadow-box">
                            <div className="logo-box text-center bg-white shadow-sm">
                                <Image src={AACCC} alt="AACCC Logo" width={120} height={120} priority />
                            </div>
                            <div className="text-box text-center text-md-start">
                                <h2 className="counselling-heading m-0 fw-bold">
                                    All India BAMS Counselling 2025
                                </h2>

                            </div>
                        </div>



                        <ul className="neet-list mb-4">
                            <li>The AIQ BAMS counselling is conducted by the Ayush Admissions Central Counselling Committee (AACCC).</li>
                            <li>To participate in the All-India counselling, students must first clear the NEET-UG entrance exam.</li>
                            <li>AACCC conducts counselling for the All-India quota seats in Ayurvedic colleges, as well as seats in deemed universities, central universities, and private institutes offering Ayurveda programs.
                            </li>
                            <li>The BAMS counselling procedure will consist of 4 rounds, namely</li>
                        </ul>

                        <ol className="neet-rounds1 mb-4">
                            <li>Round 1</li>
                            <li>Round 2</li>
                            <li>Round 3</li>
                            <li>Stray Vacancy Round</li>
                        </ol>

                        <div className="col-lg-12 container  pt-md-3 pt-2 px-0 ">
                            <p className=" pb-3 paragaph-font18">
                                However, the Stray Vacancy Round (SVR) will be held only if there are any vacant seats (empty, forfeited, declined) in government, government-aided, deemed, central universities, and national institutes after the completion of the first 3 counselling rounds. The SVR round for All India Quota (AIQ) seats in government, government-aided, central universities, and national institutes will be conducted online in two phases: SVR-I and SVR-II. A separate stray vacancy round, known as Stray Vacancy Round-Deemed Universities (SVR-DU), will be held for admission to seats in deemed universities. This is because seats at deemed universities are unreserved, i.e., the central government’s reservation policy does not apply to them.
                            </p>
                        </div>
                    </div>
                </section>
            </section>

            <section>
                <div className="col-lg-12 text-center  pb-3 bg-white">
                    <h3 className="f3mount-svayauni pt-md-2 pt-0 mt-md-0 mb-md-0 padding-mobilebams">
                        All-India NEET-UG BAMS Counselling 2025 Stages
                    </h3>
                </div>
                <section className="neet-counselling-section py-md-4 py-3">
                    <div className="container">



                        <div className="">
                            <p className='paragaph-font18 text-center'>
                                Each of the AACCC BAMS counselling rounds has various stages. These stages will remain the same for most of the
                                rounds. The AACCC releases the BAMS counselling seat matrix before the commencement of each round.
                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 1: Registration for BAMS Counselling</h3>
                            <p className='paragaph-font18'>
                                This is the first stage of the All-India BAMS counselling process, wherein interested aspirants are required to
                                register for the respective round by visiting the AACCC official website and providing the necessary details.
                                This stage applies to all the rounds of the counselling process except the Stray Vacancy Round Phase-2 (SVR-2).
                                I.e. Candidates who had registered for SVR-1, but have not procured a seat, can participate in SVR-2 without
                                the need to manually register for the round, provided they have met the eligibility criteria.
                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 2: Fee Payment</h3>
                            <p className='paragaph-font18'>There are two types of fees that a student has to pay at the time of registration. They are:</p>
                            <ul>
                                <li className='paragaph-font18'>Non-refundable BAMS counselling registration fees</li>
                                <li className='paragaph-font18'>Refundable Security Deposit</li>
                            </ul>





                        </div>



                        <div className="table-wrapper">
                            <table className="custom-table1">
                                <thead>


                                    <tr>
                                        <th className='bdr-mainatin'>Selection of Counselling Type</th>
                                        <th className='bdr-mainatin'>Candidate Category</th>
                                        <th className='bdr-mainatin'>Registration Fee</th>
                                        <th>Security Deposit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowSpan={2}>
                                            <ul>
                                                <li className='list-none'>AIQ - Government College</li>
                                                <li className='list-none'>AIQ - Government Aided College</li>
                                                <li className='list-none'> Central University / National Institute </li>
                                            </ul>
                                        </td>
                                        <td>UR / EWS / OBC-NCL</td>
                                        <td>Rs. 1,000</td>
                                        <td rowSpan={2}> Rs. 20,000</td>
                                    </tr>
                                    <tr>
                                        <td>SC / ST / PwBD</td>
                                        <td>Rs. 500</td>
                                        {/* <td>Rs. 20,000</td> */}
                                    </tr>
                                    <tr className='tr-design'>
                                        <td className='bdr-mainatin'> Deemed University</td>
                                        <td className='bdr-mainatin'>All Categories</td>
                                        <td className='bdr-mainatin'>Rs. 5,000</td>
                                        <td>Rs. 50,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>





                        <div className="">
                            <p className='paragaph-font18'>
                                <span className='note'> Note:</span> Candidates willing to apply for both the counselling categories have to pay the higher amount, i.e., the fee for Deemed University (Rs 5,000 for registration + Rs 50,000 for security amount)
                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 3: Choice-Filling</h3>
                            <p className='paragaph-font18'>
                                This is the third stage of the counselling process, wherein the candidates must opt for the BAMS course and the desired colleges in order of their preferences. These choices can be edited or rearranged till the choice-filling window is open. This stage will reset for each of the counselling rounds. This means that the choices filled during Round 1 will not be considered for Round 2. Similarly, the choices submitted in Rounds 1 and 2 will not be considered for Round 3, and the choices filled in Rounds 1, 2 and 3 will be considered null and void in SVR-1. However, this stage does not apply to SVR-2, as the choices filled in SVR-1 are carried forward for the particular round. Additionally, it does not apply to SVR-DU as well. Therefore, eligible candidates must approach the respective deemed universities for seat allotment in the online SVR-DU round.
                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 4: Choice-Locking</h3>
                            <p className='paragaph-font18'>
                                The next step is choice locking, during which candidates are required to finalise their selected choices. It is important to note that once the choices are locked, they cannot be changed for the respective round. The organising body will auto-lock the choices for those candidates who do not lock their choices within the given time frame. Similar to stage 3, this stage is also not applicable for SVR-2 and SVR-DU.


                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 5: Seat Allotment Process:</h3>
                            <p className='paragaph-font18'>In this stage, the organising body, Ayush Admissions Central Counselling Committee, assigns the course and the college to the students. However, the allotment process depends on various factors, such as:
                            </p>
                            <ul>
                                <li className='paragaph-font18'>Candidates’ NEET score</li>
                                <li className='paragaph-font18'>Availability of seats in the preferred choices.</li>
                                <li className='paragaph-font18'>Candidate Category </li>

                            </ul>
                            <p className='paragaph-font18'>Candidates who have not been allotted a seat in the current round are eligible to apply for the next round.
                            </p>
                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 6: Result Announcement</h3>
                            <p className='paragaph-font18'>
                                In this stage, the AACCC publishes the final result of the respective counselling round. However, before the final results, a mock seat allotment result list is released by the conducting body to help students estimate their chances of admission to the desired college.
                            </p>
                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 7: Reporting to College & Document Verification</h3>
                            <p className='paragaph-font18'>
                                This is the final part of the BAMS counselling process. In this stage, candidates are required to report to the designated college in person and complete the admission formalities. This includes submission of the required documents and paying the admission fees. Once the documents are submitted, the authoritative body will verify them to confirm the candidates' seat.
                                The seats of those candidates who have not reported to the college within the stipulated time will be considered vacant for the next round.

                            </p>



                        </div>
                    </div>
                </section>
            </section>


            <section className='bg-white'>
                <div className="col-lg-12 text-center  pb-3 bg-white">
                    <h3 className="f3mount-svayauni pt-md-0 pt-0 mt-md-0 mb-md-0">
                        AACCC BAMS 2024 Counselling Dates
                    </h3>
                </div>

                <div className="table-wrapper mx-auto  table2heightfixed bg-white">
                    <table className="custom-table ">
                        <thead>
                            <tr>
                                <th className='bdr-mainatin'>Process</th>
                                <th className='bdr-mainatin '>Round 1</th>
                                <th className='bdr-mainatin'>Round 2 </th>
                                <th className='bdr-mainatin'>Round 3</th>
                                <th>Stray Vacancy Round 1</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.map((item, idx) => (
                                <tr key={idx}>
                                    {/* <td className='fw-medium bdr-mainatin sizebams'>{item.process}</td> */}
                                    <td
  className={`fw-medium bdr-mainatin sizebams ${
    item.process === "Candidates' Data Verification by Institutes" ? "highlight-row" : ""
  }`}
>
  {item.process}
</td>
                                    <td className='bdr-mainatin' dangerouslySetInnerHTML={{ __html: item.round1.replace(/\n/g, "<br/>") }} />
                                    <td className='bdr-mainatin' dangerouslySetInnerHTML={{ __html: item.round2.replace(/\n/g, "<br/>") }} />
                                    <td className='bdr-mainatin' dangerouslySetInnerHTML={{ __html: item.round3.replace(/\n/g, "<br/>") }} />
                                    <td className='bdr-mainatin' dangerouslySetInnerHTML={{ __html: item.stray.replace(/\n/g, "<br/>") }} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="container">



                    <div className="info-card d-flex flex-column flex-md-row align-items-center gap-4 p-4 p-md-4 mb-5 shadow-box">
                        <div className="logo-box text-center bg-white shadow-sm">
                            <Image src={KEA} alt="AACCC Logo" width={120} height={120} priority />
                        </div>
                        <div className="text-box text-center text-md-start">
                            <h2 className="counselling-heading m-0 fw-bold">
                                Karnataka AYUSH Counselling 2025 Process
                            </h2>

                        </div>
                    </div>


                    <ul className="neet-list mb-4">
                        <li>The KEA NEET-UG counselling will begin once the NEET-UG results are declared.</li>
                        <li>The Karnataka Examinations Authority (KEA) conducts the BAMS counselling in Karnataka for government quota, private quota, management quota, and NRI quota seats that are available in all the government and private Ayurveda colleges across the state. </li>
                        <li>Students must complete the Karnataka BAMS counselling registration on the Karnataka BAMS counselling official website (KEA) to be eligible for the KEA NEET-UG counselling process.</li>
                        <li>The KEA BAMS counselling 2025 process will be conducted in 4 rounds, namely</li>
                    </ul>

                    <ol className="neet-rounds1 mb-4">
                        <li>Round 1</li>
                        <li>Round 2</li>
                        <li>Mop-Up Round</li>
                        <li>Stray Vacancy Round</li>
                    </ol>

                    <ul className="neet-list mb-4">
                        <li>The KEA conducts the Mop-Up Round only if seats remain unfilled after the first 2 rounds. Additionally, Stray Vacancy Rounds may be conducted by the KEA if the seats remain unfilled even after the Mop-Up Round in order to complete the BAMS 2025 counselling process.</li></ul>
                </div>
            </section>




            <section>
                <div className="col-lg-12 text-center  pb-3 bg-white">
                    <h3 className="f3mount-svayauni pt-md-2 pt-3 mt-md-0 mb-md-0">

                        KEA NEET-UG BAMS Counselling 2025 Stages

                    </h3>
                </div>
                <section className="neet-counselling-section py-3">
                    <div className="container">



                        <div className="">
                            <p className='paragaph-font18 text-center'>

                                The KEA NEET-UG BAMS counselling takes place in various rounds. Each round has multiple stages, which are explained below.

                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 1: Online Registration & Fee Payment
                            </h3>
                            <p className='paragaph-font18'>
                                The first stage of the KEA BAMS counselling is online registration. Interested and eligible candidates must register through the Karnataka Ayush counselling website (KEA) within the stipulated time. Students are not required to send any documents or printouts of the application form to KEA to prove their eligibility during the registration process. The candidature of those students who are found ineligible at any stage by the KEA/ University will be cancelled with immediate effect. The registration stage is deemed to be complete once the candidates have paid the Karnataka BAMS counselling registration fees through the payment gateway using a credit card or a debit card.

                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 2: Document Verification
                            </h3>
                            <p className='paragaph-font18'>In this stage, students must get their documents verified by the concerned authorities within the stipulated time. Once the verification is complete, eligible students must download the verification slip. The eligible rank holders must note that the organising body will not send any message/ reminder regarding the date and time of the verification process. The candidates who fail to verify the documents within the given time frame will not be eligible to exercise their options as part of the next stage. I.e., option entry.</p>






                        </div>





                        <div className="">


                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 3: Option Entry</h3>
                            <p className='paragaph-font18'>
                                Candidates who have cleared the document verification stage will be considered eligible for option entry. In this stage, the eligible candidates must enter their most preferred college as their first preference and must continue to enter their options in the order of their preferences. There is no limit to the number of colleges that can be added as options. Candidates must be careful about the order of the choices they make in this stage, as the selected options will remain the same for the current and subsequent rounds. However, they are allowed to delete or reorder their choices in the next round. Additionally, if any new colleges/ seats are added to the Karnataka BAMS seat matrix after the completion of the current round, candidates will be allowed to choose them as part of their option entry in the upcoming round.
                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 4: Mock Seat Allotment:
                            </h3>
                            <p className='paragaph-font18'>
                                KEA publishes mock seat allotment results based on the candidate’s current preference. This list is curated to inform candidates about the seats they might be eligible for. Moreover, the list helps aspirants understand their chances of admission to their preferred college and re-order their preferences. Candidates can view the mock results by entering their CET number on the KEA website. Aspirants must note that the final results may vary from what is shown in the mock seat allotment.

                            </p>

                            <h3 className="fw-semibold mt-4" style={{ color: '#003366' }}>Stage 5: Seat Allotment and Results:
                            </h3>
                            <p className='paragaph-font18'>In this stage, the seats are allotted primarily based on the students' rank/ merit, their preferences, and the reservation rules that are set by the government. The seat allotment process remains the same for all rounds of the counselling process, and each of the rounds consists of 3 phases. These are as follows:
                            </p>


                            <h3 className="fw-semibold mt-4 font-25bams" style={{ color: '#003366' }}>Phase 1:</h3>
                            <p className='paragaph-font18'>
                                In this phase, all the candidates are eligible. However, the order of seat allotment will depend on the category of candidates. Phase 1 of the BAMS Round 1 counselling process will commence with the allotment of a certain number of seats, known as Special Category Seats, to candidates of Karnataka in the order given below:
                            </p>

                            <ul className="neet-list mb-4 ">
                                <li>People with Disabilities (PwD)</li>
                                <li>NCC Candidates</li>
                                <li>Sports Candidates</li>
                            </ul>
                            <p className='paragaph-font18'>
                                After the successful completion of Special Category seats, all candidates, regardless of their category, will be first considered for General Merit (GM) seats. After this, candidates who have not been allotted a GM seat will be considered for a seat in their respective category based on their rank and preferences. The same allotment order will continue until all candidates' allotments stay the same.
                            </p>

                            <h3 className="fw-semibold mt-4 font-25bams" style={{ color: '#003366' }}>Phase 2:
                            </h3>
                            <p className='paragaph-font18'>
                                There are 5 distinct points that a candidate must know before participating in the second phase of the respective KEA BAMS counselling rounds.

                            </p>
                            <ol className="neet-rounds1 mb-4">
                                <li>Phase 2 is only applicable to candidates from reserved categories. </li>
                                <li>In this phase, the unfilled seats in the rural and Kannada medium quota of the reservation categories will be converted to general seats within the respective reserved category. Moreover, these converted seats, along with other remaining seats, can only be secured by candidates of the same reserved categoryneet-list.</li>
                                <li>The seat allotment process commences with the allotment of Special Category seats. As mentioned earlier, these seats are allotted to candidates of the Reserved category in the order given below:</li>
                                <ul className="neet-list mb-4">
                                    <li>People with Disabilities (PwD)</li>
                                    <li>NCC Candidates</li>
                                    <li>Sports Candidates</li>
                                </ul>



                                <li> After the successful allotment of Special Category seats, the rest of the reserved category candidates are considered for the remaining seats in the respective reserved category.
                                </li>
                                <li>Phase 2 will follow the same allotment order repeatedly until there is no change in the allotment of any candidate.</li>
                            </ol>

                            <h3 className="fw-semibold mt-4 font-25bams" style={{ color: '#003366' }}>Phase 3:
                            </h3>
                            <p className='paragaph-font18'>
                                Candidates must be aware of the following points before participating in this phase of the BAMS counselling rounds.

                            </p>
                            <ol className="neet-rounds1 mb-4">
                                <li>All the candidates are eligible to participate in the third phase of round 1 counselling.  </li>
                                <li>In this phase, the seats of reserved general categories and the special category seats that remain unfilled in Phase 2 will be converted to general merit seats. However, in case there are no general category seats, the rural and Kannada medium quota seats, if remaining unfilled, will be converted to general seats of the respective reserved categories.</li>

                                <li>The converted general merit seats are offered to all the general merit candidates as well as all the other reserved category candidates. Whereas, the general seats of the respective reserved categories are allotted to candidates who are of the same reserved category</li>
                                <li>Similar to the previous two phases, the seat allotment process commences with the allotment of Special Category seats. These seats are allotted to candidates in the order given below:</li>
                                <ul className="neet-list mb-4">
                                    <li>People with Disabilities (PwD)</li>
                                    <li>NCC Candidates</li>
                                    <li>Sports Candidates</li>
                                </ul>



                                <li>
                                    Once the Special Category seats are allotted, the rest of the seats will be offered to the remaining candidates (regardless of their category) in the order of their rank and preferences.

                                </li>
                                <li>In the 3rd phase of allotment, any unfilled reserved category seats are automatically converted to General Merit (GM) and are re-offered to all eligible candidates based on their rank and preferences. This process is repeated until no reserved seats remain and no further changes occur in the allotment.</li>
                            </ol>

                            <p className='paragaph-font18'>
                                The seat allotment results are published by the end of each round. Students who have been allotted a seat in phase 1 or phase 2 must wait until the entire round is completed to take a decision for the post seat allotment procedure.

                            </p>

                        </div>
                    </div>
                </section>
            </section>
            <div className="col-lg-12 text-center  pb-3 bg-white">
                <h3 className="f3mount-svayauni pt-md-2 pt-0 mt-md-0 mb-md-0">
                    BAMS Counselling Documents Required for A.Y. 2025-26
                </h3>
            </div>

            {/* <div className="bams-container"> */}
            <div className="why-us-card p-4 h-100 text-center container bams-container" >

                <div className="bams-grid">
                    <div className="bams-column">

                        <ul className=''>
                            <li>10th, 11th and 12th Marksheets</li>
                            <li>Graduation Marksheets (If Any)</li>
                            <li>NEET-UG Application Form</li>
                            <li>NEET-UG Admit Card</li>
                            <li>NEET-UG Scorecard</li>
                            <li>Pwd Certificate (If Applicable)</li>
                            <li>Domicile Certificate (If Applicable)</li>
                            <li>NEET-UG Rank Letter</li>
                            <li>Valid Government-issued ID Proof</li>


                        </ul>
                    </div>
                    <div className="bams-column">
                        <ul>
                            <li>Recent Passport Size Photographs</li>
                            <li>Transfer Certificate</li>
                            <li>Medical Fitness Certificate (Issued by Registered Medical Practitioner)</li>
                            {/* <li>Photographs</li> */}
                            <li>Migration Certificate (If Applicable)</li>
                            <li>Caste Certificate (If Applicable)</li>
                            <li>Income Certificate (If Applicable)</li>
                            <li>Provisional Allotment Letter issued by AACCC</li>
                            <li>Character Certificate</li>
                        </ul>
                    </div>
                </div>


            </div>

            <section className='container'>   <p className='paragaph-font18 text-center text-black'>

                The BAMS NEET-UG rank predictor tool will help you assess your chances of participating in the Ayush Admissions Central Counselling Committee counselling process.


            </p>
            </section>


            <div className="predictor-box" id='predictor'>
                <h2 className="predictor-title">BAMS NEET-UG 2025 Rank Predictor</h2>
                <a className="predictor-link" href="#">Predict Your BAMS NEET-UG Rank Here.</a>

                {/* <div className="predictor-inputs">
                    <input type="text" className='fw-bold' placeholder="Out of 180 Questions" disabled />
                    <input type="number" placeholder="No. of Questions Attempted" required />
                    <input type="number" placeholder="No. of Correct Answers" required />
                </div>
                <button className="predictor-button " onClick={handleShow1}>Submit</button> */}

                <div className="predictor-inputs">
                    <input type="text" className="fw-bold text-center" placeholder="Out of 180 Questions" disabled />

                    <input
                        type="number"
                        placeholder="No. of Questions Attempted"
                        id="attempted"
                        className='text-center'
                    />

                    <input
                        type="number"
                        placeholder="No. of Correct Answers"
                        id="correct"
                       className='text-center'
                    />
                </div>

                <button className="predictor-button" onClick={handleShow1}>Submit</button>



                <p className="predictor-note">
                    <strong>Note:</strong> The prediction will be based on the previous year's NEET-UG results and exam analysis.
                </p>
            </div>



            <div className='d-flex max-widthbams'>
                <div className="predictor-box-1">

                    <p className='paragaph-font18'> The BAMS NEET-UG 2025 Rank Predictor assesses your performance in NEET-UG and predicts the rank you might secure.
                        This helps aspirants understand which colleges they may be eligible for and are likely to gain admission into.</p>

                </div>
                <div className="predictor-box-1">
                    <p className='paragaph-font18'>
                        The NEET-UG Rank Prediction gives you a head start during the option entry stage of the All-India Quota BAMS counselling 2025.
                        It helps in strategising your choices to improve your chances of securing admission to your dream college!
                    </p>
                </div>
            </div>












            {/* ---------------------cards--- */}<section className="container-fluid  p-0 pb-0 bams-conatiner" id='topcollege' >
                <div className="container">
                    <div className="col-lg-12 text-center  pb-3 bg-white">
                        <h3 className="f3mount-svayauni pt-md-2 pt-4 mt-md-4 mb-md-4 mb-4">

                            Best BAMS Colleges in Karnataka


                        </h3>
                        <p className='paragaph-font18 text-center'>
                            Below is a list of some of the top AYUSH counselling-participating colleges in Karnataka.
                        </p>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="row row-cols-1 row-cols-md-4 g-4 mds  bdslandgingcolleges bamscolllege bdscollegeimage">


                            <div className="col">
                                <div className="card  justify-content-center align-items-center  justify-content-center align-items-center">
                                    <img className="card-img-top imgcontain" src={Kankanawadi} alt="KAHER’s Shri BM Kankanawadi Ayurveda Mahavidyalaya Post Graduate Studies and Research Centre" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className=" card-titlebams  bams-height-college">KAHER’s Shri BM Kankanawadi Ayurveda Mahavidyalaya Post Graduate Studies and Research Centre</h5>
                                        <p className="card-text  paragaph-font18">
                                            {/*  <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i> */}
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Belagavi
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow} >
                                            Enquire Now
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="col">

                                <div className="card  justify-content-center align-items-center  justify-content-center align-items-center" >
                                    <img className="card-img-top imgcontain" src={Yenepoya} alt="Yenepoya Ayurveda Medical College and Hospital" loading="lazy" />


                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height-college">Yenepoya Ayurveda Medical College and Hospital </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Mangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow} >
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Amrutha} alt="Amrutha Ayurvedic Medical College (AAMC)" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height-college">Amrutha Ayurvedic Medical College (AAMC)</h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="fa fa-map-marker" style={{ color: "red" }} aria-hidden="true"></i>
                                            &nbsp; Chitradurga
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Sri} alt="Sri Kalabyraveshwara Swamy Ayurvedic Medical College, Hospital and Research Centre (SKAMCH & RC)" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height-college">Sri Kalabyraveshwara Swamy Ayurvedic Medical College, Hospital and Research Centre (SKAMCH & RC)</h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Bangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow} >
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col ">
                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Sharada} alt="Sharada Ayurveda Medical College and Hospital (SAMCH)" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">Sharada Ayurveda Medical College and Hospital (SAMCH)</h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Mangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">

                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Sushrutha} alt="Sushrutha Ayurvedic Medical College & Hospital" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">Sushrutha Ayurvedic Medical College & Hospital
                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Bangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">

                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Ashwini} alt="Ashwini Ayurvedic Medical College & Research Centre" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height ">Ashwini Ayurvedic Medical College & Research Centre</h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Tumkur
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">

                                <div className="card justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={SDM} alt="SDM College of Ayurveda & Hospital" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height ">SDM College of Ayurveda & Hospital
                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Udupi
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>

                            <div className="col">

                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Atreya} alt="Atreya Ayurvedic Medical College Hospital & Research Centre" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">Atreya Ayurvedic Medical College Hospital & Research Centre
                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Bangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">

                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Shri} alt="Shri Kalidas Ayurvedic Medical College and Hospital" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">Shri Kalidas Ayurvedic Medical College and Hospital


                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Badami
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow} >
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={Indian} alt="Indian Institute of Ayurvedic Medicine & Research" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">Indian Institute of Ayurvedic Medicine & Research
                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Bangalore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card  justify-content-center align-items-center ">
                                    <img className="card-img-top imgcontain" src={JSS} alt="JSS Ayurveda Medical College" loading="lazy" />
                                    <div className="card-body">
                                        <h5 className="card-titlebams bams-height">JSS Ayurveda Medical College
                                        </h5>
                                        <p className="card-text  paragaph-font18">
                                            <i className="bi bi-geo-alt-fill fs-6 " style={{ color: "red" }} ></i>
                                            &nbsp; Mysore
                                        </p>
                                        <button className="btn btn-success m-2 btnbdscolour viewMoreCollegeBtn py-3 px-4" onClick={handleShow}>
                                            Enquire Now
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-12 text-center p-3 f700 many-faq' id="FAQs">
                        & Many More!</div>
                </div>
            </section>









            <section className="container-fluid d-flex align-items-center pt-3 pb-0 px-0 " id="contactus">
                <div className="container-fluid bgimage text-center d-flex justify-content-center align-items imgh" style={{ background: `linear-gradient(341deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 0%)) , url(${contactbanner})` }}>
                    <div className='ddAmb pe-md-5 me-md-5  mt-5 '><h2 className='text-white p-3 headings-font mt-5' style={{
                        background: "rgb(0 2 62 / 48%)",
                        borderRadius: "11px"
                    }}>
                        Secure Your BAMS Seat Today for A.Y. 2025-26 <br className='d-block d-md-block' />With Personalised BAMS NEET Counselling

                    </h2>
                        <button className="btn btn-success mb-4 m-3 m-md-5 font-white23 btnbdscolour  btn enquiebtn rounded  py-3 px-4" onClick={handleShow}>
                            Enquire Now!
                        </button>
                    </div>
                </div>


            </section>












            <footer className='pb-3  bgfooter'>
                <div className="container-fluid align-item-start justify-content-between d-none d-md-flex flex-wrap">
                    <div className="footer-left  col-md-7 d-flex ps-5">
                        <div className="col-md-8">

                            <div className="ft-left mb-3 px-5" style={{ marginBottom: 20 }}>
                                <img src="/images/footer650.webp" className="imgfooter" alt="bangalorestudy " />
                            </div>


                        </div>
                    </div>
                    <div className="footer-right col-md-5 offeset-md-1  d-flex">
                        <div className="social-unit col-md-5 w-100 px-5  justify-content-end" >
                            <div><p className=" font-white23" style={{ marginBottom: 10 }}>Connect with us</p>

                                <a
                                    href="tel:08022454991 "
                                    style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                >
                                    <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />  080-22454991
                                </a>
                                {" "}  ,{" "}
                                <a
                                    href="tel:08026631169 "
                                    style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                >
                                    <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} /> 080-26631169
                                </a>
                                <br />
                                <div className="bs-phone " style={{ display: "contents" }}>
                                    <a
                                        href="tel:09036020076 "
                                        style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                    >
                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} /> +91 9036020076{" "},
                                    </a>{" "}
                                    <a
                                        href="tel:18001208696 "
                                        style={{ color: "white", fontWeight: 400, fontSize: 14 }}
                                    >
                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} /> 1800 120 8696{" "}(Toll
                                        Free)
                                    </a>
                                </div>
                                <p >

                                    <a
                                        href="tel:971502436552 "
                                        style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                    >
                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} /> +971 502436552{" "}(Dubai)
                                    </a>


                                </p>

                            </div>
                            <div className="text-center" >
                                <p style={{ marginTop: 10, marginBottom: 14 }} className='d-block pe-5 d-flex'>
                                    {/* <a target="_blank " href="https://www.facebook.com/bangalorestudy "> */}
                                    <a target="_blank " href="https://www.facebook.com/learntechedu">

                                        <i className="bi bi-facebook" style={{ color: "white" }} />&nbsp; &nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://twitter.com/BangaloreStudy2 "> */}
                                    <a target="_blank " href="https://x.com/learntechww">




                                        {/* <i className="bi bi-twitter" style={{ color: "white" }} />&nbsp; &nbsp;&nbsp; */}
                                        <Image width={20} height={20} className='icon-white me-3 twitter-width' src="/images/icons/twitter-x.png" alt="twitter-icon" />
                                    </a>
                                    <a
                                        target="_blank "
                                        // href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w "
                                        href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w "

                                    >
                                        {" "}
                                        <i className="bi bi-youtube" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://instagram.com/bangalorestudy "> */}
                                    <a target="_blank " href="https://www.instagram.com/learntechedus/">

                                        <i className="bi bi-instagram" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    <a
                                        target="_blank "
                                        // href="https://in.linkedin.com/company/learntech-edu-solutions-pvt-ltd"
                                        href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/'

                                    >
                                        {" "}
                                        <i className="bi bi-linkedin" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://in.pinterest.com/bangalorestudy7608/ ">

                                        <i className="bi bi-pinterest" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a> */}
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

                <div className="container align-item-start justify-content-between d-md-none">
                    <div className="footer-left pt-4 col-md-7 text-center">

                        <div
                            className="ft-left mb-3"
                            style={{ justifyContent: "flex-start", textAlign: "left" }}
                        >
                            <img src="/images/Learntech325.webp" className="imgfooter" alt="bangalorestudy " />
                        </div>
                    </div>
                    <div className="footer-right col-md-5 offeset-md-1 py-t d-flex pt-0 mt-0">
                        <div className="app-unit col-md-7  col-md-5 ">

                        </div>
                        <div className="social-unit col-md-5 mt-4 pb-5">
                            <div>
                                <p className="font-white23">Connect with us</p><a
                                    href="tel:08022454991 "
                                    style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                ><i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />{" "} 080-224549911{" "},</a>{" "},{" "}
                                <a
                                    href="tel:08026631169 "
                                    style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                >
                                    <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />
                                    080-26631169
                                </a>
                                <div className="bs-phone " style={{ display: "contents" }}>
                                    {" "}
                                    <br />
                                    <a
                                        href="tel:09036020076 "
                                        style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                    >

                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />{" "}
                                        +91 9036020076
                                        {" "} ,</a>{" "}
                                    <a
                                        href="tel:18001208696 "
                                        style={{ color: "white", fontWeight: 400, fontSize: 14 }}
                                    >
                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />
                                        1800 120 8696{" "}(Toll Free)
                                    </a>

                                </div>
                                <p>

                                    <a
                                        href="tel:970502436552 "
                                        style={{ color: "white", fontSize: 14, fontWeight: 400 }}
                                    >
                                        <i className="bi bi-telephone-fill" style={{ fontSize: 13 }} />{" "}
                                        +971 502436552{" "}(Dubai)
                                    </a>

                                </p>
                            </div>
                            <div className="text-center" >
                                <p style={{ marginTop: 10, marginBottom: 14 }} className='d-block pe-5 d-flex'>
                                    {/* <a target="_blank " href="https://www.facebook.com/bangalorestudy "> */}
                                    <a target="_blank " href="https://www.facebook.com/learntechedu">

                                        <i className="bi bi-facebook" style={{ color: "white" }} />&nbsp; &nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://twitter.com/BangaloreStudy2 "> */}

                                    <a target="_blank " href="https://x.com/learntechww">

                                        {/* <i className=" bi bi-twitter" style={{ color: "white" }} />&nbsp; &nbsp;&nbsp; */}

                                       <Image width={20} height={20} className='icon-white me-3 twitter-width' src="/images/icons/twitter-x.png" alt="twitter-icon" />
                                    </a>
                                    <a
                                        target="_blank "
                                        // href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w "
                                        href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w "

                                    >
                                        {" "}
                                        <i className="bi bi-youtube" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://instagram.com/bangalorestudy "> */}
                                    <a target="_blank " href="https://www.instagram.com/learntechedus/ ">




                                        <i className="bi bi-instagram" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    <a
                                        target="_blank "
                                        // href="https://in.linkedin.com/company/learntech-edu-solutions-pvt-ltd"
                                        href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/'
                                    >
                                        {" "}
                                        <i className="bi bi-linkedin" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    {/* <a target="_blank " href="https://in.pinterest.com/bangalorestudy7608/ ">
                                        <i className="bi bi-pinterest" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                                    </a> */}
                                </p>

                            </div>
                        </div>


                    </div>
                </div>
            </footer>



            <Modal show={show} onHide={handleClose}>

                <Modal.Body>

                    <div className="heading-popup ">
                        <h4 className='text-center pop-up'>
                            Fill in the Details to Get in Touch with our Experts for <br />
                            the BAMS Counselling Process 2025-26.
                        </h4>
                    </div>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {() => (
                            <Form>
                                <div className="form-group mb-3">
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="number"
                                        id="contact"
                                        name="contact"
                                        placeholder="Contact No.*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="number"
                                        id="neetrank"
                                        name="neetrank"
                                        placeholder="NEET Score"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        as="select"
                                        id="location"
                                        name="location"
                                        required
                                        className="browser-default custom-select form-control white-bg-black-text bams-form-field py-3"
                                    >
                                        <option value="">State</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Daman & Diu">Daman & Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                    </Field>
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        placeholder="Message (Optional)"
                                        className="form-control bams-form-field py-3"
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        id="about"
                                        name="submit"
                                        className='btn btn-primary  btn-model mt-2 py-3'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </Modal.Body>

            </Modal>





            <Modal show={show1} onHide={handleClose1}>

                <Modal.Body>

                    <div className="heading-popup ">
                        <h4 className='text-center pop-up'>
                            Please Fill in Your Details to Receive Your Rank <br />
                            Prediction Report.
                        </h4>
                    </div>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {() => (
                            <Form>
                                <div className="form-group mb-3">
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="number"
                                        id="contact"
                                        name="contact"
                                        placeholder="Contact No.*"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        type="number"
                                        id="neetrank"
                                        name="neetrank"
                                        placeholder="NEET Score"
                                        required
                                        className="form-control bams-form-field py-3"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        as="select"
                                        id="location"
                                        name="location"
                                        required
                                        className="browser-default custom-select form-control white-bg-black-text bams-form-field py-3"
                                    >
                                        <option value="">State</option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="West Bengal">West Bengal</option>
                                        <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                                        <option value="Daman & Diu">Daman & Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                    </Field>
                                </div>

                                <div className="form-group mb-3">
                                    <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        placeholder="Message (Optional)"
                                        className="form-control bams-form-field py-3"
                                        rows={3}
                                    />
                                </div>

                                <div className="form-group text-center">
                                    <button
                                        type="submit"
                                        id="about"
                                        name="submit"
                                        className='btn btn-primary  btn-model mt-2 py-3'
                                    >
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>


                </Modal.Body>

            </Modal>
        </section>






    );
};

export default BamsPage;


















