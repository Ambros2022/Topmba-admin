import React from 'react'

function GuidanceSec() {
  return (
    <>
      <section className='guidanceSec bg-skyBlue'>
        <div className="container py-5">
          <div className='p-3 rounded guidanceCon'>
            <h4 className='text-blue fw-bold'>Guidelines:</h4>
            <h6 className='text-black fw-bold'>Your review may be rejected if:</h6>
            <ul className='text-black'>
              <li><small>It is vague and short</small></li>
              <li><small>It is without any useful information</small></li>
              <li><small>It is copied from the internet/ external sources</small></li>
              <li><small>It includes junk characters, text language, slang, or offensive language</small></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default GuidanceSec
