import React, { useCallback, useEffect, useState } from 'react'
import NewsList from '../newsList'
import Link from 'next/link'
import axios from 'src/configs/axios'
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface NewsItem {
    slug: any
    id: number
    name: string
    banner_image: string
    meta_description: string
    category_id: string
}

interface GroupedNewsItems {
    [key: string]: NewsItem[]
}

const BrowseNewsSec = ({ collegeData,categories, activeTab, setActiveTab }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [newsItems, setNewsItems] = useState<GroupedNewsItems>({})
    const newsPerPage = 8
    const isMountedRef = useIsMountedRef()
    const [isMobile, setIsMobile] = useState(false)

    const responsive = {
        mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 1,
        },
    }

    const getNewsdata = useCallback(
        async (id, page = 1) => {
            try {
                const roleparams = { page, size: newsPerPage,columnname:'created_at',orderby:'desc' }
                const url = id === 'all' ? '/api/website/news/get' : `/api/website/news/get?category_id=${id}`
                const response = await axios.get(url, { params: roleparams })

                if (response.data.status === 1) {
                    setNewsItems(prevState => ({
                        ...prevState,
                        [id]: response.data.data
                    }))
                    setTotalPages(response.data.totalPages)
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching exams:', error)
            }
        },
        [newsPerPage, isMountedRef]
    )

    useEffect(() => {
        if (activeTab) {
            getNewsdata(activeTab, currentPage)
        }
    }, [activeTab, currentPage, getNewsdata])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleTabClick = id => {
        setActiveTab(id)
        setCurrentPage(1)
    }

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.max(prevPage - 1, 1)
            getNewsdata(activeTab, newPage) // Fetch new data for the previous page
            return newPage
        })
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = Math.min(prevPage + 1, totalPages)
            getNewsdata(activeTab, newPage) // Fetch new data for the next page
            return newPage
        })
    }

    const handlePageClick = page => {
        setCurrentPage(page)
        getNewsdata(activeTab, page) // Fetch data for the clicked page
    }

    const currentNews = newsItems[activeTab] || []

    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className="carousel-button-group d-flex justify-content-between gap-5 fs-2">
                <span className='fi-left' onClick={previous}>
                    <FiChevronLeft />
                </span>
                <span className='fi-right' onClick={next}>
                    <FiChevronRight />
                </span>
            </div>
        )
    }

    const renderTabs = () => {
        return categories.map(category => (
            <button
                key={category.id}
                className={`btn bg-skyBlue hover-card ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => handleTabClick(category.id)}
            >
                {category.title}
            </button>
        ))
    }

    return (
        <>
            <section className='py-5 pb-3 pb-md-5 bg-white browseNews'>
                <div className='container'>
                    <h2 className='fw-bold text-blue text-center mb-3'>Browse News By Category</h2>
                    {isMobile ? (
                        <span className='position-relative innerNewsCarousel'>
                            <Carousel
                                swipeable
                                draggable
                                showDots={false}
                                arrows={false}
                                infinite
                                autoPlay
                                autoPlaySpeed={2000}
                                ssr
                                renderButtonGroupOutside
                                customButtonGroup={<ButtonGroup next={undefined} previous={undefined} />}
                                responsive={responsive}
                                className="newsTabsClr gap-3 mx-auto text-center"
                            >
                                {renderTabs()}
                            </Carousel>
                        </span>
                    ) : (
                        <div className='d-flex justify-content-center newsTabsClr gap-3 mx-0 flex-wrap flex-row'>
                            {renderTabs()}
                        </div>
                    )}
                    <div className='row mb-3 mt-5'>
                        <div className='col-lg-8 col-xl-8 col-md-7'>
                            <div className='tab-content' id='pills-tabContent'>
                                <div
                                    className={`tab-pane fade ${activeTab === activeTab ? 'show active' : ''}`}
                                    id={`pills-${activeTab}`}
                                    role='tabpanel'
                                    aria-labelledby={`pills-${activeTab}-tab`}
                                >
                                    <div className='row d-flex flex-row'>
                                        {loading ? (
                                            <div className='text-center'> Loading....</div>
                                        ) : currentNews.length > 0 ? (
                                            currentNews.map(item => (
                                                <div key={item.id} className='col-lg-6 px-4 mx-lg-0 mb-5 d-flex'>
                                                    <div className='card h-100 w-100 d-flex flex-column bg-skyBlue'>
                                                        <div className='newsPageImg'>
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item.banner_image}`}
                                                                width={400}
                                                                height={400}
                                                                className='img-fluid'
                                                                alt='newsImage'
                                                            />
                                                        </div>
                                                        <Link className='text-black hover-blue flex-grow-1' href={`/news/${item.id}/${item.slug}`}>
                                                            <div className='card-body d-flex flex-column'>
                                                                <h5 className='fw-bold card-title'>{item.name}</h5>
                                                            </div>
                                                        </Link>
                                                        <div className='p-3 mt-auto'>
                                                            <Link href={`/news/${item.id}/${item.slug}`}>
                                                                <button className='btn viewMoreCollegeBtn'>View Detail</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))
                                        ) : (
                                            <div className='text-center pb-5'>No news available</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div className='d-flex justify-content-center'>
                                <nav aria-label='Page navigation example'>
                                    <ul className='pagination d-flex gap-3'>
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className='page-link' onClick={handlePreviousPage} aria-label='Previous'>
                                                <span aria-hidden='true'>{'<'}</span>
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button className='page-link' onClick={() => handlePageClick(index + 1)}>
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className='page-link' onClick={handleNextPage} aria-label='Next'>
                                                <span aria-hidden='true'>{'>'}</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className='col-lg-4 col-xl-4 col-md-5'>
                            <div className='bg-skyBlue p-5 d-flex justify-content-center rounded'>
                                <div className='align-content-center get-news'>
                                    <h2 className='text-blue fw-bold text-center mb-3 getalert'><i className='bi bi-megaphone-fill me-2 '></i>Get Upcoming News Alerts</h2>
                                    <div className='d-flex gap-3 flex-lg-row flex-column justify-content-between'>
                                        <GlobalEnquiryForm buttonText='Follow Us' className='btn viewMoreCollegeBtn' />
                                        <GlobalEnquiryForm buttonText='Ask a Question' className='btn btn-success' />
                                    </div>
                                </div>
                            </div>
                            <NewsList newsItems={collegeData} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BrowseNewsSec
