import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce';// Import debounce function from lodash library
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios1 from 'src/configs/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import { useAuth } from 'src/hooks/useAuth';




interface College {
    id: number;
    name: string;
    state: number;
    address: string;
    banner_image: string;
    established: string;
    avg_rating: number;
    college_type: string;
    course_type: string;
    slug: string;

}

const CollegeCard = ({ id, slug, name, type, rating, location,  established, imageUrl }: any) => {
    return (
        <div className='col-md-10 col-lg-12 mx-auto mb-3 '>
            <div className="mx-2 filterCardBorder hover-card bg-skyBlue">
                <div className="p-2">
                    <div className="row d-flex">
                        <div className="align-content-start col-md-12 col-lg-4 col-xl-3 clgCardImg">
                            <img width={500} height={500} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageUrl}`} className="img-fluid rounded card-Image-top me-auto" alt="College Logo" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <div className="row">
                                <div className="p-2 col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-title">
                                        <h5 className='fw-bold text-black mb-3'>{name}</h5>
                                    </div>
                                    <div className="card-text text-black">
                                        <p className="mb-3 text-truncate"><i className='bi bi-geo-alt-fill text-danger me-1 fs-5'></i>{`${location}`}</p>
                                        <p className="mb-3"><div className='d-flex justify-content-md-start justify-content-start flex-md-row flex-column'><span className='align-self-center me-auto'><img src='/images/icons/calendor-filled.png' width={20} height={20} alt='calendor Icon' />  Est. Year {established}</span><span className='me-auto align-self-center'><button className='ms-2 mt-md-0 mt-3 btn typeBtn'>{type}</button></span></div></p>
                                    </div>
                                </div>
                                <div className="pt-2 col-md-12 col-xl-3 mb-lg-3 mb-3 mb-md-0 col-lg-12 text-end">
                                    {rating && rating.length !== 0 ? (
                                        <div className="d-flex mb-md-3 mb-lg-0 gap-2 justify-content-start justify-content-md-start">

                                            <i className={`bi bi-star-fill ${rating >= 1 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 2 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 3 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 4 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 5 ? "text-warning" : "text-gray"} `}></i>

                                            {/* <h6 className='mb-0 text-white align-self-center'>{rating}/5 Review</h6> */}
                                        </div>
                                    ) : ''}
                                </div>
                                <div className="mt-lg-0 col-md-10 col-xl-3 col-lg-12 text-xl-end text-end flex-md-row flex-column d-flex flex-lg-row flex-xl-column justify-content-xl-around gap-xl-0 gap-3">
                                    <GlobalEnquiryForm className="activeBtn  btn d-flex justify-content-center" />

                                    <Link href={`/university/${id}/${slug}`} className=" viewMoreBtn btn d-flex justify-content-center"><span className='align-content-center'>View More</span></Link>
                                </div>
                            </div>


                            {/* <button className='btn bg-warning text-white' style={{ minWidth: '50px', minHeight: '20px' }}>{rating}</button> */}

                            <div className='d-flex gap-2 btns'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function CollegeFilterSection() {


    const router = useRouter();
    const [colleges, setColleges] = useState<College[]>([]);
    const [total, setTotal] = useState<string>("0");
    const isMountedRef = useIsMountedRef();
    const [visibleCards, setVisibleCards] = useState(7);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({});
    const [states, setStates] = useState<Option[]>([]);
    const [citys, setCitys] = useState<any[]>([]);
    const [streams, setStreams] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [promoban, setPromoban] = useState<any[]>([]);

    const [accordionOpen, setAccordionOpen] = useState<{ [groupId: string]: boolean }>({
        state: true,
        city: true,
        streams: true,
        courses: true,
        ownership: true,
        courseType: true
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setAccordionOpen({
                    state: false,
                    city: false,
                    streams: false,
                    courses: false,
                    ownership: false,
                    courseType: false
                });
            } else {
                setAccordionOpen({
                    state: true,
                    city: true,
                    streams: true,
                    courses: true,
                    ownership: true,
                    courseType: true
                });
            }
        };

        // Run on initial load
        handleResize();

        // Add event listener to handle resize
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [checkboxState, setCheckboxState] = useState<{ [groupId: string]: { [value: string]: boolean } }>({});

    const { stateId, setStateId, cityId, setCityId } = useAuth();


    type Option = {
        is_top: string;
        label: string;
        value: string;
        cities?: Option[];
    };

    type OptionGroup = {
        id: string;
        label: string;
        options: Option[];
    };


    const getPromobanner = useCallback(async () => {
        try {
            const response = await axios1.get('api/website/banner/get?promo_banner=All_university_page');
            if (isMountedRef.current) {

                setPromoban(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    const getstreamdata = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get(`/api/website/stream/get?size=${roleparams['size']}`);
            if (response.data.status === 1) {
                const streamData = response.data.data.map((stream: any) => ({
                    label: stream.name,
                    value: stream.id.toString()
                }));
                setStreams(streamData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);


    const getcoursesdata = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/generalcourse/get');
            if (response.data.status === 1) {
                const courseData = response.data.data.map((course: any) => ({
                    label: course.short_name,
                    value: course.id.toString()
                }));
                setCourses(courseData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);


    const fetchStatesData = useCallback(async () => {
        try {
            const response = await axios1.get('api/website/states/get?page=1&size=50&country_id=204');
            if (response.data.status === 1) {
                const arrcity: any = [];
                const statesData = response.data.data.map((state: any) => ({
                    label: state.name,
                    value: state.id.toString(),
                    cities: state.city.map((city: any) => {
                        const cityObj = {
                            label: city.name,
                            value: city.id.toString(),
                        };
                        arrcity.push(cityObj);
                        return cityObj;
                    }),
                    is_top: state.is_top.toString(),
                }));

                setCitys(arrcity);
                setStates(statesData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);

    const getcollegedata = useCallback(async (stateIds?: string[], courseIds?: string[], streamIds?: string[], ownership?: string[], courseType?: string[], cityIds?: string[]) => {
        try {
            const params: any = {
                page: 1,
                size: 10000,
                country_id:204,
                type: 'university'
            };


            if (stateIds && stateIds.length > 0) params['state_id'] = `[${stateIds.join(',')}]`;
            if (cityIds && cityIds.length > 0) params['city_id'] = `[${cityIds.join(',')}]`;
            if (courseIds && courseIds.length > 0) params['general_course_id'] = `[${courseIds.join(',')}]`;
            if (streamIds && streamIds.length > 0) params['stream_id'] = `[${streamIds.join(',')}]`;
            if (ownership) params['college_type'] = ownership;
            if (courseType && courseType.length > 0) params['course_type'] = JSON.stringify(courseType);
            const response = await axios1.get('api/website/colleges/get?orderby=asc&columnname=listing_order', { params });
            setColleges(response.data.data);
            setTotal(response.data.totalItems);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);


    useEffect(() => {
        fetchStatesData();
        getcollegedata();
        getstreamdata();
        getcoursesdata();
        getPromobanner();

    }, []);




    const options: OptionGroup[] = [
        { id: 'state', label: 'States', options: states },
        { id: 'city', label: 'Cities', options: citys },
        // { id: 'city', label: 'Cities', options: states.flatMap(state => state.cities) },
        {
            id: 'ownership',
            label: 'Ownership',
            options: [
                { label: 'Public', value: 'Public' },
                { label: 'Deemed', value: 'Deemed' },
                { label: 'Private', value: 'Private' },
                { label: 'Government', value: 'Government' },
                { label: 'Autonomous', value: 'Autonomous' },
            ]
        },
        { id: 'streams', label: 'Streams', options: streams },
        {
            id: 'courseType',
            label: 'Course Type',
            options: [
                { label: 'UG', value: 'UG' },
                { label: 'PG', value: 'PG' },
                { label: 'Diploma', value: 'Diploma' },
                { label: 'Doctorate', value: 'Doctorate' },
                // { label: 'Default', value: 'Default' },
            ],
        },
        { id: 'courses', label: 'Courses', options: courses },
    ];



    const handleViewMore = () => {
        // Check if there are any filtered colleges left to display
        const filteredColleges = colleges.filter(college => {
            return Object.keys(selectedCheckboxes).every(groupId => {
                const selectedValues = selectedCheckboxes[groupId];
                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }

                if (Array.isArray(college[groupId])) {
                    return selectedValues.some(value => college[groupId].includes(value));
                }

                return selectedValues.includes(college[groupId]);
            });
        });



        // If there are more filtered colleges to show, increment visibleCards
        if (visibleCards < filteredColleges.length) {
            setVisibleCards(prevVisibleCards => prevVisibleCards + 7);
        }

    };



    // Define a debounced version of handleCheckboxChange
    const debouncedHandleCheckboxChange = debounce((groupId: string, value: any, isChecked: boolean) => {

        console.log("debounce", groupId, value, isChecked);
        const collegeFiltersSection = document.getElementById('collegeFiltersSection');
        if (collegeFiltersSection) {
            collegeFiltersSection.scrollIntoView({ behavior: 'smooth' });
        }

        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            if (isChecked) {
                updatedSelected[groupId] = [...(updatedSelected[groupId] || []), value];
            } else {
                updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);
            }

            // Extract selected filter values
            const { state: selectedStateIds = [], courses: selectedCourseIds = [], streams: selectedStreamIds = [],
                ownership: selectedOwnership = [], courseType: selectedCourseType = [], city: selectedCityIds = [] } = updatedSelected;



            // Perform API call with selected filter values
            getcollegedata(selectedStateIds, selectedCourseIds, selectedStreamIds, selectedOwnership, selectedCourseType, selectedCityIds);

            // console.log(updatedSelected, "updatedSelected");
            console.log(selectedStateIds, "selectedStateIds");
            if (groupId == "state" && selectedStateIds.length > 0) {
                const citiesArr = states
                    .filter(state => selectedStateIds.includes(state.value))
                    .flatMap(state => state.cities);

                console.log(citiesArr);
                setCitys(citiesArr);
            }
            if (groupId === "state" && selectedStateIds.length === 0 && states.length > 0) {
                const arrcity = states.flatMap((state: any) => state.cities);
                setCitys(arrcity);
            }
            return updatedSelected;
        });
    }, 300); // Debounce for 300 milliseconds


    const handleCheckboxChange = (groupId, value, isChecked) => {

        console.log("handleCheckboxChange", groupId, value, isChecked);
        debouncedHandleCheckboxChange(groupId, value, isChecked);
        setCheckboxState(prevState => ({
            ...prevState,
            [groupId]: {
                ...prevState[groupId],
                [value]: isChecked
            }
        }));

    
    };

    useEffect(() => {
        if (stateId) {
            let text = stateId.toString();
            debouncedHandleCheckboxChange("state", text, true);
            setCheckboxState(prevState => ({
                ...prevState,
                ["state"]: {
                    ...prevState["state"],
                    //@ts-ignore
                    [text]: true
                }
            }));
            setStateId(null)
        }
        if (cityId) {
            let text = cityId.toString();
            debouncedHandleCheckboxChange("city", text, true);
            setCheckboxState(prevState => ({
                ...prevState,
                ["city"]: {
                    ...prevState["city"],
                    //@ts-ignore
                    [text]: true
                }
            }));
            setCityId(null)
        }
    }, [router, router.isReady]);

    const removeSelectedCheckbox = (groupId: string, value: string) => {
        console.log("removeSelectedCheckbox", groupId, value)
        debouncedHandleCheckboxChange(groupId, value, false);
        setCheckboxState(prevState => ({
            ...prevState,
            [groupId]: {
                ...prevState[groupId],
                [value]: false
            }
        }));

        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);

            // Make API call here with updated selected state ID
            const selectedStateIds = updatedSelected['state'] || [];
            const selectedCourseIds = updatedSelected['courses'] || [];
            const selectedStreamIds = updatedSelected['streams'] || [];
            getcollegedata(selectedStateIds, selectedCourseIds, selectedStreamIds);


            return updatedSelected;
        });
    };





    function CollegeList({ selectedCheckboxes }: { selectedCheckboxes: Record<string, string[]> }) {
        const filteredColleges = colleges.filter(college => {
            if (!selectedCheckboxes.stateId || selectedCheckboxes.stateId.length === 0) {
                return true; // Return true if no state is selected
            }
            return selectedCheckboxes.stateId.includes(college.state.toString().toLowerCase().replace(' ', '_')); // Convert to string and filter based on selected state(s)
        });

        if (filteredColleges.length === 0) {
            return (
                <div className="text-center my-5">
                    <p>No universities found for the selected filters.</p>
                </div>
            );
        }

        if (filteredColleges.length > 0 && filteredColleges.slice(0, visibleCards).length === 0) {
            return (
                <div className="text-center my-5">
                    <p>No more universities to display.</p>
                </div>
            );
        }



        return (
            <div className='row'>
                {filteredColleges.slice(0, visibleCards).map(college => (
                    <CollegeCard
                        key={college.id}
                        id={college.id}
                        name={college.name}
                        slug={college.slug}
                        type={college.college_type}
                        rating={college.avg_rating}
                        location={college.address}
                        // state={college.state}
                        established={college.established}
                        imageUrl={college.banner_image}
                    />
                ))}

            </div>
        );
    }


    const toggleAccordion = (groupId: string) => {
        setAccordionOpen(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId]
        }));

    };


    const StateButtons: React.FC<{
        options: Option[];
        setSelectedCheckboxes: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
        selectedCheckboxes: Record<string, string[]>;
    }> =
        ({ options, selectedCheckboxes }) => {


            const handleStateButtonClick = (state: string) => {

                console.log("handleStateButtonClick", state);

                debouncedHandleCheckboxChange("state", state, true);
                window.scrollTo({ top: 650, behavior: 'smooth' });

           
                setCheckboxState(prevState => ({
                    ...prevState,
                    ["state"]: {
                        ...prevState["state"],
                        [state]: true
                    }
                }));
             
            };

            return (
                <div className="row bg-skyBlue gx-0 p-3 my-3 mx-2 rounded">
                    <div className="col-12">
                        <h6 className="text-black">Filters By Location</h6>
                        <div className="d-flex flex-wrap">
                            {options.map((option, index) => (
                                option.is_top === "1" && (
                                    <button
                                        key={index}
                                        className={`btn text-center m-1 p-2 filterItemBtn ${selectedCheckboxes.state?.includes(option.value) ? 'active' : ''}`}
                                        onClick={() => handleStateButtonClick(option.value)}
                                    >
                                        {option.label}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

    const MultiSelectOptions: React.FC<{ options: OptionGroup[] }> = ({ options }) => {
        const [searchTexts, setSearchTexts] = useState<Record<string, string>>({});
        const handleSearchChange = (groupId: string, searchText: string) => {
            setSearchTexts(prev => ({ ...prev, [groupId]: searchText }));
        };

        const filteredOptions = (optionGroup: OptionGroup) => {
            const searchText = searchTexts[optionGroup.id] || '';
            return optionGroup.options.filter(option =>
                option.label.toLowerCase().includes(searchText.toLowerCase())
            );
        };


        return (
            <div>
                {options.map((optionGroup, index) => (
                    <div key={index} style={{ cursor: 'pointer' }} className="row rounded bg-white gx-0 p-3 my-3 mx-2">

                        <div className="col-10" onClick={() => toggleAccordion(optionGroup.id)}>
                            <h5 className='text-blue'>
                                {optionGroup.label}
                            </h5>
                        </div>
                        <div className="col-2 text-center " onClick={() => toggleAccordion(optionGroup.id)}>
                            <h5 className='text-blue'>
                                {accordionOpen[optionGroup.id] ? '▲' : '▼'}
                            </h5>

                        </div>
                        <div className={`showingCards collapse ${accordionOpen[optionGroup.id] ? 'show' : ''}`} id={`${optionGroup.id}Collapse`}>
                            <div className='my-3 options-container'>
                                <hr />
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="icon-rtl form-control"
                                    value={searchTexts[optionGroup.id] || ''}
                                    onChange={(e) => handleSearchChange(optionGroup.id, e.target.value)}
                                    id={`${optionGroup.id}Search`}
                                    aria-describedby={`${optionGroup.id}SearchHelp`}
                                />
                                {filteredOptions(optionGroup).map((option, index) => (
                                    <div key={index} className="form-check text-black searchCheckBox my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={option.value}
                                            id={`${optionGroup.id}-${index}`}
                                            onChange={(e) => handleCheckboxChange(optionGroup.id, option.value, e.target.checked)}
                                            checked={checkboxState[optionGroup.id]?.[option.value]}
                                        />

                                        <label className="form-check-label" htmlFor={`${optionGroup.id}-${index}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };



    const SelectedFilters: React.FC<{ selectedCheckboxes: Record<string, string[]> }> = ({ selectedCheckboxes }) => {
        const getLabelForValue = (groupId: string, value: string) => {
            const group = options.find(optionGroup => optionGroup.id === groupId);
            const option = group?.options.find(option => option.value === value);
            return option ? option.label : value;
        };

        // Check if there are any selected filters
        const hasSelectedFilters = Object.keys(selectedCheckboxes).some(groupId => selectedCheckboxes[groupId].length > 0);

        // Render the filter card only if there are selected filters
        return (
            <>
                {hasSelectedFilters && (
                    <div id="collegeFiltersSection" className="row bg-skyBlue gx-0 px-3 py-2 mb-3 mx-2">
                        <div className="col-12">
                            <h6 className='text-black'>Selected Filters</h6>
                        </div>
                        <div className='my-2'>
                            {Object.entries(selectedCheckboxes).map(([groupId, values]) => (
                                values.map(value => (
                                    <div key={value} className="btn d-inline-flex align-items-center filterItemBtn2 rounded m-1 p-2">
                                        <span className="me-2">{getLabelForValue(groupId, value)}</span>
                                        <button
                                            className="btn"
                                            onClick={() => removeSelectedCheckbox(groupId, value)}
                                        ><img src="/images/icons/close-icon-white.png" width={18} height={18} alt='close-white' /></button>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    };


    // Calculate filtered colleges outside of handleViewMore
    const filteredColleges = colleges.filter(college => {
        return Object.keys(selectedCheckboxes).every(groupId => {
            const selectedValues = selectedCheckboxes[groupId];
            if (!selectedValues || selectedValues.length === 0) {
                return true;
            }

            if (Array.isArray(college[groupId])) {
                return selectedValues.some(value => college[groupId].includes(value));
            }

            return selectedValues.includes(college[groupId]);
        });
    });

    const PromoAddBanner = ({ url, title, description,link }) => {

        return (
            <>
                <section className='bg-skyBlue addBanner rounded'>
                    <div className="container p-5">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4 addImgClg position-relative">
                                    <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                                    <div className="position-absolute iconsPosition">

                                    </div>
                                    <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body" style={{ zIndex: '200' }}>
                                        <h5 className="card-text">{description}</h5>
                                        <h3 className="card-title fw-bold">{title}</h3>
                                        <Link href={link} className='mt-3 btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        );
    }


    return (
        <>
            <div className='bg-white py-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-xl-3 col-md-4 mb-3 mb-lg-0 bg-skyDarkBlue rounded">
                            <h5 className='text-blue fw-bold text-md-start text-center px-3 pt-3'>Found {total} Universities</h5>
                            <MultiSelectOptions options={options} />
                        </div>
                        <div className="col-lg-9 col-xl-9 col-md-8">
                            <SelectedFilters selectedCheckboxes={selectedCheckboxes} />
                            <CollegeList selectedCheckboxes={selectedCheckboxes} />
                            {filteredColleges.length > visibleCards && (
                                <div className="text-center my-3">
                                    <button className="btn viewMoreCollegeBtn"
                                        onClick={handleViewMore}
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                            {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} description={promoban[0].description} title={promoban[0].title} link={promoban[0]?.link} />}
                            <StateButtons
                                options={options.find(option => option.id === 'state')?.options || []}
                                setSelectedCheckboxes={setSelectedCheckboxes}
                                selectedCheckboxes={selectedCheckboxes}
                            />

                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}

export default CollegeFilterSection;