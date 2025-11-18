import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios1 from 'src/configs/axios';

const CardComponent = dynamic(() => import('./CardComponent'), { ssr: false });

function ExploreSection() {
  const [activeTab, setActiveTab] = useState('Colleges');
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [datasize, setDatasize] = useState(18);


  const fetchData = useCallback(async () => {


    try {
      let endpoint = '';
      if (activeTab === 'Colleges') {
        endpoint = 'api/website/explorecollege/get?orderby=asc&columnname=listing_order';
      } else if (activeTab === 'Courses') {
        endpoint = 'api/website/explorecourses/get?orderby=asc&columnname=listing_order';
      } else if (activeTab === 'Exams') {
        endpoint = 'api/website/exploreexam/get?orderby=asc&columnname=listing_order';
      }
      const roleparams = { page: 1, size: datasize };
      const response = await axios1.get(endpoint, { params: roleparams });

      setData(response.data.data);
      setVisibleCount(response.data.totalItems);
    } catch (err) {

      console.error(err);

    }

  }, [activeTab, datasize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setDatasize(18);
  }, []);

  const renderData = useCallback(() => {
    return data.map((item: any) => {
      let url = '';
      if (activeTab === 'Colleges') {
        url = `/colleges/`;
      } else if (activeTab === 'Courses') {
        url = `/course/${item.id}/${item.slug}`;
      } else if (activeTab === 'Exams') {
        url = `/exams/`;
      }

      return (
        <CardComponent
          key={item.id}
          title={item.name}
          imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.logo}`}
          count={item.uniqueCollegeCount}
          link={url}
          activeTab={activeTab}
          Itemid={item.id}
    
        />
      );
    });
  }, [data, activeTab]);

  const showMoreCourses = useCallback(() => {
    setDatasize((prevSize) => prevSize + 6);
  }, []);

  return (
    <section className="exploreCon" >
      <div className="container  py-4 py-md-5">
        <h1 className="fw-bold text-blue text-center mb-4 h2sizeadded">
          Discover Colleges, Courses and Exams that Matches with Your Aspirations
        </h1>
        <div className="d-flex exploreNav justify-content-center mb-4" role="tablist">
          <a
            className={`btn ${activeTab === 'Colleges' ? 'active' : ''}`}
            onClick={() => handleTabChange('Colleges')}
            role="tab"
            aria-selected={activeTab === 'Colleges'}
          >
            Colleges
          </a>
          <a
            className={`btn ${activeTab === 'Courses' ? 'active' : ''}`}
            onClick={() => handleTabChange('Courses')}
            role="tab"
            aria-selected={activeTab === 'Courses'}
          >
            Courses
          </a>
          <a
            className={`btn ${activeTab === 'Exams' ? 'active' : ''}`}
            onClick={() => handleTabChange('Exams')}
            role="tab"
            aria-selected={activeTab === 'Exams'}
          >
            Exams
          </a>
        </div>
        <div id="exploreCardCon">
          <div className="row">{renderData()}</div>
        </div>
        {visibleCount > data.length && (
          <div className="text-center mt-4">
            <button className="btn viewMoreCollegeBtn" onClick={showMoreCourses}>
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExploreSection;
