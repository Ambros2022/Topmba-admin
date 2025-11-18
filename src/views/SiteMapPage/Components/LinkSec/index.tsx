import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'


const LinkSec = () => {
    const [data, setData] = useState<any>(null);


    const getMaps = useCallback(async () => {

        try {
            const roleparams: any = {}
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/sitemap/get', { params: roleparams });
            setData(response.data.data);

            console.log(response);

        } catch (err) {
            console.error(err);
            console.error(err);
        }
    }, []);


    useEffect(() => {
        getMaps();
    }, [getMaps]);




    return (
        <>
            <section className='bg-white siteMapSec py-2'>
                <div className="container">
                    <div className='py-2'>
                        <h2 className='fw-bold text-blue mb-3'>Information</h2>
                        <div className="row text-black">
                            <div className="col-md-3">
                                <ul>
                                    <li><Link href='/' className='text-black'>Home</Link></li>
                                    <li><Link href='/about-us' className='text-black'>About Us</Link></li>
                                    <li><Link href='/contact-us' className='text-black'>Contact Us</Link></li>
                                    <li><Link href='/exams' className='text-black'>Exams</Link></li>
                                    <li><Link href='/career' className='text-black'>Careers</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul>
                                    <li><Link href='/services' className='text-black'>Services</Link></li>
                                    <li><Link href='/nri-quota' className='text-black'>NRI Quota</Link></li>
                                    <li><Link href='/news' className='text-black'>News</Link></li>
                                    <li><Link href='/blogs' className='text-black'>Blogs</Link></li>
                                    <li><Link href='/education-loan' className='text-black'>Educational Loan</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul>
                                    <li><Link href='/scholarships' className='text-black'>Scholarships</Link></li>
                                    <li><Link href='/students-speak' className='text-black'>Student's Speak</Link></li>
                                    <li><Link href='/study-in-usa' className='text-black'>Study Abroad</Link></li>
                                    <li><Link href='/boards' className='text-black'>Boards</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <ul>
                                    <li><Link href='/our-team' className='text-black'>Our team</Link></li>
                                    <li><Link href='/privacy-policy' className='text-black'>Privacy Policy</Link></li>
                                    <li><Link href='/terms-and-conditions' className='text-black'>Term & Condition</Link></li>
                                    <li><Link href='/disclaimer' className='text-black'>Disclaimer</Link></li>
                                </ul>
                            </div>
                        </div>
                        {data && (
                            <>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Colleges</h2>
                                    <div className="row text-black">
                                        {data.college.map(college => (
                                            <div key={college.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/college/${college.id}/${college.slug}`} className='text-black'>{college.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Universities</h2>
                                    <div className="row text-black">
                                        {data.university.map(university => (
                                            <div key={university.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/university/${university.id}/${university.slug}`} className='text-black'>{university.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Schools</h2>
                                    <div className="row text-black">
                                        {data.school.map(school => (
                                            <div key={school.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/school/${school.id}/${school.slug}`} className='text-black'>{school.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Scholarships</h2>
                                    <div className="row text-black">
                                        {data.scholarships.map(scholarships => (
                                            <div key={scholarships.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/scholarship/${scholarships.id}/${scholarships.slug}`} className='text-black'>{scholarships.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>School Boards</h2>
                                    <div className="row text-black">
                                        {data.schoolboards.map(schoolboards => (
                                            <div key={schoolboards.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/board/${schoolboards.id}/${schoolboards.slug}`} className='text-black'>{schoolboards.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>General Course</h2>
                                    <div className="row text-black">
                                        {data.generalcourse.map(generalcourse => (
                                            <div key={generalcourse.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/course/${generalcourse.id}/${generalcourse.slug}`} className='text-black'>{generalcourse.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Streams</h2>
                                    <div className="row text-black">
                                        {data.stream.map(stream => (
                                            <div key={stream.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/course/${stream.id}}`} className='text-black'>{stream.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Exams</h2>
                                    <div className="row text-black">
                                        {data.exam.map(exam => (
                                            <div key={exam.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/exam/${exam.id}/${exam.slug}`} className='text-black'>{exam.exam_title}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>Blogs</h2>
                                    <div className="row text-black">
                                        {data.blog.map(blog => (
                                            <div key={blog.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/blog/${blog.id}/${blog.slug}`} className='text-black'>{blog.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='py-2'>
                                    <h2 className='fw-bold text-blue mb-3'>News & Events</h2>
                                    <div className="row text-black">
                                        {data.newsandevents.map(newsandevents => (
                                            <div key={newsandevents.id} className="col-md-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/news/${newsandevents.id}/${newsandevents.slug}`} className='text-black'>{newsandevents.name}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default LinkSec
