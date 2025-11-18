import React, { useCallback, useEffect, useState } from 'react';
import TabCarousel from '../TabCarousel';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import axios1 from 'axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from 'src/@core/components/mui/autocomplete';


const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });


const FilterSec = ({ abroadData, levelOptions, typeOptions, countryData }) => {
    const [scholarshipsData, setScholarshipsData] = useState<any>([]);  // Use any type for tabs
    const isMountedRef = useIsMountedRef();
    const [activeTab, setActiveTab] = useState('all');  // State to manage active tab
    const [currentPage, setCurrentPage] = useState(1);  // State for current page
    const perPage = 9; // Number of items per page
    const [totalScholarships, setTotalScholarships] = useState(0);
    // const totalPages = Math.ceil(totalScholarships / perPage);
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [formData, setFormData] = useState({
        levelOfStudy: '',
        type: '',
        gender: '',
        nationality: '',
        deadline: ''
    });

    let cancelToken: any;

    interface SearchResult {
        id: number;
        name: string;
        slug: string;
    }


    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);



    const handleClearAll = () => {
        setFormData({
            levelOfStudy: '',
            type: '',
            gender: '',
            nationality: '',
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


    const getScholarship = useCallback(async (countryId, levelId, TypeId, CountryId) => {
        try {
            const params = {
                level_id: levelId !== '' ? levelId : undefined,
                type_id: TypeId !== '' ? TypeId : undefined,
                country_id: CountryId !== '' ? CountryId : undefined,
                gender: formData.gender,
                searchfrom: 'name', // Specify the field to search against
                searchtext: searchText, // Include searchtext parameter
                page: currentPage,  // Use currentPage for pagination
                size: perPage
            };

            let url = 'api/website/scholarships/get';
            if (countryId !== 'all') {
                url += `?country_id=${countryId}`;
            }

            const response = await axios.get(url, { params });
            setScholarshipsData(response.data.data); // Ensure the structure of response.data fits your expected scholarship data format
            setTotalScholarships(response.data.data.length);
            // setTotalPages(response.data.data.totalPages);
            setTotalPages(Math.ceil(response.data.totalItems / perPage));
        } catch (error) {
            console.error('Error fetching scholarships:', error);
        }
    }, [isMountedRef, formData, searchText, perPage, currentPage]);



    useEffect(() => {
        getScholarship(activeTab, formData.levelOfStudy, formData.type, formData.nationality);
    }, [activeTab, formData.levelOfStudy, formData.type, formData.nationality, getScholarship, searchText, currentPage]);



    const renderScholarshipDetails = (scholarship) => (
        <ul className='text-black'>
            <li>International Student Eligible : <span className='fw-bold'>{scholarship.is_eligible === 1 ? 'Yes' : 'No'}</span></li>
            <li>Amount : <span className='fw-bold'>{scholarship.amount}</span></li>
            <li>Type : <span className='fw-bold'>{scholarship.scholartypes ? scholarship.scholartypes.name : 'Not specified'}</span></li>
            <li>Level Of Study : <span className='fw-bold'>{scholarship.scholarlevels ? scholarship.scholarlevels.name : 'Not specified'}</span></li>
            <li>Number Of Scholarships : <span className='fw-bold'>{scholarship.total_scholarships}</span></li>
        </ul>
    );

    const handleSearch = async (value: string) => {
        if (value.length < 2) {
            setSearchResults([]);
            setOpen(false); // Close the dropdown if the input is too short
            return;
        }

        try {
            setLoading(true);
            if (cancelToken !== undefined) {
                cancelToken.cancel('Operation canceled due to new request.');
            }
            cancelToken = axios1.CancelToken.source();

            const response = await axios.get('api/website/scholarships/get', {
                cancelToken: cancelToken.token,
                params: { searchfrom: 'name', searchtext: value },
            });

            const suggestions = response.data.data.map((item: { id: number; name: string; slug: string }) => ({
                name: item.name,
                slug: item.slug,
                id: item.id,
            }));

            setSearchResults(suggestions);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event: any, value: string) => {
        handleSearch(value);
    };

    const handleClearInput = (params: any) => {
        setSearchResults([]);
        setOpen(false);
        if (params.inputProps.onChange) {
            const event = {
                target: {
                    value: '',
                },
            } as React.ChangeEvent<HTMLInputElement>;
            params.inputProps.onChange(event);
        }
    };

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };


    const ScholarshipCards = ({ }) => {
        const startIndex = (currentPage - 1) * perPage;
        const paginatedScholarships = scholarshipsData.slice(startIndex, startIndex + perPage);
        return (
            <div className="row d-flex flex-fill">
                {paginatedScholarships.map((scholarship, index) => (
                    <div className="col-md-10 col-lg-6 col-xl-6 mb-3" key={index}>
                        <div className="card bg-skyBlue p-3">
                            <h4 className='text-blue fw-bold'>{scholarship.name}</h4>
                            <h6 className='text-black fw-bold'>{scholarship.university}</h6>
                            {renderScholarshipDetails(scholarship)}
                            <Link href={`/scholarship/${scholarship.id}/${scholarship.slug}`}
                                className='mb-3 text-blue fw-bold text-start'>Read More {'>>'}</Link>
                            <div className="d-flex gap-3 flex-fill scholarshipBtn flex-md-row flex-column">

                                <GlobalEnquiryForm
                                    buttonText="Apply Now"
                                    className="btn applyNowButton"
                                />
                                <Link href={`/scholarship/${scholarship.id}/${scholarship.slug}`}>
                                    <button className='btn viewDetailBtn'>Get Alert</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <section className='bg-white py-5'>
            <div className="container">
                <div className="card mb-3 filterCardSec filterscholarship border-1 rounded p-3">
                    <h2 className='text-blue fw-bold mb-3'>Filter By</h2>

                    <div className="d-flex gap-3 flex-wrap">
                        <div className="align-self-center flex-grow-1">
                            <label htmlFor="levelOfStudy" className='text-black fw-bold mb-2'>Level of study</label>
                            <div className="position-relative w-100">
                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                    id="levelOfStudy"
                                    value={formData.levelOfStudy}
                                    onChange={handleSelectChange}
                                    style={{
                                        appearance: 'none', // Hide the default arrow
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                        paddingRight: '2.5rem', // Add space for the icon
                                    }}>
                                    <option value="">Select</option>
                                    {levelOptions.map(option => (
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
                            <label htmlFor="type" className='text-black fw-bold mb-2'>Type</label>
                            <div className="position-relative w-100">
                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                    id="type"
                                    value={formData.type}
                                    onChange={handleSelectChange}
                                    style={{
                                        appearance: 'none', // Hide the default arrow
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                        paddingRight: '2.5rem', // Add space for the icon
                                    }}>
                                    <option value="">Select</option>
                                    {typeOptions.map(option => (
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
                            <label htmlFor="gender" className='text-black fw-bold mb-2'>Gender</label>
                            <div className="position-relative w-100">
                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleSelectChange}
                                    style={{
                                        appearance: 'none', // Hide the default arrow
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                        paddingRight: '2.5rem', // Add space for the icon
                                    }}>
                                    <option value="">select</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">others</option>
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
                            <label htmlFor="nationality" className='text-black fw-bold mb-2'>Nationality</label>
                            <div className="position-relative w-100">
                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                    id="nationality"
                                    value={formData.nationality}
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
                            <label htmlFor="deadline" className='text-black fw-bold mb-2'>Deadline</label>
                            <div className="position-relative w-100">
                                <select className="form-control text-black w-100 pe-5" // Use 'pe-5' for padding-right
                                    id="deadline"
                                    value={formData.deadline}
                                    onChange={handleSelectChange}
                                    style={{
                                        appearance: 'none', // Hide the default arrow
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        background: 'transparent', // Ensure background is transparent for icon positioning
                                        paddingRight: '2.5rem', // Add space for the icon
                                    }}>
                                    <option value="">select</option>
                                    <option value="Jan - Mar">Jan - Mar</option>
                                    <option value="Apr - Jun">Apr - Jun</option>
                                    <option value="Jul - Sep">Jul - Sep</option>
                                    <option value="Oct - Dec">Oct - Dec</option>
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


                        <div className="align-self-center pt-4">
                            <button className='btn viewMoreCollegeBtn align-self-center' onClick={handleClearAll}>Clear All</button>
                        </div>
                    </div>

                </div>

                <div>
                    <h2 className='fw-bold text-blue mt-4 pt-5'>Select Countries</h2>
                    <div className='position-relative countryCarouselFilter mb-5 pt-3 innerschCarousel' style={{ zIndex: '2' }}>
                        <TabCarousel activeTab={activeTab} onTabClick={handleTabClick} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-7 order-2 order-md-1">
                        <h5 className='fw-bold text-black mb-3'>{totalScholarships} Scholarships Found</h5>
                    </div>
                    <div className="col-md-5 col-lg-4 order-1 order-md-2 mb-md-0 mb-5">
                        <Autocomplete
                            open={open}
                            onClose={() => setOpen(false)}
                            onInputChange={handleInputChange}
                            options={searchResults}
                            getOptionLabel={(option: SearchResult) => option.name}
                            renderOption={(props, option: SearchResult) => (
                                <li {...props}>
                                    <Link
                                        href={`/scholarship/${option.id}/${option.slug}`}
                                        style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                                    >
                                        {option.name}
                                    </Link>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search for Scholarship"
                                    className='form-control'
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),

                                        endAdornment: (
                                            <>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.inputProps.value ? (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => handleClearInput(params)}>
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ) : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-7 col-lg-8 pt-lg-3 pt-2">
                        <div className="tab-content" id="pills-tabContent">
                            <ScholarshipCards />
                        </div>
                        {/* Pagination */}
                        <div className="row col-md-12 blogCardspage">
                            <div className='d-flex justify-content-center'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination d-flex gap-3">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handlePreviousPage} aria-label="Previous">
                                                <span aria-hidden="true">{'<'}</span>
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handleNextPage} aria-label="Next">
                                                <span aria-hidden="true">{'>'}</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-4 pt-lg-3 pt-2">
                        <div className='border p-3 text-center rounded examAlertSec bg-skyBlue mb-5'>
                            <h2 className='text-blue fw-bold'>Are you interested in scholarship?</h2>
                            <img src="/images/icons/Scholarships.png" alt='exam-alert-img' className='img-fluid' width={300} height={300} />
                            {/* <h6 className='text-black mb-3'>Are you interested in scholarship?</h6> */}
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <GlobalEnquiryForm
                                    buttonText="Talk To Experts"
                                    className="btn applyNowButton"
                                />

                                <GlobalEnquiryForm
                                    buttonText="Get More Info"
                                    className="btn viewDetailBtn"
                                />


                            </div>
                        </div>
                        <h2 className='text-blue fw-bold text-center mb-3'>Most Popular Links</h2>
                        <div className='border p-3 rounded bg-skyBlue'>
                            {abroadData.map((link, index) => (
                                <div className='d-grid' key={index}>
                                    <Link href={`/${link.slug}`}
                                        className='text-blue border mb-3 btn abroadBtn text-center'><h5 className='mb-0'>{link.name}</h5></Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterSec;
