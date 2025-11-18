import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import Modal from '@mui/material/Modal';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import Fade from '@mui/material/Fade'; // Import Fade transition

const ExperTraineeSec = ({ data }) => {
    const [traineer, setTraineer] = useState<any>();
    const [selectedTraineer, setSelectedTraineer] = useState<any>(null); // State for selected trainee details
    const [modalOpen, setModalOpen] = useState(false); // State for modal control
    const isMountedRef = useIsMountedRef();

    const getTraineer = useCallback(async () => {
        try {
            const response = await axios.get('api/website/counsellorteams/get?orderby=asc&columnname=listing_order');
            if (isMountedRef.current && response.data.status === 1) {
                setTraineer(response.data.data); // Adjusted to handle array of trainees
            }
        } catch (error) {
            console.error('Failed to fetch organization page data:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getTraineer();
    }, [getTraineer]);

    // Handle opening the modal with selected trainee details
    const handleViewProfile = (trainee: any) => {
        setSelectedTraineer(trainee);
        setModalOpen(true);
    };

    const TrainerCard = ({ trainee }: { trainee: { name: string; location: string; experience: string; description: string, image: string } }) => {
        return (
            <div className="card py-3 hover-card h-100 justify-content-around" style={{ border: '1px solid #274896' }}>
                <div className="row d-flex px-3">
                    <div className="col-4 mb-lg-0 mb-md-3 mb-0 text-center align-content-center">
                        <img
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${trainee.image}`}
                            width={200}
                            height={200}
                            alt={`${trainee.name}-img`}
                            className="img-fluid"
                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                    <div className="col-8 align-content-center counsellorText">
                        <h5 className="text-blue">{trainee.name}</h5>
                        <h6 className="fw-light">{trainee.location}</h6>
                    </div>
                </div>
                <hr className="text-blue" />
                <div className="px-3">
                    <h6 className="fw-light">Counsellor Since</h6>
                    <h6 className="fw-light">{format(new Date(trainee.experience), 'dd-MMM-yyyy')}</h6>
                    <button className="btn mb-4 text-blue trainingBtn">
                        <small>{trainee.description}</small>
                    </button><br />
                    <button className="btn viewMoreCollegeBtn" onClick={() => handleViewProfile(trainee)}>View Profile</button>
                </div>
            </div>
        );
    };

    return (
        <>
            {
                traineer && traineer.length !== 0 ? (
                    <section className='bg-light py-md-5 py-3'>
                        <div className="container">
                            <h2 className='text-center fw-bold text-blue pb-3'>
                                We have Educational Experts to Provide Guidance for {data?.name} Courses
                            </h2>
                            <p className="text-black">

                                The counselors at Learntech Edu Solutions Pvt. Ltd. spark inspiration, helping students navigate their academic paths with clarity and confidence. They are experts in creating strategies based on student’s preferences and interests to provide guidance for smooth admission process to colleges/ universities in India or abroad.

                            </p>
                            <div className='py-3'>
                                <div className="row d-flex flex-wrap g-2">
                                    {traineer.map((trainee: any, index: number) => (
                                        <div className="col-md-4 col-lg-4 col-xl-3" key={index}>
                                            <TrainerCard trainee={trainee} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>) : (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                )
            }

            {/* Modal for showing detailed information with Fade transition */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} closeAfterTransition>
                <Fade in={modalOpen} timeout={500}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: 400, md: 900 }, // Responsive width
                            maxHeight: '90vh', // Set max height to 80% of viewport height
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: { xs: 2, md: 4 }, // Responsive padding
                            borderRadius: '10px',
                            outline: 'none', // Remove focus outline on click
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflowY: 'auto', // Enable vertical scrolling if content overflows
                        }}
                    >
                        {/* Close Icon at the top right corner */}
                        <IconButton
                            sx={{ position: 'absolute', top: 10, right: 10 }}
                            onClick={() => setModalOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Modal Content */}
                        {selectedTraineer ? (
                            <>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${selectedTraineer.image}`}
                                    className='img-fluid mb-3 rounded'
                                    width={200}
                                    height={200}
                                    alt={`${selectedTraineer.name}-img`}
                                />
                                <h2 className='fw-bold text-blue'>{selectedTraineer.name}</h2>
                                <div className='text-black' dangerouslySetInnerHTML={{ __html: selectedTraineer.info }} />
                                <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">
                                    Close
                                </Button>
                            </>
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                <CircularProgress />
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>

        </>
    );
};

export default ExperTraineeSec;
