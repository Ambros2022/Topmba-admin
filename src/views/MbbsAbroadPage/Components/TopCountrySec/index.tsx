import React, { useState } from 'react'
import CategoryCarousel from '../CategoryCarousel'; 

const TopCountrySec = () => {
    const countries = [
        {
            name: 'Armenia',
            flag: '/images/icons/armenia-flag.webp',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6100.645896291943!2d44.51859604184559!3d40.13508948845406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abbe6e9f27fef%3A0xddc0db39386c308c!2sArmenian%20Medical%20Institute!5e0!3m2!1sen!2sin!4v1720163224650!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Armenia is popularly known for prioritizing education, resulting in primary education in the country
                                being completely free. Moreover, the top colleges of Armenia provide courses that are affordable for all
                                students.
                            </p>
                            <p className='text-black'>
                                Students have an amazing opportunity to delve into the culture of Armenia through their 4000 historical
                                monuments. The numerous internship opportunities available in the country helps them gain useful
                                experiences.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Armenian Medical Institute:</h3>
                            <p className='text-black'>
                                Established in 1990, Armenian Medical Institute is one of the largest universities in Armenia. It ranks
                                2nd in the entire country and provides a range of facilities. In fact, the University has the 3rd
                                largest library in the entire country. Students who join this university get to learn different skills
                                from around 250 medical professionals and specialists.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>6500 USD or INR 4,55,000*</td>
                                        <td>500 USD or INR 35,000*</td>
                                        <td>430 USD or INR 30,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4000 USD or INR 2,80,000*</td>
                                        <td>500 USD or INR 35,000*</td>
                                        <td>430 USD or INR 30,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Georgia',
            flag: '/images/icons/ge.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.711175023735!2d44.75477629999999!3d41.7267509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044731c13a9f3b3%3A0xac94c53b52ac8277!2sTbilisi%20State%20Medical%20University!5e0!3m2!1sen!2sin!4v1720163486732!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Georgia is known for its mixed European and Asian culture. The country has a beautiful atmosphere and a low crime rate. The top colleges of Georgia charge lower fees when compared to the Indian colleges. The cost of living is also surprisingly low for Indian students.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Tbilisi State Medical University :</h3>
                            <p className='text-black'>
                                Tbilisi State Medical University was established in 1918. More than 10,000 students study undergraduate and postgraduate programs provided by the institution. It is ranked at the 8th position among the higher educational institutions in Georgia. Since its establishment, the university has produced around 40,000 doctors.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>5500 USD or INR 3,85,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>5500 USD or INR 3,85,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <h3 className='text-blue mt-3 fw-bold'>Caucasus International University :</h3>
                    <p className='text-black'>
                        Caucasus International University, established in 1995 attracts many foreign students to the country. Around 4000-5000 students study at the university. Even though it was founded just a few decades ago, it has managed to become one of the top medical institutions in the country.
                    </p>
                    <table
                        className='table table-bordered text-center table-responsive overflow-scroll'
                        style={{ border: '1px solid #274896' }}
                    >
                        <thead>
                            <tr>
                                <th className='text-blue bg-skyBlue'>Year of Study</th>
                                <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fw-bold'>I Year</td>
                                <td>5500 USD or INR 3,85,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>II - VI Year</td>
                                <td>5500 USD or INR 3,85,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className='text-blue mt-3 fw-bold'>Georgian American University :</h3>
                    <p className='text-black'>
                        The Georgian American University, founded in 2005, highly emphasizes on providing quality education. The university ranks among the top 30 universities in the country. It follows the international standards of education. It also has student exchange programs with different leading institutions around the world.
                    </p>
                    <table
                        className='table table-bordered text-center table-responsive overflow-scroll'
                        style={{ border: '1px solid #274896' }}
                    >
                        <thead>
                            <tr>
                                <th className='text-blue bg-skyBlue'>Year of Study</th>
                                <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                <th className='text-blue bg-skyBlue'>Hostel Fee / Year </th>
                                <th className='text-blue bg-skyBlue'>Food Charges / Year </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='fw-bold'>I Year</td>
                                <td>4700 USD or INR 3,29,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                            <tr>
                                <td className='fw-bold'>II - VI Year</td>
                                <td>4700 USD or INR 3,29,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                                <td>1500 USD or INR 1,05,000*</td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                </div>
            )
        },
        {
            name: 'Philippines',
            flag: '/images/icons/phi.jpg',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.346451118551!2d125.60698579999999!3d7.0857759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d088796b397%3A0xd09a123f2ba20380!2sDavao%20Medical%20School%20Foundation%20Inc!5e0!3m2!1sen!2sin!4v1720163546042!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                The Philippines is another popular destination for higher education among Indian students. The total educational cost for studying in the Philippines is less when compared to India. Moreover, the American teaching format and the American accent used in the colleges and institutes of the country makes it the best place to pursue higher studies for Indians.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Davao Medical School Foundation :</h3>
                            <p className='text-black'>
                                Davao Medical School Foundation was established in 1976. The university provides education on primary health care, integral health sciences, and community health care. The University is ranked in the 6th position among the top institutions in the Philippines. It is also affiliated with 7 hospitals to provide maximum practical experience to the students.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee and Food Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>10000 USD or INR 7,00,000*</td>
                                        <td>2050 USD or INR 1,44,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>5100 USD or INR 3,57,000*</td>
                                        <td>2050 USD or INR 1,44,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Russia',
            flag: '/images/icons/ru.avif',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2181.1466851934956!2d35.8995532!3d56.8605795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b68655d3066527%3A0xf22def0dcc228da8!2sTver%20State%20Medical%20University!5e0!3m2!1sen!2sin!4v1720163585357!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Russia is a country that continues to create a global impact in modern times. The colleges and universities in Russia are equipped with the latest technologies and facilities. The professors are highly qualified and use advanced teaching methods which enables the students to learn easily and also helps to develop practical experiences. The students who study in Russia develop a sense of self-dependency, responsibility, and determination.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Tver State Medical University :</h3>
                            <p className='text-black'>
                                Tver State Medical University is a centre that forms partnerships and collaborates with many other international organizations to bring the best educational experience for students. The history of Tver State Medical University dates back to the year 1902, during which it was established. Since then, it has made a lot of achievements in the fields of education and research.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>2900 USD or INR 2,03,000*</td>
                                        <td>250 USD or INR 17,500*</td>
                                        <td>440 USD or INR 30,800*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>2900 USD or INR 2,03,000*</td>
                                        <td>250 USD or INR 17,500*</td>
                                        <td>440 USD or INR 30,800*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Ukraine',
            flag: '/images/icons/ua.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.5597040751563!2d28.446470799999997!3d49.2278767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472d5c7f91a0a895%3A0x9e3cb2d36b6d7bbe!2sVinnytsia%20National%20Pirogov%20Medical%20University!5e0!3m2!1sen!2sin!4v1720163770252!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Ukraine has constantly gained popularity among international students for its world-class education facilities in higher education. The cost of living for Indian students is less in Ukraine. The educational environment in the country is also very good as they provide 1 teacher for every 14 students. As a result, each and every student gets equal attention and proper guidance from the professors.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Bogomolets Kyiv National Medical University :</h3>
                            <p className='text-black'>
                                Bogomolets Kyiv National Medical University was established in 1841. More than 10,000 students receive training at this institution in the medical science field. It is known to be the best medical university in Ukraine.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                        <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>8400 USD or INR 2,03,000*</td>
                                        <td>1000 USD or INR 70,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4500 USD or INR 2,03,000*</td>
                                        <td>1000 USD or INR 70,000*</td>
                                        <td>1500 USD or INR 1,05,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 className='text-blue mt-3 fw-bold'>Lviv National Medical University :</h3>
                        <p className='text-black'>
                        Lviv National Medical University was founded in 1784. It is ranked among the top 3 universities in the country and has around 22 scientific schools actively functioning. Its library is well known as it has more than 5,30,000 books along with online resources.
                        </p>
                        <table
                            className='table table-bordered text-center table-responsive overflow-scroll'
                            style={{ border: '1px solid #274896' }}
                        >
                            <thead>
                                <tr>
                                    <th className='text-blue bg-skyBlue'>Year of Study</th>
                                    <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                    <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                    <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-bold'>I Year</td>
                                    <td>7700 USD or INR 5,39,000*</td>
                                    <td>800 USD or INR 56,000*</td>
                                    <td>1300 USD or INR 91,000*</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>II - VI Year</td>
                                    <td>4900 USD or INR 3,43,000*</td>
                                    <td>800 USD or INR 56,000*</td>
                                    <td>1300 USD or INR 91,000*</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3 className='text-blue mt-3 fw-bold'>Vinnitsa National Medical University :</h3>
                        <p className='text-black'>
                        Vinnitsa National Medical University was established in 1921. It was awarded the Order of the Badge of Honour in 1984. It acquired the status of University in 1994, after which it equipped itself with modern teaching facilities. The university has been in the leading position since the past few years, according to the Ministry of Health of Ukraine.
                        </p>
                        <table
                            className='table table-bordered text-center table-responsive overflow-scroll'
                            style={{ border: '1px solid #274896' }}
                        >
                            <thead>
                                <tr>
                                    <th className='text-blue bg-skyBlue'>Year of Study</th>
                                    <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                    <th className='text-blue bg-skyBlue'>Hostel Fee / Year</th>
                                    <th className='text-blue bg-skyBlue'>Food Charges / Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='fw-bold'>I Year</td>
                                    <td>8000 USD or INR 5,60,000*</td>
                                    <td>600 USD or INR 42,000*</td>
                                    <td>1300 USD or INR 91,000*</td>
                                </tr>
                                <tr>
                                    <td className='fw-bold'>II - VI Year</td>
                                    <td>5000 USD or INR 3,50,000*</td>
                                    <td>600 USD or INR 42,000*</td>
                                    <td>1300 USD or INR 91,000*</td>
                                </tr>
                            </tbody>
                        </table>
                        <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                    </div>
                </div>
            )
        },
        {
            name: 'Moldova',
            flag: '/images/icons/md.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.313994042445!2d28.817648300000002!3d47.0340691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97dc7f48e142d%3A0xccecb7104ac4ea09!2sNicolae%20Testemi%C8%9Banu%20State%20University%20of%20Medicine%20and%20Pharmacy!5e0!3m2!1sen!2sin!4v1720164144676!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Moldova provides the perfect environment for students to study and complete their education in a stress-free manner. Studying and doing an internship in Moldova will provide the students with a unique and unforgettable experience that will be useful in their careers.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Nicolae Testemitanu State University of Medicine and Pharmacy :</h3>
                            <p className='text-black'>
                                Nicolae Testemitanu State University of Medicine and Pharmacy was established in 1945 and imparts education to more than 6000 students. The university ranks among the top 6000 universities globally. It has a Medical Scientific Library that plays a crucial role in the training and research process of the students. It also has International alliances with many top educational institutions in the world.
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee </th>
                                        <th className='text-blue bg-skyBlue'>Hostel Fee + Food / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>4420 EUR or INR 3,75,700*</td>
                                        <td>1500 EUR or INR 1,27,500*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - VI Year</td>
                                        <td>4300 EUR or INR 3,65,500*</td>
                                        <td>1500 EUR or INR 1,27,500*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>
                                *Fee in INR subject to change according to EUR rate                                </h6>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Uzbekistan',
            flag: '/images/icons/uz.png',
            data: (
                <div className='container bg-skyBlue rounded p-3 mt-3'>
                    <div className='row'>
                        <div className='col-xl-4 col-lg-4 col-md-5'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.766994664738!2d69.176029!3d41.357417999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8e9253333259%3A0x8a4d58aed9f6807f!2sTashkent%20Medical%20Academy!5e0!3m2!1sen!2sin!4v1720164195296!5m2!1sen!2sin'
                                width='100%'
                                height='100%'
                                className=' p-1 bg-blue rounded'
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            ></iframe>
                        </div>
                        <div className='col-xl-8 col-lg-8 col-md-7'>
                            <h3 className='text-black'></h3>
                            <p className='text-black'>
                                Uzbekistan is a country located in Central Asia. It has developed into a country with a mix of Soviet-style architecture and ancient Islamic architecture. It is slowly turning into a popular choice for students who want to undertake higher studies in foreign countries. Every year, students from India, Bangladesh, Bhutan, Nepal, Pakistan, and many other countries move to Uzbekistan to pursue their higher studies.
                            </p>
                            <h3 className='text-blue mt-3 fw-bold'>Tashkent Medical Academy :</h3>
                            <p className='text-black'>
                                Tashkent Medical Academy was established in 1919. It ensures to train the students as professionals so that they can contribute to the overall development of the healthcare system. The academy has seven specialized scientific councils along with the main research unit called the Central Research Laboratory (CRL).
                            </p>
                            <table
                                className='table table-bordered text-center table-responsive overflow-scroll'
                                style={{ border: '1px solid #274896' }}
                            >
                                <thead>
                                    <tr>
                                        <th className='text-blue bg-skyBlue'>Year of Study</th>
                                        <th className='text-blue bg-skyBlue'>Tuition Fee + Hostel Fee + Food / Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='fw-bold'>I Year</td>
                                        <td>8700 USD or INR 6,09,000*</td>
                                    </tr>
                                    <tr>
                                        <td className='fw-bold'>II - V Year</td>
                                        <td>5700 USD or INR 3,99,000*</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className='fw-bold text-black'>*Fee in INR subject to change according to USD rate</h6>
                        </div>
                    </div>
                </div>
            )
        }
    ]

    const [activeTab, setActiveTab] = useState(countries[0].name)

    const handleTabClick = name => {
        setActiveTab(name)
    }

    return (
        <section className='topCountryLinks bg-white pb-3'>
            <div className='container bg-skyBlue rounded mb-3 py-3 px-4'>
                <h2 className='text-blue text-center py-3 fw-bold mb-3'>Top 7 Countries to Study MBBS Abroad</h2>
                <div className="row ">
                    <div className="col-12 mbbs px-2">
                        <CategoryCarousel items={countries} handleTabClick={handleTabClick} activeTab={activeTab} />
                    </div>
                </div>
                {/* <ul className='nav nav-pills d-flex gap-3 flex-wrap flex-md-row flex-column' id='pills-tab' role='tablist'>
                    {countries.map((country, index) => (
                        <li className='nav-item rounded' key={index}>
                            <button
                                className={` d-flex nav-link ${country.name === activeTab ? 'active' : ''}`}
                                id={`pills-${country.name}-tab`}
                                data-bs-toggle='pill'
                                data-bs-target={`#pills-${country.name}`}
                                type='button'
                                role='tab'
                                aria-controls={`pills-${country.name}`}
                                aria-selected={country.name === activeTab ? 'true' : 'false'}
                                onClick={() => handleTabClick(country.name)}
                            >
                                <img src={country.flag} width={30} height={30} alt={`${country.name}-flag`} className='me-2 rounded' />
                                {country.name}
                            </button>
                        </li>
                    ))}
                </ul> */}
                <div className='tab-content' id='pills-tabContent'>
                    {countries.map((country, index) => (
                        <div
                            className={`tab-pane fade ${country.name === activeTab ? 'show active' : ''}`}
                            id={`pills-${country.name}`}
                            role='tabpanel'
                            aria-labelledby={`pills-${country.name}-tab`}
                            key={index}
                        >
                            {country.data}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopCountrySec
