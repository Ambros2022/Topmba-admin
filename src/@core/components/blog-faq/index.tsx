import React from "react";

const FaqSec = ({ data }) => {
  return (
    <section className="faqSec mb-4">
      <style>{`
        .faqSec {
          background-color: #fff !important;
          font-family: 'Inter', sans-serif;
        }

        .faqSec .accordion-item {
          border: none !important; ;
          border-bottom: 1px solid #e5e5e5 !important;
          border-radius: 0;
          background: #fff !important;
        }

        .faqSec .accordion-button {
          background-color: #fff !important;
          color: #000 !important;
          font-weight: 600;
          font-size: 17px;
          box-shadow: none !important;
          border: none !important;
          padding: 1.25rem 0 !important;
        }

        .faqSec .accordion-button:not(.collapsed) {
          color: #000 !important;
          background-color: #fff !important;
          box-shadow: none !important;
        }

        .faqSec .accordion-body {
          color: #333;
          font-size: 17x;
          background-color: #fff !important;
          padding: 0 0 1.25rem 0 !important;
        }

        .faqSec .accordion-button:focus {
          box-shadow: none !important;
          outline: none !important;
        }

        .faqSec .accordion-button::after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='lucide lucide-chevron-down'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-size: 1rem;
          transform: rotate(0deg);
          transition: transform 0.2s ease;
        }

        .faqSec .accordion-button:not(.collapsed)::after {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="container">
        <div className="accordion" id="faqAccordion">
          {data.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-heade">
                <button
                  className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#col${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`col${index}`}
                >
                  {item.questions}
                </button>
              </h2>
              <div
                id={`col${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <div dangerouslySetInnerHTML={{ __html: item.answers }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSec;


// import React from 'react';

// const FaqSec = ({ data }) => {
//     return (
//         <section className='bg-white faqSec'>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12 pt-2 pb-2">
//                         <div className="accordion" id="accordionExample">
//                             {data.map((item, index) => (
//                                 <div className="accordion-item mb-3" key={index}>
//                                     <h4 className="accordion-header text-white">
//                                         <button
//                                             className="accordion-button"
//                                             type="button"
//                                             data-bs-toggle="collapse"
//                                             data-bs-target={`#col${index}`}
//                                             aria-expanded="true"
//                                             aria-controls={`col${index}`}
//                                         >
//                                             {index + 1}. {item.questions}
//                                         </button>
//                                     </h4>
//                                     <div
//                                         id={`col${index}`}
//                                         className="accordion-collapse collapse"
//                                         data-bs-parent="#accordionExample"
//                                     >
//                                         <div className="accordion-body">
//                                             <div dangerouslySetInnerHTML={{ __html: item.answers }} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default FaqSec;
