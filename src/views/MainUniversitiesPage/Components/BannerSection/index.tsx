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

function BannerSection() {
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
        params: { searchfrom: 'name', searchtext: value, type: 'university' },
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

  return (
    <>
      <section className="collegeBannerCon">
        <div className="position-relative">
          <div>
            <img src='/images/icons/BannerBG.webp' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
          </div>
          <div className="position-absolute w-100 h-100" style={{ top: '1px' }}>
            <div className="d-flex justify-content-center h-100 w-100 container">
              <div className="align-content-center w-100">
                <h1 className="fw-bold text-white mb-3">
                  Know all About Top Universities, Placements, Admissions and Fee Structures
                </h1>
                <div className="row d-flex ">
                  <div className="col-md-7 mb-3">
                    <Autocomplete
                      open={open}
                      onClose={() => setOpen(false)}
                      onInputChange={handleInputChange}
                      options={searchResults}
                      getOptionLabel={(option: SearchResult) => option.name}
                      renderOption={(props, option: SearchResult) => (
                        <li {...props}>
                          <Link
                            href={`/university/${option.id}/${option.slug}`}
                            style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                          >
                            {option.name}
                          </Link>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Find Your Unviersity"
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
                  </div>
                  <div className="col-md-5 d-flex mb-3">
                    <GlobalEnquiryForm className="btn align-self-center btn-success2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}

export default BannerSection;
