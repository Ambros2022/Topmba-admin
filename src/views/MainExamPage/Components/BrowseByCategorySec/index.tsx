import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const CategoryCarousel = dynamic(() => import('./CategoryCarousel'), { ssr: false, });
// import CategoryCarousel from './CategoryCarousel'; // Adjust the import path as necessary
const NewsList = dynamic(() => import('../newsList'), { ssr: false, });
// import NewsList from '../newsList';
// import NewsListAbroad from '../newsListAbroad';
const NewsListAbroad = dynamic(() => import('../newsListAbroad'), { ssr: false, });
const ExamCard = dynamic(() => import('../ExamCardList'), { ssr: false, });
import axios from 'src/configs/axios';
const SideContactUsForm = dynamic(() => import('src/@core/components/popup/SideContactUsForm'), { ssr: false, });
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Link from 'next/link';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';


const BrowsebyCategorySec = ({ countryData, streams }) => {
    const { streamId, setStreamId } = useAuth();
    const [scholarshipsData, setScholarshipsData] = useState<any>([]);  // Use any type for tabs
    const [scholarshipData, setScholarshipData] = useState<any>([]);  // Use any type for tabs
    const [items, setItems] = useState<{ id: string; title: string }[]>([]);
    const [examsData, setExamsData] = useState({});
    const [newsData, setNewsData] = useState([]);
    const [newsDataAbroad, setNewsDataAbroad] = useState([]);
    const isMountedRef = useIsMountedRef();
    const [searchText, setSearchText] = useState('');
    const [formData, setFormData] = useState({
        level_of_study: '',
        types_of_exam: '',
        stream_id: '',
        country_id: '',
        deadline: ''
    });
    const perPage = 9; // Number of items per page

    const router = useRouter();


 

    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    // Exam pagination state
    const [currentExamPage, setCurrentExamPage] = useState(1);
    const [totalExamPages, setTotalExamPages] = useState(1);
    const examsPerPage = 9;

    // Scholarship pagination state
    const [currentScholarshipPage, setCurrentScholarshipPage] = useState(1);
    const [totalScholarshipPages, setTotalScholarshipPages] = useState(1);
    const scholarshipsPerPage = 9;


    const handleClearAll = () => {
        setFormData({
            level_of_study: '',
            types_of_exam: '',
            stream_id: '',
            country_id: '',
            deadline: ''
        });
    };

    const handleSelectChange = (e) => {
        setSearchText("");
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const getScholarship = useCallback(async (country_id, level_of_study, types_of_exam, stream_id) => {
        setIsLoading(true);
        try {
            const params = {
                country_id: country_id !== '' ? country_id : undefined,
                level_of_study: level_of_study !== '' ? level_of_study : undefined,
                types_of_exam: types_of_exam !== '' ? types_of_exam : undefined,
                stream_id: stream_id !== '' ? stream_id : undefined,
                searchfrom: 'name',
                searchtext: searchText,
                page: currentScholarshipPage,
                size: scholarshipsPerPage,
                isIndia: 'false'
            };

            let url = 'api/website/exams/get';

            const response = await axios.get(url, { params });
            setScholarshipsData(response.data.data);

            setTotalScholarshipPages(Math.ceil(response.data.totalItems / scholarshipsPerPage));
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isMountedRef, formData, searchText, scholarshipsPerPage, currentScholarshipPage]);


    const getScholarships = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                size: 1000,
                page: 1,
                isIndia: 'false'
            };

            let url = 'api/website/exams/get';

            const response = await axios.get(url, { params });
            setScholarshipData(response.data.data);
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isMountedRef]);



    useEffect(() => {
        getScholarship(formData.country_id, formData.level_of_study, formData.types_of_exam, formData.stream_id);
    }, [formData, getScholarship, currentScholarshipPage]);


    const getCategoriesData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/stream/get?page=1&size=50');
            if (response.data.status === 1) {
                const categories = response.data.data.map(category => ({
                    id: category.id,
                    title: category.name
                }));
                // Add "All" category
                setItems([{ id: 'all', title: 'All Exams' }, ...categories]);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, [isMountedRef]);

    const getExamsData = useCallback(async (id, page = 1) => {
        try {
            const roleparams = { page, size: examsPerPage, isIndia: 'true' };
            const url = id === 'all' ? 'api/website/exams/get' : `api/website/exams/get?stream_id=${id}`;
            const response = await axios.get(url, { params: roleparams });

            if (response.data.status === 1) {
                setExamsData(prevState => ({
                    ...prevState,
                    [id]: response.data.data
                }));
                setTotalExamPages(response.data.totalPages);
            } else {
                console.error('Failed to fetch exams');
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    }, [examsPerPage]);

    const getnews = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 15, orderby: 'desc', columnname: 'created_at', country_id: 204., includeIndia: true };
            const response = await axios.get('/api/website/news/get', { params: roleparams });
            setNewsData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    const getabroadnews = useCallback(async () => {
        try {
            const roleparams = { page: 1, size: 15, orderby: 'desc', columnname: 'created_at', includeIndia: false };
            const response = await axios.get('/api/website/news/get', { params: roleparams });
            setNewsDataAbroad(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getCategoriesData();
        getnews();
        getScholarships();
        getabroadnews();
    }, [getCategoriesData, getabroadnews, getnews, getScholarships]);
    useEffect(() => {

        if (streamId) {

            setActiveTab(streamId)
            setStreamId(null)
        }


    }, [router, router.isReady]);

    useEffect(() => {
        if (activeTab) {
            getExamsData(activeTab, currentPage);
        }
    }, [activeTab, currentPage, getExamsData]);

    const handleTabClick = (id) => {
        setActiveTab(id);
        setCurrentPage(1);
    };



    const handleExamPreviousPage = () => {
        setCurrentExamPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1);
            getExamsData(activeTab, newPage);
            return newPage;
        });
    };

    const handleExamNextPage = () => {
        setCurrentExamPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalExamPages);
            getExamsData(activeTab, newPage);
            return newPage;
        });
    };

    const handleExamPageClick = (page) => {
        setCurrentExamPage(page);
        getExamsData(activeTab, page);
    };

    // Scholarship pagination handlers
    const handleScholarshipPreviousPage = () => {
        setCurrentScholarshipPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleScholarshipNextPage = () => {
        setCurrentScholarshipPage(prevPage => Math.min(prevPage + 1, totalScholarshipPages));
    };

    const handleScholarshipPageClick = (page) => {
        setCurrentScholarshipPage(page);
    };


    const ScholarshipCards = ({ data }) => {
        const startIndex = (currentPage - 1) * perPage;
        const paginatedScholarships = data.slice(startIndex, startIndex + perPage);

        if (paginatedScholarships.length === 0) {
            return (
                <div className="col-12 text-center">
                    <p className="fw-bold text-muted">No exams found. Try adjusting the filter settings.</p>
                </div>
            );
        }

        return (
            <div className="row d-flex flex-fill px-md-0 px-3">
                {paginatedScholarships.map((scholarship) => (
                    <div className="col-md-4 mb-3" key={scholarship.id}>
                        <Link href={`/exam/${scholarship.id}/${scholarship.slug}`}>
                            <div className="card hover-card examsCardRow">
                                <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${scholarship.cover_image}`} width={300} height={300} className="card-img-top" alt={scholarship.exam_title} />
                                <div className="card-body text-center">
                                    <h5 className="fw-bold text-center card-title text-truncate">{scholarship.exam_title}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };




    useEffect(() => {
        if (activeTab) {
            getExamsData(activeTab, currentExamPage);
        }
    }, [activeTab, currentExamPage, getExamsData]);


    // const currentExams = examsData[activeTab]?.slice((currentPage - 1) * examsPerPage, currentPage * examsPerPage) || [];

    const currentExams = examsData[activeTab] || [];



    return (
        <section className='bg-white'>
            <div className="container categorySecCarousel position-relative px-md-5 px-0 pt-2 pb-5">
                <div className='w-100 text-center'>
                    {/* <h2 className='fw-bold text-white mb-5 text-center bg-blue mx-auto p-3' style={{ display: 'inline-block', }}>List of Entrance Exams in India
                    </h2> */}
                    <h2 className='fw-bold text-black mb-5 text-center p-3 heading-with-styled-lines'>
                        List of Entrance Exams in India
                    </h2>

                </div>
                {/* <div className='examSecItems'> */}
                <div className="row">
                    <div className="col-lg-7 col-xl-8 exam-car px-5 ">
                        <CategoryCarousel items={items} handleTabClick={handleTabClick} activeTab={activeTab} />
                    </div>
                </div>
                {/* </div> */}
                <div className="tab-content" id="pills-tabContent">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
                            id={`pills-${item.id}`}
                            role="tabpanel"
                            aria-labelledby={`pills-${item.id}-tab`}
                        >
                            <div className='topCourseConCarousel pt-5'>
                                <div className="row">
                                    <div className="col-lg-7 col-xl-8">
                                        <div className="row px-md-0 px-3">
                                            {currentExams.length > 0 ? (
                                                currentExams.map((exam, index) => (
                                                    <ExamCard key={index} id={exam.id} cover_image={exam.cover_image} title={exam.exam_title} slug={exam.slug} />
                                                ))
                                            ) : (
                                                <div className="text-center mb-5">No data</div>
                                            )}
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <nav aria-label="Exams Page navigation">
                                                <ul className="pagination d-flex gap-3">
                                                    <li className={`page-item ${currentExamPage === 1 ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handleExamPreviousPage} aria-label="Previous">
                                                            <span aria-hidden="true">{'<'}</span>
                                                        </button>
                                                    </li>
                                                    {Array.from({ length: totalExamPages }, (_, index) => (
                                                        <li key={index} className={`page-item ${currentExamPage === index + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handleExamPageClick(index + 1)}>{index + 1}</button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentExamPage === totalExamPages ? 'disabled' : ''}`}>
                                                        <button className="page-link" onClick={handleExamNextPage} aria-label="Next">
                                                            <span aria-hidden="true">{'>'}</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="mb-3 rounded p-3 mt-5">
                                            {scholarshipData && scholarshipData.length > 0 ? (
                                                <>
                                                    <div className='w-100 text-center'>
                                                        <h2 className='fw-bold text-black mb-5 p-3 heading-with-styled-lines text-center mt-3'>Entrance Exams for Study Abroad
                                                        </h2>
                                                    </div>
                                                    <h4 className='text-blue fw-bold mb-3'>Filter By</h4>
                                                    <div className="d-flex gap-3 flex-wrap">
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="country_id" className='text-black fw-bold mb-2'>Select Country</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                                    id="country_id"
                                                                    value={formData.country_id}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none', // Hide the default arrow
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                                                        paddingRight: '2.5rem', // Add space for the icon
                                                                    }}>
                                                                    <option value="">Select</option>
                                                                    {countryData.map(option => (
                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                    ))}
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                                    style={{
                                                                        right: '1rem', // Adjust based on padding
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="level_of_study" className='text-black fw-bold mb-2'>Level of study</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                                    id="level_of_study"
                                                                    value={formData.level_of_study}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none', // Hide the default arrow
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                                                        paddingRight: '2.5rem', // Add space for the icon
                                                                    }}>
                                                                    <option value="">select</option>
                                                                    <option value="UG">UG</option>
                                                                    <option value="PG">PG</option>
                                                                    <option value="professional">Professional</option>
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                                    style={{
                                                                        right: '1rem', // Adjust based on padding
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        <div className="align-self-center flex-grow-1">
                                                            <label htmlFor="types_of_exam" className='text-black fw-bold mb-2'>Type of exam</label>
                                                            <div className="position-relative w-100">
                                                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                                    id="types_of_exam"
                                                                    value={formData.types_of_exam}
                                                                    onChange={handleSelectChange}
                                                                    style={{
                                                                        appearance: 'none', // Hide the default arrow
                                                                        WebkitAppearance: 'none',
                                                                        MozAppearance: 'none',
                                                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                                                        paddingRight: '2.5rem', // Add space for the icon
                                                                    }}>
                                                                    <option value="">select</option>
                                                                    <option value="Language_Proficiency">Language Proficiency</option>
                                                                    <option value="Aptitiude_Test">Aptitiude Test</option>
                                                                    <option value="Streams">Streams</option>
                                                                </select>
                                                                <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                                    style={{
                                                                        right: '1rem', // Adjust based on padding
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                                    }}></i>
                                                            </div>
                                                        </div>
                                                        {
                                                            formData.types_of_exam && formData.types_of_exam === 'Streams' ? (
                                                                <div className="align-self-center">
                                                                    <label htmlFor="stream_id" className='text-black fw-bold mb-2'>Select Stream</label>
                                                                    <div className="position-relative w-100">
                                                                        <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                                                            id="stream_id"
                                                                            value={formData.stream_id}
                                                                            onChange={handleSelectChange}
                                                                            style={{
                                                                                appearance: 'none', // Hide the default arrow
                                                                                WebkitAppearance: 'none',
                                                                                MozAppearance: 'none',
                                                                                background: 'transparent', // Ensure background is transparent for icon positioning
                                                                                paddingRight: '2.5rem', // Add space for the icon
                                                                            }}>
                                                                            <option value="">Select</option>
                                                                            {streams.map(option => (
                                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                                            ))}
                                                                        </select>
                                                                        <i className="bi bi-caret-down-fill position-absolute" // Bootstrap icon class for the caret
                                                                            style={{
                                                                                right: '1rem', // Adjust based on padding
                                                                                top: '50%',
                                                                                transform: 'translateY(-50%)',
                                                                                pointerEvents: 'none', // Ensures icon does not interfere with click events
                                                                            }}></i>
                                                                    </div>
                                                                </div>) : ''
                                                        }
                                                        <div className="align-self-center pt-4">
                                                            <button className='btn viewMoreCollegeBtn align-self-center' onClick={handleClearAll}>Clear All</button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : ''}
                                        </div>
                                        {scholarshipData && scholarshipData.length > 0 ? (
                                            <>
                                                {isLoading ? (
                                                    <div className="text-center">
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <ScholarshipCards data={scholarshipsData} />
                                                        {/* Pagination */}
                                                        {scholarshipsData.length > 0 && (
                                                            <div className="row col-md-12 blogCardspage">
                                                                <div className='d-flex justify-content-center'>
                                                                    <nav aria-label="Scholarships Page navigation">
                                                                        <ul className="pagination d-flex gap-3">
                                                                            <li className={`page-item ${currentScholarshipPage === 1 ? 'disabled' : ''}`}>
                                                                                <button className="page-link" onClick={handleScholarshipPreviousPage} aria-label="Previous">
                                                                                    <span aria-hidden="true">{'<'}</span>
                                                                                </button>
                                                                            </li>
                                                                            {Array.from({ length: totalScholarshipPages }, (_, index) => (
                                                                                <li key={index} className={`page-item ${currentScholarshipPage === index + 1 ? 'active' : ''}`}>
                                                                                    <button className="page-link" onClick={() => handleScholarshipPageClick(index + 1)}>{index + 1}</button>
                                                                                </li>
                                                                            ))}
                                                                            <li className={`page-item ${currentScholarshipPage === totalScholarshipPages ? 'disabled' : ''}`}>
                                                                                <button className="page-link" onClick={handleScholarshipNextPage} aria-label="Next">
                                                                                    <span aria-hidden="true">{'>'}</span>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </nav>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : ''}
                                    </div>
                                    <div className="col-lg-5 col-xl-4">
                                        <div className='bg-skyBlue px-lg-5 px-md-3 px-3 mb-5 rounded'>
                                            <h2 className='fw-bold text-blue text-center pt-3 mb-3'>Contact Us</h2>
                                            <div className='examsForm'>
                                                <SideContactUsForm />
                                            </div>
                                        </div>
                                        {newsData && newsData.length > 0 ? (<NewsList newsItems={newsData} />) : ""}
                                        {newsDataAbroad && newsDataAbroad.length > 0 ? (<NewsListAbroad newsItems={newsDataAbroad} />) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowsebyCategorySec;
