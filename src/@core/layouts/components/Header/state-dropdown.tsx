
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useAuth } from "src/hooks/useAuth";

const DropdownMenu = React.memo(({ states, type, onClose }: any) => {
  const [visibleStates, setVisibleStates] = useState(10);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleViewMore = (event: any) => {
    event.stopPropagation();
    setVisibleStates((prev) => Math.min(prev + 5, states.length));
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setVisibleStates(10);
    setIsExpanded(false);
  };

  const toggleDropdownMobile = (event: any, id: number) => {
    if (!isMobile) return;
    event.preventDefault();
    event.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const { setStateId, setCityId } = useAuth();

  return (
    <>
      {states.length > 0 && (
        <ul className="dropdown-menu menu-icon state-dropdwon-width">
          <div className="text-center">
            <p style={{ fontWeight: "bold", color: "#274896" }}>{type} by location</p>
          </div>
          {states.slice(0, visibleStates).map((item) => (
            <li key={item.id} className="position-relative">
              <div className="d-flex justify-content-between align-items-center">
                <Link
                  href={{
                    pathname: type === "Colleges" ? "/colleges" : "/universities",
                  }}
                  className="dropdown-item"
                  onClick={() => {
                    setStateId(item.id);
                    onClose();
                  }}
                >
                  {item.name}
                </Link>

              
                {item.city.length > 0 && (
  <Image
    className={`ms-auto ${isMobile && openDropdown === item.id ? "rotate-90" : ""}`}
    src="/images/icons/right arrow.svg"
    width={20}
    height={25}
    alt="arrow-img"
    onClick={isMobile ? (event) => toggleDropdownMobile(event, item.id) : undefined} 
    style={{ cursor: isMobile ? "pointer" : "default" }} 
  />
)}
              </div>

              {item.city.length > 0 && (!isMobile || openDropdown === item.id) && (
                <ul className="dropdown-menu dropdown-submenu menu-icon">
                  {item.city.map((city) => (
                    <li key={city.id}>
                      <Link
                        className="dropdown-item"
                        href={{
                          pathname: type === "Colleges" ? "/colleges" : "/universities",
                        }}
                        onClick={() => {
                          setCityId(city.id);
                          onClose();
                        }}
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
    




