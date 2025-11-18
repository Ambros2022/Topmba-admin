import React, { useCallback, useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/configs/axios';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 1023, min: 768 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1
    }
};


const TestimonialSec = ({ data }) => {

console.log(data)

    const [testimonials, setTestimonials] = useState<any>(null);
    const isMountedRef = useIsMountedRef();

    const gettestimonials = useCallback(async () => {
      try {
        const response = await axios.get('api/website/testimonial/filter/get?page=1&size=15&general_course_id=' + data?.id);
        if (isMountedRef.current) {
            setTestimonials(response.data.data);
  
        }
      } catch (error) {
     
        console.error('Failed to fetch page data:', error);
      }
    }, [data, isMountedRef]);


    useEffect(() => {
       
        gettestimonials();
      }, [data]);
    const showButtons = testimonials && testimonials.length > 1;
    return (
        <>
            {testimonials && testimonials.length > 0 ? (
                <section className='bg-white pb-3'>
                    <div className="container">
                        <h2 className='text-blue fw-bold text-center mb-3'>Testimonials</h2>
                        <div className='testimonialCarousel position-relative'>
                            <Carousel
                                swipeable
                                draggable
                                showDots={false}
                                arrows={false}
                                infinite
                                autoPlay
                                autoPlaySpeed={2000}
                                ssr
                                responsive={responsive}
                                renderButtonGroupOutside={showButtons}
                                // customButtonGroup={showButtons ? <ButtonGroup /> : null}
                            >
                                {testimonials.map((card) => (
                                    <div key={card.id} className="d-flex m-2">
                                        <div className="card p-3 d-flex flex-column flex-fill">
                                            <div className="row flex-fill">
                                                <div className="col-md-6 embedly-responsive d-flex align-items-center">
                                                    <iframe
                                                        width="100%"
                                                        height="auto"
                                                        src={card?.courseTestimonials?.video_url}
                                                        allowFullScreen
                                                        className='embedly-embed'
                                                    ></iframe>
                                                </div>
                                                <div className="col-md-6 d-flex flex-column justify-content-between">
                                                    <div className="p-2 flex-fill">
                                                        <h5 className="text-black fw-bold pt-2">{card?.courseTestimonials?.name}</h5>
                                                        <p className="text-black studentSpeakCardBody overflow-y-auto">
                                                            {card?.courseTestimonials?.designation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </section>
            ) : null}
        </>
    );
};

export default TestimonialSec;
