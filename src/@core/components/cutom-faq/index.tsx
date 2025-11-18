import React from 'react';

const FaqSec = ({ data }) => {
    return (
        <section className='bg-white faqSec'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 pt-2 pb-2">
                        <div className="accordion" id="accordionExample">
                            {data.map((item, index) => (
                                <div className="accordion-item mb-3" key={index}>
                                    <h4 className="accordion-header text-white">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#col${index}`}
                                            aria-expanded="true"
                                            aria-controls={`col${index}`}
                                        >
                                            {index + 1}. {item.questions}
                                        </button>
                                    </h4>
                                    <div
                                        id={`col${index}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <div dangerouslySetInnerHTML={{ __html: item.answers }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FaqSec;
