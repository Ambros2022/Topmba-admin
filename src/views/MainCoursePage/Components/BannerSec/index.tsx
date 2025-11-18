import React, { useState } from 'react';
import Link from 'next/link';
import Autocomplete from 'src/@core/components/mui/autocomplete';
import axios1 from 'axios';
import axios from 'src/configs/axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import SearchIcon from '@mui/icons-material/Search';
let cancelToken: any;

type SearchResult = {
  id: number;
  name: string;
  slug: string;
  type: 'course' | 'general_course';
  parentCourseId?: number; // Use this to store the parent course ID
  parentCourseSlug?: string; // Use this to store the parent course slug
};

function BannerSec({ data }: any) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = async (value) => {
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios1.CancelToken.source();
      const response = await axios.get('/api/website/courses/get', {
        cancelToken: cancelToken.token,
        params: {
          searchfrom: "name,general_courses.short_name,general_courses.name",
          searchtext: value
        }
      });

      if (response.status === 200) {
        const results: SearchResult[] = [];

        response.data.data.forEach((course) => {
          // Add matched course by name
          if (course.name.toLowerCase().includes(value.toLowerCase())) {
            results.push({
              id: course.id,
              name: course.name,
              slug: course.slug,
              type: 'course'
            });
          }

          // Add matched general courses
          course.general_courses.forEach((generalCourse) => {
            if (
              generalCourse.name.toLowerCase().includes(value.toLowerCase()) ||
              generalCourse.short_name.toLowerCase().includes(value.toLowerCase())
            ) {
              results.push({
                id: generalCourse.id,
                name: generalCourse.short_name,
                slug: generalCourse.slug,
                type: 'general_course',
                parentCourseId: course.id,
                parentCourseSlug: course.slug
              });
            }
          });
        });

        setSearchResults(results);
      }

      setOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event, value) => {
    handleSearch(value);
  };

  return (
    <>
      <section className='bg-blue courseSec'>
        <div className="container">
          <h1 className='text-white fw-bold pt-5 mb-3'>Best Courses to Study in India and Abroad</h1>
          <div>
            <div className="row">
              <div className="col-md-7 mb-3">
                <Autocomplete
                  open={open}
                  onClose={() => setOpen(false)}
                  onInputChange={handleInputChange}
                  options={searchResults}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Link href={`/course/${option.type === 'general_course' ? `${option.parentCourseId}/${option.parentCourseSlug}/${option.slug}` : `${option.id}/${option.slug}`}`} style={{ color: "#000", textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}>
                        {option.name}
                      </Link>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search for course, degree or specialization"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: 'white',
                          color: 'black',
                          '& .MuiInputBase-input::placeholder': {
                            color: 'black',
                          },
                        },
                        endAdornment: (
                          <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                            {params.inputProps.value ? (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    if (params.inputProps.onChange) {
                                      const event = {
                                        target: {
                                          value: ''
                                        }
                                      } as React.ChangeEvent<HTMLInputElement>;
                                      params.inputProps.onChange(event);
                                    }
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            ) : null}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <h2 className='text-white fw-bold pt-3 mb-3'>Trending Courses</h2>
          <div className="d-flex pb-5 gap-2 flex-wrap flex-md-row flex-column justify-content-between">
            <div className='d-flex gap-2 flex-wrap mb-2 mb-lg-0'>
              {data.map((val) => (
                <Link href={`/course/${val?.streams?.id}/${val?.streams?.slug}/${val.slug}`}
                  className='btn trendCrsBtn'>{val.short_name}</Link>
              ))}
            </div>
            <div className='align-content-center'>
              <GlobalEnquiryForm buttonText="Check Eligibility" className="btn btn-elg bg-warning text-white" />
            </div>
          </div>
        </div>
      </section>
      <div className='bg-white py-2'>
        <section className=" mt-2 container CourseNavigationLink linkFontSize">
          <p><Link href={"/"}>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Courses</span></p>
        </section>
      </div>
    </>
  );
}

export default BannerSec;
