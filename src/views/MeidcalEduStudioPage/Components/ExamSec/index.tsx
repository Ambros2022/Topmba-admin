
import React from 'react'

const ExamSec = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <section ref={ref} className='bg-white py-5'>
        <div className="container">
          <img className='img-fluid w-100 h-100' width={2000} height={2000} alt='exams-img' src='/images/icons/servicesImg.webp' />
        </div>
      </section>
    </>
  )
})

export default ExamSec
