import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import axios1 from 'src/configs/axios'
import { createRoot } from 'react-dom/client'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
const Statedropdown = dynamic(() => import('src/@core/layouts/components/Header/state-dropdown'), { ssr: false })
const Coursedropdown = dynamic(() => import('src/@core/layouts/components/Header/course-dropdown'), { ssr: false })
const Examdropdown = dynamic(() => import('src/@core/layouts/components/Header/exam-dropdown'), { ssr: false })
const Abroaddropdown = dynamic(() => import('src/@core/layouts/components/Header/abroad-dropdown'), { ssr: false })
// const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), { ssr: false })
const GlobalEnquiryForm = dynamic(() => import('src/@core/components/popup/GlobalPopupEnquiry'), {
  ssr: false,
  loading: () => <button className='btn counsellingBtn'>Loading...</button>
})
// import Statedropdown from 'src/@core/layouts/components/Header/state-dropdown'
// import Coursedropdown from 'src/@core/layouts/components/Header/course-dropdown'
// import Examdropdown from 'src/@core/layouts/components/Header/exam-dropdown'
// import Abroaddropdown from 'src/@core/layouts/components/Header/abroad-dropdown'
// import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry'
const EditorEnquiryForm = dynamic(() => import('src/@core/components/popup/Editor/EditorPopupEnquiry'), { ssr: false })
const ConditionalModal = dynamic(() => import('./ConditionalModal'), { ssr: false })

const AvatarDropdown = dynamic(() => import('src/@core/components/avatar'), {
  ssr: false,
  // loading: () => <p>Loading...</p>
})


// import AvatarDropdown from 'src/@core/components/avatar'

interface Country {
  id: number
  name: string
}

interface Courses {
  id: number
  slug: string
}


