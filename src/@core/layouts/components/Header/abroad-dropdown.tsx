import { useState, useCallback } from 'react';
import Link from 'next/link';
import React from 'react';

const DropdownMenu = React.memo(({ states, onClose }: any) => {
    const [visibleStates, setVisibleStates] = useState(10);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleViewMore = useCallback(() => {
        setVisibleStates(prev => Math.min(prev + 5, states.length));
        setIsExpanded(true);
    }, [states.length]);

    const handleShowLess = useCallback(() => {
        setVisibleStates(10);
        setIsExpanded(false);
    }, []);

    return (
        <>

            {states.length > 0 && (
                <ul className="dropdown-menu menu-icon state-dropdwon-width" aria-labelledby="navbarDropdownMenuLink">
                    <div className="text-center">
                        <p style={{ fontWeight: 'bold', color: '#274896' }}>Best Country for Study</p>
                    </div>
                    {states.slice(0, visibleStates).map((item) => (
                        <li key={item.id} className="list-unstyled">
                            <Link href={`/${item.slug}`} onClick={onClose} className="dropdown-item">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="me-3"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item?.backgroundimage}`}
                                            width={40}
                                            height={40}
                                            className="img-fluid"
                                            alt="news-img"
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <span className="text-truncate d-block">
                                            {item?.country?.name}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}


                    <div className="text-center text-blue dropdownBtn">
                        {visibleStates < states.length && (
                            <button className="btn" onClick={handleViewMore}>
                                View More
                            </button>
                        )}
                        {isExpanded && (
                            <button className="btn" onClick={handleShowLess}>
                                Show Less
                            </button>
                        )}
                    </div>
                </ul>
            )}
        </>
    );
});

export default DropdownMenu;
