import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const Toster = dynamic(() => import('src/@core/components/popup/Toster'), { ssr: false })
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), {
  ssr: false, loading: () =>
    <a className="DownloadBrchrBtn" style={{ cursor: 'pointer' }}>
      <img src="/images/icons/DownloadBrochure.webp" className='mb-md-0 my-3 mb-md-0 my-md-0' width={150} height={70} alt="download-brochure-icon" loading="lazy" />

    </a>
});
// import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from "next/link";
const Footer = () => {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const halfwayPoint = window.innerHeight / 2;
      if (window.scrollY > halfwayPoint) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }

  return (
    <>

      <section className="footerCon">
        <div className="container pt-3">
          <div className="d-flex">
            <div className="col-xl-3 col-lg-4 col-md-4 col-8">
              <Link href='/'>
                <img className="footer-logo" src="/images/Learntech325.webp" width={500} height={500} alt="learntech-logo" />
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-md-between flex-md-row flex-column flex-wrap gap-1 gap-md-3">
            <div className="text-white">
              <p className=''>
                Dream. Apply. Achieve.<br></br>
                Our Expert Admission Guidance<br></br>
                is the Bridge that Connects You<br></br>
                to a Brighter Future.</p>
              <span className="footerIcon">
                <div className="mb-3">
                  <a href="tel:18001208696" target="_blank" className="d-inline-block"><i className='bi bi-telephone-fill fs-5 me-2'></i>1800 120 8696</a><br></br>
                </div>
                <div className="mb-3">
                  <a href="mailto:info@learntechww.com" target="_blank" className="d-inline-block"><i className='bi bi-envelope-fill fs-5 me-2'></i>info@learntechww.com</a><br></br>
                </div >
                <div className="mb-3 address">
                  <a href="https://www.google.com/maps/place/Learntech+Edu+Solutions+Pvt+Ltd+-+Study+Abroad+Counselor/@12.9187833,77.5983055,15z/data=!4m6!3m5!1s0x3bae15064e759943:0x60dcac77858f6b5e!8m2!3d12.9187833!4d77.5983055!16s%2Fg%2F11cs1gwx25?entry=ttu" target="_blank" className="mb-3 d-inline-block"><i className='bi bi-geo-alt-fill fs-5 me-2'></i>#80 (4), 'D' Main Rd, East End, 9th Block,<br></br>
                    <span className='px-0 px-md-4'>
                      Jayanagar, Bangalore, Karnataka - 560041</span></a>
                </div>
              </span>
            </div>
            <div className="text-white pb-3 pb-md-0">
              <h5 className="fw-bold mb-3">Info</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/about-us"><small><i className="bi bi-chevron-double-right"></i></small> About us</Link></li>
                <li className='mb-2'><Link href="/our-team"><i className="bi bi-chevron-double-right"></i> Our Team</Link></li>
                <li className='mb-2'><Link href="/services"><i className="bi bi-chevron-double-right"></i> Services</Link></li>
                <li className='mb-2'><Link href="/contact-us"><i className="bi bi-chevron-double-right"></i> Contact us</Link></li>
                <li className='mb-2'><Link href="/career"><i className="bi bi-chevron-double-right"></i> Careers</Link></li>
                <li className='mb-2'><Link href="/sitemap"><i className="bi bi-chevron-double-right"></i> Site Map</Link></li>
              </ul>
            </div>
            <div className="text-white pb-3 pb-md-0 ">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/blogs"><i className="bi bi-chevron-double-right"></i> Blogs</Link></li>
                <li className='mb-2'><Link href="/nri-quota"><i className="bi bi-chevron-double-right"></i> NRI Quata</Link></li>
                <li className='mb-2'><Link href="/study-in-usa"><i className="bi bi-chevron-double-right"></i> Study Abroad</Link></li>
                <li className='mb-2'><Link href="/scholarships"><i className="bi bi-chevron-double-right"></i> Scholarships</Link></li>
                <li className='mb-2'><Link href="/students-speak"><i className="bi bi-chevron-double-right"></i> Student’s Speak</Link></li>
                <li className='mb-2'><Link href="/education-loan"><i className="bi bi-chevron-double-right"></i> Education Loan</Link></li>
              </ul>
            </div>
            <div className="text-white pb-3 pb-md-0">
              <h5 className="fw-bold mb-3">Legal</h5>
              <ul className='list-unstyled'>
                <li className='mb-2'><Link href="/"><i className="bi bi-chevron-double-right"></i> Feed</Link></li>
                <li className='mb-2'><Link href="/disclaimer"><i className="bi bi-chevron-double-right"></i> Disclaimer</Link></li>
                <li className='mb-2'><Link href="/privacy-policy"><i className="bi bi-chevron-double-right"></i> Privacy Policy</Link></li>
                <li className='mb-2'><Link href="/terms-and-conditions"><i className="bi bi-chevron-double-right"></i> Terms & Conditions</Link></li>
                <li className='mb-2'><Link href="/advertise-with-us"><i className="bi bi-chevron-double-right"></i> Advertise With Us</Link></li>
              </ul>
            </div>
            <div className="text-white">
              <h5 className="fw-bold mb-3 mb-md-3">Download Our App</h5>
              <div className='d-flex px-2 px-md-0  flex-row flex-md-column justify-content-around'>
                <a
                //  href="https://apps.apple.com/in/app/learntech/id1623567055" 
                 href="https://play.google.com/store/apps/details?id=com.ilearntech.app" 
                
                target='_blank'><Image className="mb-1 mb-md-3  boxShadow" width={150} height={50} alt="app-store-img" src="/images/icons/app-store.webp" /></a>


                <a href="https://play.google.com/store/apps/details?id=com.ilearntech.app" target='_blank'><Image className=" boxShadow" width={150} height={50} alt="google-play-img" src="/images/icons/google-play.webp" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid">
          <div className="text-md-start">

            <a href="tel:18001208696" className="phone-icon">

              <Image src="/images/icons/Phone-blue.svg" width={35} height={35} alt="phone-icon" className="red-filter" />
            </a>
          </div>
          <div className="text-center pb-3">
            <GlobalEnquiryForm pagename="Brochure" title="Get Brochure" />
          </div>
          <div className="text-md-end">

            <button onClick={scrollToTop} className={`arrowIcon ${showButton ? 'show' : 'hide'}`}><Image width={30} height={30} className="footer-arrow" src="/images/icons/left arrow.svg" alt="arrow-icon" /></button>
            <a href="https://wa.me/+919036020076" target='_blank' className="whatsappIcon" ><Image width={35} height={35} className="footer-arrow" src="/images/icons/whatsapp.svg" alt="whatsapp-icon" /></a>
          </div>
        </div>
      </section>

      <footer className='mainFooter'>
        <div className="container text-white pt-3">
          <div className="row">
            <div className="col-md-6 text-sm-center order-2 order-md-1">
              <p className='text-start'>©2025 Learntech Edu Solutions Pvt. Ltd. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-end order-1 order-md-2 text-center">
              <p className="d-inline-block">Follow us on</p>
              <a href="https://www.facebook.com/learntechedu" target='_blank'><Image width={27} height={27} className='icon-white mx-2' src="/images/icons/Facebook.svg" alt="facebook-icon" /></a>
              <a href="https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/linked-in.svg" alt="linkedIn-icon" /></a>
              <a href="https://twitter.com/learntechww" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/twitter-x.png" alt="twitter-icon" /></a>
              <a href="https://www.instagram.com/learntechedus" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/instagram.svg" alt="instagram-icon" /></a>
              <a href="https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w" target='_blank'><Image width={27} height={27} className='icon-white me-2' src="/images/icons/youtube.svg" alt="youtube-icon" /></a>
            </div>
          </div>
        </div>
        <Toster />
      </footer>
    </>
  );
};
export default Footer;
