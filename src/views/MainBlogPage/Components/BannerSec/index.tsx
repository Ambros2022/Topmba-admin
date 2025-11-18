import axios from 'src/configs/axios';
import Autocomplete from 'src/@core/components/mui/autocomplete';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios1 from 'axios';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
let cancelToken: any;

interface SearchResult {
    id: number;
    name: string;
    slug: string;
}

const BannerSec = () => {
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

            const response = await axios.get('api/website/blog/get', {
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
    return (
        <>
            <section className='newsBannerSec  bg-blue '>
                <div className='position-relative'>
                    {/* <div>
                        <img src='/images/icons/BannerBG.webp' width={1400} height={400} alt='banner-img' className='position-relative w-100' />
                    </div> */}
                    <div className='position-absolute w-100 h-100' style={{ top: '74px' }}>
                        <div className="container h-100">
                            <div className="d-flex justify-content-center h-100">
                                <div className="align-content-center h-100">
                                    <h1 className='fw-bold text-white mb-4'>Educational Blogs</h1>
                                    <div className="row">

                                        <div className="col-md-12 mb-3 mx-auto">
                                            <Autocomplete
                                                open={open}
                                                onClose={() => setOpen(false)}
                                                onInputChange={handleInputChange}
                                                options={searchResults}
                                                getOptionLabel={(option: SearchResult) => option.name}
                                                renderOption={(props, option: SearchResult) => (
                                                    <li {...props}>
                                                        <Link
                                                            href={`/blog/${option.id}/${option.slug}`}
                                                            style={{ color: '#000', textDecoration: 'none', display: 'block', width: '100%', height: '100%' }}
                                                        >
                                                            {option.name}
                                                        </Link>
                                                    </li>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Search for Blogs"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-white'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link> <span className='text-blue'>Blogs</span>
                </div>
            </section>
        </>

    )
}

export default BannerSec