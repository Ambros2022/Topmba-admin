import React, { useCallback, useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axios from 'src/configs/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const TabCarousel = ({ activeTab, onTabClick }) => {
    const [tabs, setTabs] = useState<any>([]);  // Use any type for tabs
    const isMountedRef = useIsMountedRef();

    const getCountry = useCallback(async () => {
        try {
            const roleparams = {
                page: 1,
                size: 50
            };
            const response = await axios.get('api/website/country/get', { params: roleparams });
            if (isMountedRef.current) {
                console.log(response.data.data);
                setTabs([{ id: 'all', name: 'All' }, ...response.data.data]);  // Include 'All' in tabs fetched
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getCountry();
    }, [getCountry]);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 3000, min: 1024 }, items: 6},
        desktop: { breakpoint: { max: 1024, min: 992 }, items: 5 },
        tablet: { breakpoint: { max: 991, min: 768 }, items: 4},
        mobile: { breakpoint: { max: 767, min: 0 }, items: 2 }
    };

    const ButtonGroup = ({ next, previous }) => (
        <div className="carousel-button-group justify-content-between d-flex gap-5 fs-2">
            <span className='fi-left' onClick={previous}>
                <FiChevronLeft />
            </span>
            <span className='fi-right' onClick={next}>
                <FiChevronRight />
            </span>
        </div>
    );


    return (
        <Carousel
            swipeable
            draggable
            showDots={false}
            arrows={false}
            infinite
            ssr
            responsive={responsive}
            renderButtonGroupOutside
            customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
            containerClass='carousel-container2Category pb-1 scholarcrousel'
        >
            {tabs.length > 0 && tabs.map((tab) => (
                <button
                    key={tab}
                    className={`btn d-flex mx-auto justify-content-center filterCountry ${activeTab === tab.id ? 'active' : ''}`}
                    id={tab.id}
                    onClick={() => onTabClick(tab)}
                    role='tab'
                    aria-controls={tab.id}
                    aria-selected={activeTab === tab}
                    style={{zIndex:'10'}}
                >
                    {tab.name}
                </button>
            ))}
        </Carousel>
    );
};

export default TabCarousel;
