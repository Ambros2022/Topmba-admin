import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Testimonial {
    name: string;
    location: string;
    institution: string;
    image: string;
    designation: string;
    type: string;
}

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1023, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
};

const ButtonGroup = ({
    next,
    previous,
    showButtons,
}: {
    next?: () => void;
    previous?: () => void;
    showButtons: boolean;
}) => (
    <div className={`carousel-button-group d-flex justify-content-between ${showButtons ? '' : 'd-none'}`}>
        <span className="carousel-btn fi-left" onClick={previous}>
            <FiChevronLeft size={30} />
        </span>
        <span className="carousel-btn fi-right" onClick={next}>
            <FiChevronRight size={30} />
        </span>
    </div>
);

const TestimonialSec = ({ testimonials }: { testimonials: Testimonial[] }) => {
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const updateIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        updateIsDesktop();
        window.addEventListener('resize', updateIsDesktop);
        return () => window.removeEventListener('resize', updateIsDesktop);
    }, []);

    const autoPlay = testimonials.length > 0 && (!isDesktop || testimonials.length > 2);
    const showButtons = isDesktop && testimonials.length > 2;

    return (
        <>
            {testimonials.length > 0 && (
                <section className="bg-white pb-3">
                    <div className="container">
                        <h2 className="text-blue fw-bold text-center mb-3">Testimonials</h2>
                        <div className="testimonialCarousel position-relative">
                            <Carousel
                                swipeable
                                draggable
                                showDots={false}
                                arrows={false}
                                infinite
                                autoPlay={autoPlay}
                                autoPlaySpeed={2000}
                                ssr
                                responsive={responsive}
                                renderButtonGroupOutside
                                customButtonGroup={<ButtonGroup showButtons={showButtons} />}
                            >
                                {testimonials.map((card: any) => (
                                    <div key={card.id} className="d-flex m-2">
                                        <div className="card p-3 d-flex flex-column flex-fill">
                                            <div className="row flex-fill">
                                                <div className="col-md-6 embedly-responsive d-flex align-items-center">
                                                    <iframe
                                                        width="100%"
                                                        height="auto"
                                                        src={card?.streamTestimonials?.video_url}
                                                        allowFullScreen
                                                        className="embedly-embed"
                                                    ></iframe>
                                                </div>
                                                <div className="col-md-6 d-flex flex-column justify-content-between">
                                                    <div className="p-2 flex-fill">
                                                        <h5 className="text-black fw-bold pt-2">{card?.streamTestimonials?.name}</h5>
                                                        <p className="text-black studentSpeakCardBody overflow-y-auto">
                                                            {card?.streamTestimonials?.designation}
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
            )}
        </>
    );
};

export default TestimonialSec;
