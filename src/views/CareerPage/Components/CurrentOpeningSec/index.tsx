import React, { useState } from 'react'; // Import useState
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

interface Job {
    name: string;
    job_description: string; // Make sure this is included
    exp_required: string;
    total_positions: number;
    jobpositionlocation: {
        jobpositionslocation: {
            name: string;
        };
    }[];
}

interface CurrentOpeningSecProps {
    jobData: Job[]; // Define the type for jobData
}

const CurrentOpeningSec: React.FC<CurrentOpeningSecProps> = ({ jobData }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null); // State to hold selected job

    const handleShow = (job: Job) => {
        setSelectedJob(job); // Set the selected job
        setShowModal(true); // Open the modal
    };

    const handleClose = () => {
        setShowModal(false); // Close the modal
        setSelectedJob(null); // Clear selected job
    };

    const handleClick = () => {
        const direction = document.getElementById('contactForm')
        direction?.scrollIntoView();
        handleClose();
    }

    return (
        <section className='bg-white py-3 innercourse_height' id="currentOpeningSection">
            <div className="container">
                <h2 className='fw-bold text-center text-blue pb-3'>Current Openings</h2>
                <div className="row">
                    {jobData.map((job, index) => (
                        <div className="col-lg-6" key={index}>
                            <div className="card mb-3 bg-skyBlue border-0" onClick={() => handleShow(job)}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <img src='/images/icons/suitcase-lg-fill.svg' className='mt-md-0 mt-3 align-self-center img-style' width={100} height={100} alt='suitcase-logo' />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body text-md-start text-center">
                                            <h5 className="card-title fw-bold text-black text-truncate">{job.name}</h5>
                                            {job.jobpositionlocation && job.jobpositionlocation.length > 0 ? (
                                                <>
                                                    <img src="/images/icons/Locationicon.svg" width={20} height={20} alt='logo-location' className='me-2' />
                                                    <span className="card-text text-truncate">
                                                        {job.jobpositionlocation.map(location => location.jobpositionslocation.name).join(', ')}
                                                    </span>
                                                </>
                                            ) : ''}
                                            <p className="card-text text-truncate mt-3">
                                                <img src="/images/icons/calendor-filled.png" width={20} height={20} alt='logo-location' /> {job.exp_required}
                                            </p>
                                            <div className="row">
                                                <div className=''>
                                                    <p className="card-text">
                                                        <img src="/images/icons/chair-icon.png" width={20} height={20} alt='logo-location' /> {job.total_positions}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for Job Description */}
            <Modal show={showModal} onHide={handleClose}   size="xl" >
                <Modal.Header closeButton>
                    <Modal.Title className='text-blue' >{selectedJob?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-black' dangerouslySetInnerHTML={{ __html: selectedJob?.job_description || '' }}></div>
                    <button className="btn viewMoreClgBtn" onClick={handleClick}>Apply Now</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default CurrentOpeningSec;
