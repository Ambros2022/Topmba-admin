import React, { useCallback, useEffect, useState } from 'react';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';


const OrganizationSection = ({data}) => {
    const [organizationPage, setOrganizationPage] = useState<any>(null);
    const isMountedRef = useIsMountedRef();

    const getOrganizationPageData = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['size'] = 1000;
            roleparams['categories'] = 'Streams';
            const response = await axios.get('api/website/organizationpage/get', { params: roleparams });
            if (isMountedRef.current && response.data.status === 1) {
                setOrganizationPage(response.data.data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch organization page data:', error);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getOrganizationPageData();
    }, [getOrganizationPageData]);

    return (
        <>
            {organizationPage && organizationPage !== '' ? (
                <section className='bg-white pt-3'>
                    <div className="container">
                        <h2 className='text-center fw-bold text-blue mb-3'>{organizationPage?.title} {data?.name} Courses</h2>
                        {/* <h2 className='text-center fw-bold text-blue mb-3'>Learntech’s Approach for{organizationPage.title}</h2> */}
                        <p className='text-black' dangerouslySetInnerHTML={{ __html: organizationPage.content }}></p>
                        <div className="d-flex mt-5 pt-md-5 pt-3 flex-wrap justify-content-center gap-3">
                            {organizationPage.organizatiopagesteps.map((data) => (
                                <div key={data.id} className='card rounded-0 px-3 organizationalCard' style={{marginBottom:'80px'}}>
                                    <div className='text-center organizationImg'>
                                        <img 
                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${data.icon}`} 
                                            width={700} 
                                            height={700} 
                                            alt={`${data.name}-img`} 
                                            className='mb-3 img-fluid'
                                            style={{marginTop:'-60px'}} 
                                        />
                                        <i className='bi text-blue bi-chevron-right right-arrow-orgazinational'></i>
                                        <h5 className='text-blue'>{data.title}</h5>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
}

export default OrganizationSection;