const Header = () => {
  const router = useRouter()
  const [states, setStates] = useState<any[]>([])
  const [exams, setExams] = useState<any[]>([])
  const isMountedRef = useIsMountedRef()
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const [news, setNews] = useState<any[]>([])

  const [countries, setCountries] = useState<Country[]>([])
  const [courses, setCourses] = useState<Courses[]>([])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
  };


  const isLinkActive = href => {
    return router.pathname === href
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const getnews = useCallback(async () => {
    setNews([])
    try {
      const roleparams: any = {}
      roleparams['page'] = 1
      roleparams['size'] = 10000
      roleparams['country_id'] = 204
      roleparams['columnname'] = 'created_at'
      roleparams['orderby'] = 'desc'
      const response = await axios1.get('api/website/news/get', { params: roleparams })
      setNews(response.data.data)
    } catch (err) {
      console.error(err)
      console.error(err)
    }
  }, [isMountedRef])

  const getCountry = useCallback(async () => {
    try {
      const roleparams = { page: 1, size: 15 }
      const response = await axios1.get('api/website/abroadpages/get', { params: roleparams })
      setCountries(response.data.data)
    } catch (err) {
      console.error(err)
      console.error(err)
    }
  }, [isMountedRef])

  const getCourses = useCallback(async () => {
    setCourses([])
    try {
      const roleparams = { page: 1, size: 10000, orderby: 'asc', columnname: 'listing_order' }
      const response = await axios1.get('api/website/stream/get', { params: roleparams })
      setCourses(response.data.data)
    } catch (err) {
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getCountry()
  }, [getCountry])

  const getuniversities = useCallback(async () => {
    setStates([])
    try {
      const roleparams: any = {}
      roleparams['page'] = 1
      roleparams['size'] = 10000
      roleparams['country_id'] = 204
      const response = await axios1.get('api/website/states/get', { params: roleparams })
      setStates(response.data.data)
    } catch (err) {
      console.error(err)
      console.error(err)
    }
  }, [isMountedRef])

  const getexams = useCallback(async () => {
    setExams([])
    try {
      const roleparams: any = {}
      roleparams['page'] = 1
      roleparams['size'] = 10000
      const response = await axios1.get('api/website/stream_exams/get', { params: roleparams })
      setExams(response.data.data)
    } catch (err) {
      console.error(err)
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getuniversities()
    getexams()
    getnews()
    getCourses()
  }, [getuniversities, getexams, getnews, getCourses])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const replaceStrongWithComponent = () => {
        const strongElements = document.getElementsByTagName('strong')

        for (let i = 0; i < strongElements.length; i++) {
          if (strongElements[i].innerText === 'Apply_Now') {
            const container = document.createElement('div')
            //@ts-ignore
            strongElements[i].parentNode.replaceChild(container, strongElements[i])
            const root = createRoot(container)
            root.render(<EditorEnquiryForm className='applyNowButton btn btn-sm ' />)
          }
        }
      }

      replaceStrongWithComponent()

      const observer = new MutationObserver(replaceStrongWithComponent)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => observer.disconnect()
    }
  }, [])

  return (
    <>
      <header className='bg-header py-2'>
        <div className='container-lg'>
          <div className='row'>
            <div className='col-md-3 d-flex align-items-center socialIcon'>
              <a href='https://www.facebook.com/learntechedu' target='_blank'>
                <Image className='mx-2' width={26} height={22} src='/images/icons/Facebook.svg' alt='facebook-img' />
              </a>
              <a href='https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/' target='_blank'>
                <Image className='me-2' width={26} height={22} alt='linked-in-img' src='/images/icons/linked-in.svg' />
              </a>
              <a href='https://twitter.com/learntechww' target='_blank'>
                <Image className='me-2' src='/images/icons/twitter-x.png' width={26} height={22} alt='twitter-img' />
              </a>
              <a href='https://www.instagram.com/learntechedus' target='_blank'>
                <Image className='me-2' src='/images/icons/instagram.svg' width={26} height={22} alt='instagram-img' />
              </a>
              <a href='https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w' target='_blank'>
                <Image className='me-2' src='/images/icons/youtube.svg' width={26} height={22} alt='youtube-img' />
              </a>
            </div>
            <div className='col-md-9 d-flex align-items-center justify-content-end socialText'>
              <div>
                <span className='telHover'>
                  <Image className='m-0' src='/images/icons/Phone-blue.svg' width={26} height={22} alt='phone-icon' />
                  <a href='tel:18001208696' target='_blank' className='mx-2 ' style={{ color: '#274896' }}>
                    1800 120 8696
                  </a>
                </span>
                <span className='mailHover'>
                  <Image className='ms-2' src='/images/icons/email-icon.svg' width={26} height={22} alt='email-icon' />

                  <a href='mailto:info@learntechww.com' className='mx-2' style={{ color: '#274896' }}>
                    info@learntechww.com
                  </a>
                </span>
                <button onClick={openModal} className='ms-2 btn reviewBtn'>
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>



      <nav className='navbar navbar-expand-lg bg-white ' style={{ zIndex: '100' }}>
        {/* <Link className='navbar-brand hlogo' href='/' style={{ display: 'inline-block', width: 160, height: 50 }}> */}
        <Link className='navbar-brand hlogo' href='/' >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }} className='ps-md-5 ps-0'>
            <Image
              src='/images/Learntech160.webp'
              alt='learntech-logo'
              priority
              width={160}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggle}
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isOpen ? 'show' : ''}collapse navbar-collapse collapseNavHeight  `}
          id='navbarSupportedContent'
        >
          <div className='d-lg-none text-center py-3'>
            <div
              className='guest-icon'
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px'
              }}
            >
              <i className='bi bi-person' style={{ fontSize: '30px' }}></i>
            </div>
            <p>Welcome Guest!</p>
            <div className='d-flex justify-content-center gap-2'>
              <button
                className='submitBtn btn-xl btn-block applyNowButton btn'
                onClick={openModal}
                style={{ fontSize: '14px' }}
              >
                WRITE A REVIEW
              </button>
              <button
                className='submitBtn btn-xl btn-block btn applyNowButton btn'
                onClick={openModal}
                style={{ fontSize: '14px' }}
              >
                LOGIN / REGISTER
              </button>
            </div>
          </div>
          <span className='top-nav ps-5'>
            <ul className='navbar-nav  ps-0 ps-md-5'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${isLinkActive('/') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  aria-current='page'
                  href='/'
                >
                  Home
                </Link>
              </li>

              <li
                className='nav-item dropdown maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Link
                  className={`nav-link dropdown-toggle no-arrow ${isLinkActive('/universities') ? 'active' : ''}`}
                  href='/universities'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Universities
                </Link>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  &gt;
                </span>


                <div
                  className={`dropdown-menu custom-dropdown ${isDropdownOpen ? 'show' : ''}`}
                >
                  {isDropdownOpen && <Statedropdown states={states} type="Colleges" onClose={closeDropdown} />}

                </div>

              </li>

              <li
                className='nav-item dropdown maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}

              >
                <Link
                  className={`nav-link dropdown-toggle no-arrow ${isLinkActive('/colleges') ? 'active' : ''}`}
                  href='/colleges'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Colleges
                </Link>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}

                >
                  &gt;
                </span>


              

                <div className={`dropdown-menu custom-dropdown ${isDropdownOpen ? "show" : ""}`}>
                  {isDropdownOpen && <Statedropdown states={states} type="Colleges" onClose={closeDropdown} />}
                </div>
              </li>

              <li
                className='nav-item dropdown maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Link
                  className={`nav-link dropdown-toggle no-arrow ${isLinkActive('/courses') ? 'active' : ''}`}
                  href='/courses'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  &gt;
                </span>



                <div
                  className={`dropdown-menu custom-dropdown ${isDropdownOpen ? 'show' : ''}`}

                >
                  {/* <Coursedropdown states={courses} type="Colleges" onClose={closeDropdown} /> */}
                  {isDropdownOpen && <Coursedropdown states={courses} type="Colleges" onClose={closeDropdown} />}

                </div>




              </li>

              <li
                className='nav-item dropdown maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Link
                  className={`nav-link dropdown-toggle no-arrow ${isLinkActive('/exams') ? 'active' : ''}`}
                  href='/exams'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Exams
                </Link>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation()

                  }}
                >
                  &gt;
                </span>

                <div
                  className={`dropdown-menu custom-dropdown  ${isDropdownOpen ? 'show' : ''}`}

                >
                  {/* <Examdropdown states={exams} onClose={closeDropdown} /> */}
                  {/* {isDropdownOpen && <Examdropdown states={exams}  onClose={closeDropdown} />} */}
                  {isDropdownOpen && <Examdropdown states={exams} type="Colleges" onClose={closeDropdown} />}



                </div>


              </li>

              <li
                className='nav-item dropdown maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <a
                  className={`nav-link dropdown-toggle no-arrow`}
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Study Abroad
                </a>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  &gt;
                </span>

                <div
                  className={`dropdown-menu custom-dropdown ${isDropdownOpen ? 'show' : ''}`}

                >
                  {/* <Abroaddropdown states={countries} type="Colleges" onClose={closeDropdown} /> */}
                  {isDropdownOpen && <Abroaddropdown states={countries} type="Colleges" onClose={closeDropdown} />}

                </div>


              </li>

              <li
                className='nav-item dropdown latest-static maintain'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Link
                  className={`nav-link dropdown-toggle no-arrow ${isLinkActive('/news') ? 'activeDrpDwn' : ''}`}
                  href='/news'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsOpen(false)}
                >
                  Latest News
                </Link>
                <span
                  className={`dropdown-icon d-md-none ${isDropdownOpen ? 'rotate' : ''}`}
                  onClick={event => {
                    event.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                >
                  &gt;
                </span>


                {isDropdownOpen && (<div className="container-fluid">
                  <ul className="newsDrpDwn newsHide dropdown-menu" style={{ textAlign: "center", left: '0', right: "0", width: '80%', margin: "0 auto" }} aria-labelledby="navbarDropdownMenuLink">
                    <div className="dropdown-row-news dropdown-row p-2">
                      <div className="row">
                        {news.slice(0, 4).map((item) => (
                          <li key={item.id} className="news-item mb-1 col-md-3">
                            <Link
                              href={`/news/${item.id}/${item.slug}`}
                              onClick={toggleDropdown}

                            >
                              <div className="card-news hover-card bg-skyBlue card">
                                <div className="cardImgNewsheight">
                                  <img height={200} width={200} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`} className="card-img-top" alt="News Banner" />
                                </div>
                                <div className="card-body">
                                  <p className="card-text" >{item.meta_description}</p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}

                      </div>
                    </div>
                  </ul>
                </div>
                )}
              </li>

              <li className='nav-item dropdown d-lg-inline-block d-none'>
                <Link
                  className={`nav-link dropdown-toggle `}
                  onClick={() => setIsOpen(false)}
                  href='/'
                  id='navbarDropdownMenuLink'
                  role='button'
                  aria-expanded='false'
                >
                  More
                </Link>
                <ul className='dropdown-menu another-item' aria-labelledby='navbarDropdownMenuLink'>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item ' href='/about-us'>
                      About US
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/our-team'>
                      Our Team
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/services'>
                      Services
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/blogs'>
                      Blogs
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/boards'>
                      Boards
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/schools'>
                      Schools
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/nri-quota'>
                      NRI Quota
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/scholarships'>
                      Scholarships
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/mbbs-abroad'>
                      MBBS Abroad
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/meds'>
                      Medical Edu Studio
                    </Link>
                  </li>
                  <li className='nav-items-select'>
                    <Link className='d-flex justify-content-between dropdown-item' href='/education-loan'>
                      Education Loan
                    </Link>
                  </li >
                </ul>
              </li>
              <li className='nav-avt'>
                <AvatarDropdown openModal={openModal} />
              </li>
              <li className='hideBtnTxt nav-cons'>
                <GlobalEnquiryForm buttonText='Get Counselling' className='btn counsellingBtn' />
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/about-us') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/about-us'
                >
                  About Us
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/our-team') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/our-team'
                >
                  Our Team
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/services') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/services'
                >
                  Services
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/blogs') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/blogs'
                >
                  Blogs
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/boards') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/boards'
                >
                  Boards
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/schools') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/schools'
                >
                  Schools
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/nri-quota') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/nri-quota'
                >
                  NRI Quota
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/scholarships') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/scholarships'
                >
                  Scholarships
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/mbbs-abroad') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/mbbs-abroad'
                >
                  MBBS Abroad
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/meds') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/meds'
                >
                  Medical Edu Studio
                </Link>
              </li>
              <li className='nav-item dropdown d-lg-none d-md-inline-block'>
                <Link
                  className={`nav-link ${isLinkActive('/education-loan') ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  href='/education-loan'
                >
                  Education Loan
                </Link>
              </li>
            </ul>
          </span>
        </div>

      </nav>
      {showModal && <ConditionalModal showModal={showModal} closeModal={closeModal} />}
    </>
  )
}

export default Header
