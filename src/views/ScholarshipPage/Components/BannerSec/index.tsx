import Link from 'next/link'
import React, { useState } from 'react'
import Autocomplete from 'src/@core/components/mui/autocomplete';
import axios1 from 'axios';
import axios from 'src/configs/axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import dynamic from 'next/dynamic';


const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false });

let cancelToken: any;

interface SearchResult {
  id: number;
  name: string;
  slug: string;
}


const BannerSec = () => {

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

      const response = await axios.get('api/website/scholarships/get', {
        cancelToken: cancelToken.token,
        params: { searchfrom: 'name', searchtext: value },
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

  const buttonText = (
    <>
      Get <i className='bi bi-currency-rupee'></i>1 Lakh Scholarship
    </>
  );

  return (
    <>
      <section className='scholarshipSec'>
        <div className='position-relative scholarShipImg'>
          <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
          <div className='position-absolute w-100 h-100' style={{ top: '0px' }}>
            <div className="container">
              <div className="py-5">
                <h1 className='fw-bold text-white mb-3'>Explore Scholarships to Support Your Studies</h1>
                <div className="row">
                  <div className="col-md-8 col-xl-6 col-lg-6 col-10 mb-3 me-auto">

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
                <div className="text-md-end mt-md-3 mt-0">
                  <GlobalEnquiryForm
                    buttonText={buttonText}
                    className="btn btn-warning"
                  />
                  {/* <div className="btn scholarShipBtn">Get 1 Lakh Scholarship</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white'>
        <div className='container py-2 linkFontSize'>
          <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Scholarships</span>
        </div>
      </section>
    </>

  )
}

export default BannerSec