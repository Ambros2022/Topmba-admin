import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import MainCarousel from 'src/@core/components/main-carousel';
const MainCarousel = dynamic(() => import('src/@core/components/main-carousel'), { ssr: false });
import axios1 from 'src/configs/axios';
import Link from 'next/link';

// import CountryCarosuel from './CountryCarousel/indes';
const CountryCarosuel = dynamic(() => import('./CountryCarousel/indes'), { ssr: false });
import { Spinner } from 'react-bootstrap';
const CollegeCard = dynamic(() => import('src/@core/components/college-card-next'), { ssr: false });

const StudyAbroadSection = () => {
  const [activeCountry, setActiveCountry] = useState<number | null>(null);

  interface Country {
    id: number;
    name: string;
  }

  const [countries, setCountries] = useState<Country[]>([]);

  const getcountries = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 10, india: false };
      const response = await axios1.get('api/website/country/get', { params: roleparams });
      const countriesData = response.data.data;
      setCountries(countriesData);

      if (countriesData.length > 0) {
        setActiveCountry(countriesData[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getcountries();
  }, [getcountries]);

  const handleNavItemClick = (countryId: number) => {
    setActiveCountry(countryId);
  };

  const getLinkClass = (countryId: number) => {
    return `${countryId === activeCountry ? 'active-country' : ''}`;
  };

  const [cardData, setCardData] = useState<any[]>([]);

  const fetchCardData = useCallback(async () => {
    try {
      const params = activeCountry ? { country_id: activeCountry } : {};
      const response = await axios1.get('api/website/colleges/get', { params });
      const responseData = response.data.data;
      setCardData(responseData);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  }, [activeCountry]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);

  const renderCards = () => {
    return cardData.map((card) => (
      <CollegeCard key={card.id} college={card} />
    ));
  };

  const renderButtons = () => {
    return countries.map((country) => (
      <a
        key={country.id}
        className={`${getLinkClass(country.id)} d-flex mx-md-2 align-self-center btn btn-primary mb-3 text-truncate text-center justify-content-center`}
        id={country.id.toString()}
        type="button"
        aria-selected={activeCountry === country.id}
        onClick={() => handleNavItemClick(country.id)}
      >
        {country.name}
      </a>
    ));
  };



  return (
    <section className="StudyAbroadCon bg-white" >
      <div className="container pt-4 pt-md-5">
        <h2 className="fw-bold text-blue text-center">Study Abroad</h2>
        <p className="text-black mt-3">
          Studying abroad offers transformative advantages that can redefine your academic and professional trajectory. Immersing yourself in a new cultural and academic environment sharpens critical thinking and problem-solving skills by challenging you to adapt and thrive in unfamiliar settings. This experience cultivates a global mindset, essential for understanding diverse perspectives and approaches, which is increasingly valued in a globalized job market.
        </p>

        <p className="text-black">
          Beyond cultural enrichment, studying at prestigious international universities grants access to cutting-edge research, state-of-the-art facilities, and innovative teaching methodologies that provide a distinct edge in your field. These institutions are often at the forefront of technological advancements and global discourse, offering tools and insights to empower you as a future leader. Explore your options and find the universities that will enable you to shape the future with a truly global perspective.
        </p>


        <div className="studyAbroadNav position-relative py-4 px-5 rounded" style={{ zIndex: '2' }}>
          <CountryCarosuel items={renderButtons()} />
        </div>
        {cardData.length > 0 ? (
          <div className='pt-3 position-relative' id="studyCardContainer">
            <MainCarousel items={renderCards()} />
            <div className="d-flex justify-content-center pb-5">
              <Link href='/study-in-usa' className='btn viewMoreClgBtn'>Load More</Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {cardData.length === 0 ? (
              <div className="text-center">
                <p>No items available</p>
              </div>
            ) : (
              <div className="text-center">
                <Spinner animation="border" />
                <p>Loading...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default StudyAbroadSection;
