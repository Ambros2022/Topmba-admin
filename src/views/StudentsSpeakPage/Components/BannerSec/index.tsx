import React, { useState } from 'react';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';

const BannerSec = ({ handleSearchQuery }) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value) => {
        setSearchText(value);
        setLoading(true); // Show loading indicator

        if (value.length < 2) {
            handleSearchQuery('');
            setLoading(false); // Hide loading indicator
            return;
        }

        try {
            handleSearchQuery(value); // Trigger search with the updated value
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Hide loading indicator in all cases
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        handleSearch(value);
    };

    const handleClearInput = () => {
        setSearchText('');
        handleSearchQuery('');
        setLoading(false);
    };

    return (
        <>
            <section className='newsBannerSec'>
                <div className='position-relative'>
                    <div>
                        <img src='/images/icons/BannerBG.webp   ' width={1400} height={300} alt='banner-img' className='position-relative w-100' />
                    </div>
                    <div className='position-absolute w-100 h-100' style={{ top: '1px' }}>
                        <div className="container h-100">
                            <div className="card d-flex justify-content-center w-100 h-100 bg-transparent border-0">
                                <div className="align-content-center h-100">
                                    <h1 className='fw-bold text-white text-center'>Success Stories of Learntech Edu Solutions Pvt. Ltd.</h1>
                                    <div className="row ">
                                        <div className="col-12 w-100 text-center mb-3">
                                            <TextField
                                                placeholder="Search"
                                                value={searchText}
                                                onChange={handleInputChange}

                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        backgroundColor: 'white',
                                                        width: '300px',
                                                        color: 'black',
                                                        '& .MuiInputBase-input::placeholder': {
                                                            color: 'black',
                                                        },
                                                    },

                                                    endAdornment: (
                                                        <>
                                                            {loading && <CircularProgress color="inherit" size={20} />}
                                                            {searchText && !loading && (
                                                                <IconButton onClick={handleClearInput} edge="end">
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            )}

                                                        </>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-skyBlue'>
                <div className='container py-2 linkFontSize'>
                    <Link href='/' className='text-black'>Home <i className='bi bi-chevron-right'></i></Link><span className='text-blue'> Students' Speak</span>
                </div>
            </section>
        </>

    );
};

export default BannerSec;
