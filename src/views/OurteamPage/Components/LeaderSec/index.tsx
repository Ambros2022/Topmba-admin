import React, { useCallback, useEffect, useState } from 'react';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';


interface User {
    image: any;
    name: string;
    designation: string;
    linked_in_link: any;
}

const LeaderSec = () => {


    const [users, setUsers] = useState<User[]>([]);
    const isMountedRef = useIsMountedRef();


    const getBoardsData = useCallback(async () => {
        try {
            const response = await axios.get('api/website/ourteams/get');
            if (isMountedRef.current) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getBoardsData();
    }, [getBoardsData]);



  

    return (
        <section className='bg-white py-md-5 py-3'>
            <div className="container">
                <h1 className='text-blue fw-bold'>Meet Our Leaders</h1>
                <p className="text-black">
                    Every team requires a group of strong-willed individuals who work hard towards achieving the company's collective goals. They should be capable of leading a team with a grasp of perseverance and understanding. The pillars of Learntech Edu Solutions have showcased the above-mentioned skills since the start of their journey to enable a just action towards their fellow employees as well as their clients. They seek to establish a dynamic work environment by creating an energetic atmosphere that is both pleasant as well as encouraging. Additionally, our leaders take the initiative towards guiding employees into becoming seasoned professionals and thereby aiding our clients with the most effective methods that are tailored to provide efficient career counselling and admission guidance.
                </p>
                <h2 className='text-blue fw-bold pt-4 mb-3'>Founder, Chairman and Managing Director</h2>
                <div className="card p-3 mb-3 bg-skyBlue">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 col-xl-3">
                            <div className='userSecImg mx-auto'>
                                <img src='/images/icons/MansoorAli.webp' width={200} height={200} className='img-fluid rounded' alt='user-img' />
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9 col-xl-9 text-md-start text-center">
                            <h3 className='text-blue fw-bold pt-md-0 pt-2'>MANSOOR ALI</h3>
                            <p className="text-black text-start">
                                I am dedicated to making education accessible to every student, regardless of their background or location. With a vision to bridge learning gaps, I believe in harnessing technology to empower students with the resources and knowledge they need to succeed. My mission is to create innovative, user-friendly solutions that ensure quality education reaches all, paving the way for a brighter future. Through Learntech, I aim to break barriers and provide equal learning opportunities, fostering growth and success for students across the globe.
                            </p>
                            <div className='text-end'>
                                {/* <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i> */}
                                <a href="https://www.linkedin.com/in/mansoor-ali-73368029/" target="_blank" rel="noopener noreferrer">
                                    <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='fw-bold text-md-start text-center text-blue pt-3 pt-md-5 mb-3'>Management Team
                </h2>
                <div className="row team">
                    {users.map((user, index) => (
                        <div key={index} className="col-md-4 d-flex align-items-stretch mb-3"> {/* Ensures equal height */}
                            <div className="card p-3 bg-skyBlue h-100 w-100"> {/* h-100 and w-100 enforce full height and width */}
                                <div className='userSec2Img mx-auto'>
                                    <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${user.image}`} width={400} height={400} className='img-fluid rounded' alt='user-img' />
                                </div>
                                <div className="card-body pb-0">
                                    <h3 className='fw-bold text-black'>{user.name}</h3>
                                    <h4 className='text-black'>{user.designation}</h4>
                                    <div className='text-end'>
                                        <a href={user.linked_in_link} target="_blank" rel="noopener noreferrer">
                                            <i className='text-blue bi bi-linkedin fsize-1 zoom-effect'></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}

export default LeaderSec;
