import React, { useState } from 'react'
import dynamic from 'next/dynamic';
// import PopularCourses from '../UpcomingExamsSec'
const PopularCourses = dynamic(() => import("../UpcomingExamsSec"), {
  ssr: false,
  loading: () =>
    <p>Loading</p>
});
import Link from 'next/link';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import axios1 from 'axios';
import axios from 'src/configs/axios';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from 'src/@core/components/mui/autocomplete';



const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), {
  ssr: false,
  loading: () =>
    <a className="btn alertExamBtn" style={{ cursor: 'pointer' }}>
      Get Exams Alert
    </a>
});


let cancelToken: any;

interface SearchResult {
  id: number;
  exam_title: string;
  slug: string;
}


function BannerSection() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);



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

      const response = await axios.get('api/website/exams/get', {
        cancelToken: cancelToken.token,
        params: { searchfrom: 'exam_title', searchtext: value },
      });

      const suggestions = response.data.data.map((item: { id: number; exam_title: string, slug: string }) => ({
        exam_title: item.exam_title,
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



  return (
    <>
      <section className='collegeBannerCon bg-blue examBannerCon'>
        <div className="position-relative">
          <div>
            <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' fetchPriority="high"
              loading="eager" />
          </div>
          <div className="position-absolute w-100 h-100" style={{ top: '1px' }}>
            <div className='d-flex justify-content-center w-100 '>
              <div className='align-content-center w-100 container'>
                <h1 className='fw-bold text-center text-white mb-3 mt-4'>
                  Entrance Exams in India and Abroad
                </h1>
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-5 col-12 mb-3 ">
                    <Autocomplete
                      open={open}
                      onClose={() => setOpen(false)}
                      onInputChange={handleInputChange}
                      options={searchResults}
                      getOptionLabel={(option: SearchResult) => option.exam_title}
                      renderOption={(props, option: SearchResult) => (
                        <li {...props}>
                          <Link
                            href={`/exam/${option.id}/${option?.slug}`}
                            style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                          >
                            {option.exam_title}
                          </Link>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Search for Entrance Exam"
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
                <div className="row text-white text-md-start text-center pt-3 mb-3">
                  <h2>Upcoming Entrance Exams</h2>
                </div>
                <div className='popularcourse'>


                  <PopularCourses />
                </div>

                <div className='text-md-end text-center pt-5'>
                  {/* <button className='btn  alertExamBtn'>Get Exams Alert</button> */}
                  <GlobalEnquiryForm
                    buttonText="Get Exams Alert"
                    className="btn alertExamBtn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default BannerSection;