import React from 'react';

function FacilitiesSection({ data }) {


  function CardList() {
    return (
      <div className="row pt-3">
        {data.collegeamenities.map(card => (
          <CardComponent
            key={card.id}
            title={card.clgamenities.amenities_name}
            imageSrc={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.clgamenities.amenities_logo}`}
          />
        ))}
      </div>
    );
  }

  function CardComponent({ title, imageSrc }) {
    return (
      <div className="col-6 col-md-3 col-lg-2 col-xl-2 mb-3 d-flex flex-wrap" key={title}>
        <div className="card text-center py-1 flex-fill">
          <img src={imageSrc} width={50} height={50} className="card-img-top img-fluid mx-auto " alt={`${title}-logo`} />
          <h6 className="fw-bold text-truncate">{title}</h6>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        (data && data.length>0)?(
        <section className='bg-white facilitiesSec py-3'>
          <div className="container bg-skyBlue px-4 py-3">
            <h2 className='pt-3 text-blue fw-bold'>Facilities & Infrastructure</h2>
            <CardList />
          </div>
        </section>):''
      }
    </>
  );
}

export default FacilitiesSection;
