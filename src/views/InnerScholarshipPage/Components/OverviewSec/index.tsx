import React from 'react'

import ContactForm from 'src/@core/components/popup/ContactForm';
import ScholarshipList from '../ScholarshipList/index';


const OverviewSec = ({ data, scholarship }) => {


    return (
        <section className='innerBlogSec bg-white py-3'>
            <div className="container">
                <h2 className='fw-bold text-blue mb-3'>{data.name}</h2>
  

                <div className="row mt-3">
                    <div className="col-md-8">
                        <p className='text-black'>  <div dangerouslySetInnerHTML={{ __html: data.overview }} /></p>


                    </div>
                    <div className="col-md-4 scholarh2">
                        <div className='mb-5'>
                            <ContactForm heading={'Contact Us'} />
                        </div>

                           <ScholarshipList newsItems={scholarship} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewSec