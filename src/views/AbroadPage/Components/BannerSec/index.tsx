import axios from 'src/configs/axios';
import Autocomplete from 'src/@core/components/mui/autocomplete';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios1 from 'axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

let cancelToken: any;

interface SearchResult {
  id: number;
  name: string;
  slug: string;
}
function BannerSec({ data }) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
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

      const response = await axios.get('api/website/colleges/get', {
        cancelToken: cancelToken.token,
        params: { searchfrom: 'name', searchtext: value, country_id: [data?.country_id] },
      });

      const suggestions = response.data.data.map((item: { id: number; name: string, slug: string }) => ({
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
  // alert(`${process.env.NEXT_PUBLIC_IMG_URL}${data.backgroundimage}`);
  return (
    <>
      <section className='studyInUsaCon' style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.356), rgba(0, 0, 0, 0.419)),url(${process.env.NEXT_PUBLIC_IMG_URL}/${data.backgroundimage})`,
        backgroundSize: 'cover', // Optional: To ensure the background covers the section
        backgroundPosition: 'center', // Optional: To center the background image
        width: '100%',
        height: '400px' // Adjust height as needed
      }}>

        <div className="container h-100 d-flex justify-content-center">
          <div className='text-white align-content-center text-center'>
            <h1 className='fw-bold'>Study in {data?.country?.name}</h1>
            <div className="searchSec1 text-center mb-4">

              <h3 className='mb-3'>Explore Top Colleges and Universities in {data?.country?.name}.</h3>
              {/* <h3 className='mb-0'>Explore Top Universities and Colleges in {data?.country?.name}.</h3> */}
              {/* <h3 className='mb-3'>Get Updates on Tuition, Courses Offered, Duration and more.</h3> */}
              {/* <div className="d-flex"> */}
              {/* <input type="search" placeholder="Find your dream college" className="form-control" id="exampleInputSearchClg" aria-describedby="exampleInputSearchClg" /> */}
              <Autocomplete
                open={open}
                onClose={() => setOpen(false)}
                onInputChange={handleInputChange}
                options={searchResults}
                getOptionLabel={(option: SearchResult) => option.name}
                renderOption={(props, option: SearchResult) => (
                  <li {...props}>
                    <Link
                      href={`/college/${option.id}/${option.slug}`}
                      style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                    >
                      {option.name}
                    </Link>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Find Your Dream College"
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

              {/* <button className="btn searchBtn">Search</button> */}


              {/* </div> */}
            </div>
            {/* <button className='btn helpMeBtn'>Help me with options</button> */}
            <GlobalEnquiryForm buttonText="Help me with options" className="btn viewMoreCollegeBtn rounded" />
          </div>
        </div>
      </section>
      <div className='bg-white linkFontSize'>
        <p className='text-black container py-3 mb-0'><Link href={'/'} className='text-black'>Home  <i className="bi bi-chevron-right"></i></Link> <span className='text-blue'>Study In {data?.country?.name}</span></p>
      </div>
    </>
  )
}

export default BannerSec
