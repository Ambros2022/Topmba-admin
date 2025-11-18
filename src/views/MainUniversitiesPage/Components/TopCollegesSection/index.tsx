import Link from 'next/link';
import React, { useState } from 'react';

function TopUniversitiesSection({ data = {} }: { data?: { meta_title?: string, top_description?: string } }) {
    // const [showMore, setShowMore] = useState(false);

    // const handleToggleReadMore = () => {
    //     setShowMore(!showMore);
    // };
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 2000; // Adjust this value to change when the "Read More" button appears

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const renderDescription = () => {
        if (!data.top_description) return null;

        if (data.top_description.length <= maxLength || isExpanded) {
            return <div dangerouslySetInnerHTML={{ __html: data.top_description }} />;
        }

        const truncatedText = data.top_description.slice(0, maxLength) + '...';
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
                <div className='text-center'>
                    <button
                        onClick={toggleReadMore}
                        className="btn viewMoreClgBtn"
                    >
                        Read More
                    </button>
                </div>
            </>
        );
    };
    return (
        <>
            <section className='bg-white'>
                <section className="container InnerCollegeNavigationLink linkFontSize pt-2">
                    <p className='mb-3'><Link href="/">Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Universities</span></p>
                </section>
                <div className='container innerClg pt-3 pt-md-5 pb-3'>
                    <h2 className='text-center fw-bold text-blue mb-3'>Best Universities in India
                    </h2>
                    {renderDescription()}
                    {isExpanded && (
                        <div className='text-center'>
                            <button
                                onClick={toggleReadMore}
                                className="btn viewMoreClgBtn"
                            >
                                Read Less
                            </button>
                        </div>
                    )}
                    {/* <p className='text-black'>It is of utmost importance for every academic enthusiast to find the right university. Choosing the right university provides a strong foundation to build upon and move forward, thus embarking on an intellectual journey that is best suited for you. The best universities in India are designed to not only meet the academic requirements of students but also to address their co-curricular needs. The most prestigious universities in India take a comprehensive approach to offer their students with the necessary skills that are both subject-specific and life-oriented.
                    </p>
                    <h4 className='fw-bold text-black mb-4'>What can Top-Ranked Universities in India do for Your Academic and Non-Academic Pursuits?
                    </h4>
                    <h5 className='fw-bold text-black mb-3'>Academic Pursuits: </h5>

                    <h6 className='fw-bold text-black'>
                        <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Expert Faculty:</h6>

                    <p className='text-black'>One of the primary reasons for the best universities in India to achieve academic excellence is the presence of expert faculty members. Through these experts, universities provide students with the opportunity to gain advanced knowledge, thereby enriching their academic aspirations.</p>
                    <h6 className='fw-bold text-black'>
                        <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Quality Education:</h6>

                    <p className='text-black'>The curriculum offered by UGC-approved universities in India is designed by experts across various disciplines. The subject-specific curriculum takes a holistic approach to ensure that students are equipped with adequate knowledge and the most effective skills that are related to their preferred discipline.
                    </p>
                    {showMore && (
                        <>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Research Opportunities:</h6>

                            <p className='text-black'>Many top universities in India feature research facilities that are curated to apply the theoretical aspects of a discipline to practical applications. Thus, providing opportunities for students to primarily focus on making advancements in the real world while retaining the foundational principles of the same.
                            </p>

                            <h5 className='fw-bold text-black mb-3'>Non-Academic Pursuits: </h5>

                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Extra Curricular Activities:</h6>

                            <p className='text-black'>The best public universities and the best private universities in India offer various extra-curricular activities, such as sports, cultural events and innovative clubs to help students embrace and bring out their innate talents.
                            </p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Networking and Career Opportunities:</h6>

                            <p className='text-black'>All the good universities in India offer students significant opportunities to connect with prominent industry professionals, peers, and alumni groups through various events such as networking sessions, guest lectures, workshops, seminars, industry visits and more. These opportunities can help students land internships and secure rewarding job prospects.
                            </p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Community Engagement:</h6>

                            <p className='text-black'>From the best government universities to the top private universities in India, students are encouraged to participate in community service and volunteer work. By doing so, these top-ranked universities of India enables them to contribute to the overall growth of society.

                            </p>



                            <h4 className='fw-bold text-black mb-4'>Types of Universities:
                            </h4>

                            <p className='text-black'>All Indian universities in world rankings are categorised into three types. Namely,  Public universities, Private universities and Deemed universities. These categories are primarily differentiated based on their funding and administrative system. Let us dive into the specifics of each category to help you make a transformative decision that can benefit you now and in the future.
                            </p>

                            <h5 className='fw-bold text-black mb-3'>Public Universities:</h5>


                            <p className='text-black'>Public universities, also known as government universities, are higher educational institutions that are established and funded by the respective government authorities. The overall functions of public universities are regulated by the same. Under this category, there are two primary classifications: Central universities and State universities.

                            </p>

                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>Central Universities:</h6>

                            <p className='text-black'>This category consists of the best government universities in India that are established and governed under the direct regulations of the central government. The rules and policies set forth by the central government will be applicable uniformly to all the central universities. Moreover, the admissions for certain courses in these universities are usually based on national-level entrance exams.


                            </p>
                            <h6 className='fw-bold text-black'>
                                <i className='bi bi-circle-fill me-2' style={{ fontSize: '10px' }}></i>State Universities:</h6>

                            <p className='text-black'>This category consists of a list of the top universities in India that are funded by their respective state governments. These universities are under the direct governance of the concerned state authority. The admission process for these universities will vary from one state university to another and are based on both the national-level and state-level entrance exams. However, in some situations, these universities may also to receive grants from the central government as well.


                            </p>
                            <h5 className='fw-bold text-black mb-3'>Private Universities:</h5>
             

                            <p className='text-black'>Some of the most prestigious universities in India fall under this category. Private universities are educational entities that are established by private bodies, trusts, or organisations and are primarily funded by the same authoritative bodies, as well as through tuition fees. They may also receive grants and contributions from external sources such as private corporations, alumni organisations, philanthropists, and foundations. Moreover, these universities have their own governing bodies and are given the flexibility to establish policies regarding admissions, curriculum, and faculty selections, provided they align with the regulations of the government authorities.


                            </p>
                            <h5 className='fw-bold text-black mb-3'>Deemed Universities:</h5>
                        

                            <p className='text-black'>Deemed universities in India are institutions that are granted the ‘university status’ by the University Grants Commission (UGC), Department of Higher Education, and Ministry of Education based on certain factors such as academic excellence, research facilities, and their overall contribution to higher education. These universities are offered a higher level of autonomy and independence in making decisions regarding courses, fees, admissions and curriculum. Deemed universities in India are authorised to receive government funding and can also generate revenue through tuition fees, donations and collaborations.

                            </p>






                            <h4 className='fw-bold text-black mb-4'>Category Wise Highlights:
                            </h4>
                            <div className="table-responsive">
                                <table className='table text-black table-bordered table-responsive text-center   align-middle  '>

                                    <thead className="thead-dark">
                                        <tr>
                                            <th className='fw-bold text-black align-middle ' scope="col" rowSpan={2} colSpan={2}>
                                                Categories
                                            </th>
                                            <th className='fw-bold text-black' scope="col" colSpan={3}>
                                                Types of Universities
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className='fw-bold text-black' scope="col" >
                                                Public
                                            </th>
                                            <th className='fw-bold text-black' scope="col" >
                                                Private
                                            </th>
                                            <th className='fw-bold text-black' scope="col" >
                                                Deemed
                                            </th>
                                        </tr>


                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2} >
                                                Ownership
                                            </td>
                                            <td  >
                                                Central/ State Government

                                            </td>
                                            <td  >
                                                Private entities, trusts, organisations, educational societies.

                                            </td>
                                            <td  >
                                                Can be owned by government or private bodies

                                            </td>


                                        </tr>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2}>
                                                Funding
                                            </td>
                                            <td  >
                                                By Central/ State Government


                                            </td>
                                            <td  >

                                                Through tuition fees, private entities, trusts, etc


                                            </td>
                                            <td  >
                                                By a combination of tuition fees, donations and government grants



                                            </td>


                                        </tr>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2}>
                                                Establishment
                                            </td>
                                            <td  >
                                                Established under a government act


                                            </td>
                                            <td  >

                                                Established by private entities



                                            </td>
                                            <td  >
                                                Granted ‘University Status’ by UGC, Ministry of Education


                                            </td>


                                        </tr>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2}>
                                                Autonomy
                                            </td>
                                            <td  >
                                                Limited autonomy



                                            </td>
                                            <td  >

                                                Comparatively higher autonomy than public universities


                                            </td>
                                            <td  >
                                                Greater autonomy than public and private universities


                                            </td>


                                        </tr>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2}>
                                                Tuition Fees
                                            </td>
                                            <td  >
                                                Lower Fees compared to private universities



                                            </td>
                                            <td  >

                                                Higher than public universities



                                            </td>
                                            <td  >
                                                Will vary.
                                                May be similar to private universities/ similar to government universities


                                            </td>


                                        </tr>
                                        <tr>

                                            <td className='fw-bold text-black' colSpan={2}>
                                                Programs Offered

                                            </td>
                                            <td  >
                                                Wide range of courses across various disciplines



                                            </td>
                                            <td  >

                                                Will vary.
                                                May offer courses with specialisations in certain fields




                                            </td>
                                            <td  >
                                                Will Vary.
                                                Mostly focus on courses under specific areas of study and professional education


                                            </td>


                                        </tr>


                                    </tbody>
                                </table>

                            </div>

                        </>
                    )}
                    <div className='text-center'>
                        <button onClick={handleToggleReadMore} className='btn  viewMoreCollegeBtn'>
                            {showMore ? 'Read Less' : 'Read More'}
                        </button>
                    </div> */}
                </div>
            </section>
        </>
    );
}

export default TopUniversitiesSection;
