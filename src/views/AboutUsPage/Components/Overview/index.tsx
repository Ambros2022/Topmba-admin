import React from 'react';

const Overview = () => {
    return (
        <>
            <section className='bg-white pt-3 pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xl-2 col-lg-3 d-flex flex-column aboutUsSec">
                            <div className="d-flex align-items-start">
                                <div className="nav flex-column gap-3 nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="nav-link active" id="v-pills-who-we-are-tab" data-bs-toggle="pill" data-bs-target="#v-pills-who-we-are" type="button" role="tab" aria-controls="v-pills-who-we-are" aria-selected="true">Who We Are</button>
                                    <button className="nav-link" id="v-pills-our-mission-tab" data-bs-toggle="pill" data-bs-target="#v-pills-our-mission" type="button" role="tab" aria-controls="v-pills-our-mission" aria-selected="false">Our Mission</button>
                                    <button className="nav-link" id="v-pills-our-vision-tab" data-bs-toggle="pill" data-bs-target="#v-pills-our-vision" type="button" role="tab" aria-controls="v-pills-our-vision" aria-selected="false">Our Vision</button>
                                    <button className="nav-link" id="v-pills-what-do-we-offer-tab" data-bs-toggle="pill" data-bs-target="#v-pills-what-do-we-offer" type="button" role="tab" aria-controls="v-pills-what-do-we-offer" aria-selected="false">What Do We Offer?</button>
                                    <button className="nav-link" id="v-pills-why-choose-us-tab" data-bs-toggle="pill" data-bs-target="#v-pills-why-choose-us" type="button" role="tab" aria-controls="v-pills-why-choose-us" aria-selected="false">Why Choose Us?</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xl-10 col-lg-9">
                            <div className="tab-content mt-md-0 mt-3 text-black" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-who-we-are" role="tabpanel" aria-labelledby="v-pills-who-we-are-tab">
                                    <p className="text-black">
                                        Learntech Edu Solutions stands as a leading educational service provider, firmly established in the Education sector since 1994. As India’s first ISO Certified Educational Consultancy, our organization is a testament to quality and trust. Our headquarters are strategically located in Bangalore, serving as the operational hub that coordinates our vast network of branches within India, including regions such as Kerala and Haryana. Internationally, we have expanded our footprint with offices in the UAE, Bahrain, and Qatar, ensuring a broad reach that caters to a global student base and educational institutions.</p>

                                    <p className="text-black">
                                        Our primary focus at Learntech Edu Solutions is to offer precise and impactful admission guidance, facilitated by seasoned experts with deep-rooted experience in the Education industry. We specialize in guiding students through their academic journeys in various fields, including Medicine, Dentistry, Engineering, Computer Science, Nursing, Pharmacy, Law, Management and more. Our team’s extensive knowledge of the Education sector, combined with a robust network of industry contacts, has enabled us to assist over 5,00,000 students in achieving their academic ambitions.</p>

                                    <p className="text-black">
                                        Our services are not confined by geographic boundaries; we provide comprehensive support for admission to esteemed institutions both in India and abroad. Furthermore, our services extend beyond Indian nationals, offering tailored guidance to NRIs and international students who aspire to pursue higher education in India. By bridging the gap between students and their academic dreams, Learntech Edu Solutions plays a pivotal role in shaping the future of countless aspirants across the globe.</p>

                                    <h5 className='text-black fw-bold'>Empowering Colleges and Universities for Greater Success:</h5>

                                    <p className="text-black">
                                        Beyond assisting students, Learntech Edu Solutions offers valuable services to colleges and universities, aiming to enhance their brand visibility and attract more admissions. We specialize in strategic brand promotions on various social media platforms, ensuring educational institutions gain the recognition they deserve. Our digital marketing expertise includes website development and optimization, crafting impactful online presences that resonate with potential students and stakeholders. Additionally, Learntech provides comprehensive lead generation services, helping colleges effectively reach out to prospective students and increase enrollment numbers.</p>

                                    <p className="text-black">
                                        Through tailored marketing strategies and leveraging our extensive network, Learntech empowers educational institutions to strengthen their brand, expand their reach, and secure a competitive edge in the ever-evolving education sector. Our commitment is to foster mutually beneficial relationships, driving growth and success for both students and academic institutions a like.</p>
                                </div>
                                <div className="tab-pane fade" id="v-pills-our-mission" role="tabpanel" aria-labelledby="v-pills-our-mission-tab">
                                    <p className="text-black">
                                        Our mission is to empower students by providing accurate, personalized, and comprehensive admission guidance, ensuring each individual finds the right academic path that aligns with their aspirations and potential. We strive to remove the barriers and complexities in the admission process, offering support from start to finish. Our dedicated team of experienced counsellors partners with students, guiding them through every step, from selecting the right course and college to navigating applications and securing admissions. Additionally, we collaborate with colleges and universities to enhance their visibility and reputation through strategic brand promotions, digital marketing, and lead generation, helping them connect with talented students globally. Our goal is to bridge the gap between students' academic dreams and the opportunities available, creating a nurturing environment for learning and growth.
                                    </p>     </div>
                                <div className="tab-pane fade" id="v-pills-our-vision" role="tabpanel" aria-labelledby="v-pills-our-vision-tab">
                                    <p className="text-black">
                                        Learntech Edu Solutions has a vision to become the global leader in providing educational services and be recognized for their unwavering commitment to helping students achieve their academic and career goals. We aim to create a future where every student, regardless of their background, has access to the best educational opportunities tailored to their individual interests and strengths. By building strong, collaborative relationships with colleges and universities, we envision becoming the preferred partner for institutions seeking to expand their reach, enhance their brand, and attract qualified students. Our goal is to set a new standard in educational services, where our expertise, innovation, and dedication help shape the educational sector, making quality education accessible and attainable for all.</p>                              </div>
                                <div className="tab-pane fade" id="v-pills-what-do-we-offer" role="tabpanel" aria-labelledby="v-pills-what-do-we-offer-tab">
                                    <p className="text-black">
                                        As an educational service provider, we offer numerous services for students and the institutes we work with. We strive to find the best feasible fit for our students while also taking into consideration their personal objectives and career goals.
                                    </p>
                                    <h2 className='fw-bold text-black f20'>For Students:
                                    </h2>

                                    <table className="table table-responsive table-bordered tablecustom-border">
                                        <tbody className="text-center">
                                            <tr>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/Career_Counselling.png" width={50} height={50} alt="Career Counselling" loading="lazy" />
                                                        <h6 className="text-black fw-bold pt-3">Career Counselling</h6>
                                                    </div>
                                                </td>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/Mentoring_for_Entrance_Exams.png" width={50} height={50} alt="Mentoring for Entrance Exams" loading="lazy" />
                                                        <h6 className="text-black fw-bold pt-3">Mentoring for Entrance Exams</h6>
                                                    </div>
                                                </td>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/Assistance.png" width={50} height={50} alt="Assistance for Educational Loans and Scholarships" loading="lazy"
                                                        />
                                                        <h6 className="text-black fw-bold pt-3">Assistance for Educational Loans and Scholarships</h6>
                                                    </div>

                                                </td>
                                                <td className="d-block d-md-table-cell">

                                                    <div className="col">
                                                        <img src="/images/aboutus/Seat_Reservation_Facilities.png" width={50} height={50} alt="Seat Reservation Facilities" loading="lazy"
                                                        />
                                                        <h6 className="text-black fw-bold pt-3">Seat Reservation Facilities</h6>
                                                    </div>

                                                </td>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/facilitate.png" width={50} height={50} alt="Facilitate Direct Meetings with Colleges and Universities" loading="lazy"
                                                        />
                                                        <h6 className="text-black fw-bold pt-3">Facilitate Direct Meetings with Colleges and Universities</h6>
                                                    </div>

                                                </td>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/nri.png" width={50} height={50} alt="  NRI Admission Assistance" loading="lazy"
                                                        />
                                                        <h6 className="text-black fw-bold pt-3">  NRI Admission Assistance</h6>
                                                    </div>

                                                </td>
                                                <td className="d-block d-md-table-cell">
                                                    <div className="col">
                                                        <img src="/images/aboutus/assistance_to_Pay.png" width={50} height={50} alt="Assistance to Pay Fees via EMI" loading="lazy"
                                                        />
                                                        <h6 className="text-black fw-bold pt-3">    Assistance to Pay Fees via EMI</h6>
                                                    </div>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>



                                    <h2 className='fw-bold text-black f20 pt-3'>For Colleges and Universities:
                                    </h2>
                                    <div className="table-responsive">
                                        <table className="table table-responsive table-bordered tablecustom-border">
                                            <tbody className="text-center">
                                                <tr>
                                                    <td className="d-block d-md-table-cell">
                                                        <div>
                                                            <img src="/images/aboutus/Branding.png" width={50} height={50} alt="Branding and Visibility" loading="lazy"
                                                            />
                                                            <h6 className="text-black fw-bold pt-3">Branding and Visibility</h6>
                                                        </div>
                                                    </td>
                                                    <td className="d-block d-md-table-cell">
                                                        <div>
                                                            <img src="/images/aboutus/Lead_Generation.png" width={50} height={50} alt="Lead Generation for Admissions" loading="lazy"
                                                            />
                                                            <h6 className="text-black fw-bold pt-3">Lead Generation for Admissions</h6>
                                                        </div>
                                                    </td>
                                                    <td className="d-block d-md-table-cell">
                                                        <div>
                                                            <img src="/images/aboutus/Collaborative.png" width={50} height={50} alt="Collaborative Promotional Events" loading="lazy"
                                                            />
                                                            <h6 className="text-black fw-bold pt-3">Collaborative Promotional Events</h6>
                                                        </div>
                                                    </td>
                                                    <td className="d-block d-md-table-cell">
                                                        <div>
                                                            <img src="/images/aboutus/Social_Media.png" width={50} height={50} alt="Social Media Management" loading="lazy"
                                                            />
                                                            <h6 className="text-black fw-bold pt-3">Social Media Management</h6>
                                                        </div>
                                                    </td>
                                                    <td className="d-block d-md-table-cell">
                                                        <div>
                                                            <img src="/images/aboutus/Digital_Marketing.png" width={50} height={50} alt="Digital Marketing" loading="lazy"
                                                            />
                                                            <h6 className="text-black fw-bold pt-3">Digital Marketing</h6>
                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-pills-why-choose-us" role="tabpanel" aria-labelledby="v-pills-why-choose-us-tab">
                                    Providing admissions guidance is about more than just helping students enroll into their preferred college to study a course of their interest. It is about helping candidates lay the foundational stones for the life they desire to lead in the future. The appropriate education in a student’s career can enable them to improve their standards of living and make life-altering contributions to society. It also makes them sufficiently qualified to build a sustainable future for themselves and others. We, at Learntech, understand and value the importance of the right education in a candidate's life. This is why our seasoned experts work tirelessly to ensure that students achieve their ambitions efficiently and reliably. The determination of our counsellors to help students build their dream careers motivates them to overcome unprecedented challenges.                             </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Overview;
