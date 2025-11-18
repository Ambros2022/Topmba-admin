import React, { useState } from 'react';

const StudentsText = ({  }) => {
    const [activeTab, setActiveTab] = useState('students');

    return (
        <>
            <section className='bg-white'>
                <div className="container pt-2 pb-5">
                    <div className="d-flex gap-3 flex-wrap ServiceTabs flex-row" id="myTab">
                        <button className={`btn nav-link ${activeTab === 'students' ? 'active' : ''}`}
                            onClick={() => setActiveTab('students')}>
                            For Students
                        </button>
                        <button className={`btn nav-link ${activeTab === 'colleges' ? 'active' : ''}`}
                            onClick={() => setActiveTab('colleges')}>
                            For Colleges and Universities
                        </button>
                    </div>
                    <div className="tab-content pt-3 serviceh2">
                        <div className={`tab-pane fade ${activeTab === 'students' ? 'show active' : ''}`} role="tabpanel">
                            <h2 className="text-black fw-bold pt-3">
                                Personalized Expert Counselling:
                            </h2>
                            <p className="text-black">
                                Learntech offers tailored guidance to help students make informed educational choices based on their interests and goals. Our experienced advisors provide in-depth consultations to assist students in selecting the most suitable courses and colleges. By choosing Learntech, students benefit from expert advice that maximizes their chances of finding the right fit for their academic journey.
                            </p>
                            {/* {isReadMore && ( */}
                                {/* <> */}
                                    <h2 className="text-black fw-bold pt-3">
                                        Reserved Seating Advantage:
                                    </h2>
                                    <p className="text-black">
                                        Following our comprehensive counselling sessions, students have the opportunity to secure their place in their chosen college through our seat reservation service. This advanced booking option helps students mitigate uncertainty and ensures their spot in the college of their choice well before the admission deadlines.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Exclusive Meetings and Campus Tours:
                                    </h2>
                                    <p className="text-black">
                                        To foster a deeper connection between students and their prospective colleges, Learntech arranges personalized meetings with college authorities and guided campus tours. These interactions provide students with first-hand insights into faculty expertise, campus facilities, and the overall educational environment, enhancing their confidence and satisfaction with their chosen institution.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Comprehensive Financial Assistance:
                                    </h2>
                                    <p className="text-black">
                                        With the rising costs of education, securing financial aid is crucial for many students. Learntech’s network of financial experts is dedicated to assisting students in navigating the complexities of educational loans and scholarships. Our advisors provide detailed support in identifying and obtaining the financial resources necessary to make education more affordable.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Specialized Support for NRI Students:
                                    </h2>
                                    <p className="text-black">
                                        Understanding the unique challenges faced by NRI students, Learntech offers tailored advice and assistance to those exploring educational opportunities in India. Our experienced counsellors provide in-depth knowledge and support to help NRI students seamlessly integrate into the Indian education system and make well-informed decisions.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Post Admissions Support:
                                    </h2>
                                    <p className="text-black">
                                        Our commitment to students extends beyond admission. Learntech offers continuous post-admission support to ensure a smooth transition into college life. From facilitating accommodation arrangements to addressing any post-admission concerns, our counsellors are dedicated to providing comprehensive support throughout the entire process.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Flexible Fee Payment Options:
                                    </h2>
                                    <p className="text-black">
                                        To accommodate the financial demands of higher education, Learntech offers guidance on paying tuition fees in convenient EMI plans. Our experts help students explore flexible payment options, alleviating the financial burden and making it easier to manage educational expenses over time.
                                    </p>
                                {/* </>)} */}
                            {/* <button className="btn btn-link p-0" onClick={toggleReadMore}>
                                {isReadMore ? 'Read Less' : 'Read More'}
                            </button> */}

                        </div>
                        <div className={`tab-pane fade ${activeTab === 'colleges' ? 'show active' : ''}`} role="tabpanel">
                            <h2 className="text-black fw-bold pt-3">
                                Global Branding and Visibility:
                            </h2>
                            <p className="text-black">
                                In a highly competitive educational sector, establishing a strong global presence is essential. Learntech offers advanced branding and visibility services designed to expand your institution's reach worldwide. By featuring your institution’s profile on our websites, we provide extensive exposure and enhance your institution’s brand. Our strategic initiatives and targeted campaigns elevate recognition and strengthen the institute’s global brand value.

                            </p>
                            {/* {isReadMore && (
                                <> */}
                                    <h2 className="text-black fw-bold pt-3">
                                        Strategic Promotional Activities:
                                    </h2>
                                    <p className="text-black">
                                        To boost your institution’s reputation, Learntech partners with you to organize impactful promotional activities. These activities are crafted to effectively present your institution’s unique features and strengths, engaging prospective students and enhancing your institution’s visibility and appeal. We help create meaningful connections between your institution and future students.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Social Media Management:
                                    </h2>
                                    <p className="text-black">
                                        Effective social media management is crucial for maintaining and growing your institution’s online presence. Learntech provides expert support in managing your social media platforms, ensuring that your content is engaging and informative. We focus on showcasing your institution’s achievements, facilities, and campus life through compelling visuals and regular updates, driving brand awareness and building a strong online community.

                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                        Digital Marketing:
                                    </h2>
                                    <p className="text-black">
                                        Stay ahead with Learntech’s cutting-edge digital marketing strategies. We offer a full range of services including social media marketing, Pay-Per-Click (PPC) advertising, and more. Our approach keeps your institution at the forefront of digital trends, optimizing your online presence and effectively attracting prospective students.
                                    </p>
                                    <h2 className="text-black fw-bold pt-3">
                                    Global Admissions Support:
                                    </h2>
                                    <p className="text-black">
                                    Learntech’s extensive network supports your institution in attracting students from diverse cultural and traditional backgrounds. Our global admissions services help you create a vibrant, multicultural environment by facilitating the integration of international students, enhancing the sense of unity and diversity within your institution.
                                    </p>
                    

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentsText;
