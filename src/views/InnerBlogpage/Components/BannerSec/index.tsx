import Link from 'next/link'
import React from 'react'
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap", // keeps text visible while font loads
});
const BannerSec = ({ data, createdAt }) => {
  return (
    <>
      <section className="newsBannerSec blogBannerSec bg-blue ">
        {/* <Image
          src="/images/icons/BannerBG.webp"
          alt="Blog Banner"
          fill
          priority
          fetchPriority="high"
          style={{ objectFit: 'cover', zIndex: -1 }}
          sizes="100vw"
        /> */}


        {/* <div className="container d-flex h-100 w-100 justify-content-center flex-column align-content-center text-center position-relative">
          <h1 className="fw-bold text-white mb-3">{data?.name}</h1>
          <h6 className="text-white pt-3 pt-md-0">
            Team Learntech <br className="d-block d-md-none" />
            <span className="px-2 d-none d-md-inline">|</span> {createdAt}
          </h6>
        </div> */}
{/* <div
  className="container d-flex h-100 w-100 justify-content-center flex-column align-content-center text-center position-relative"
  style={{ minHeight: '300px' }} // hero height lock
>
  <h1
    className="fw-bold text-white mb-3"
    style={{ minHeight: '3rem' }}
  >
    {data?.name}
  </h1>
  <p
    className="text-white pt-3 pt-md-0 fw-semibold"
    style={{ minHeight: '2rem', margin: 0 }}
  >
    Team Learntech <br className="d-block d-md-none" />
    <span className="px-2 d-none d-md-inline">|</span> {createdAt}
  </p>
</div> */}
  <div
      className={`container d-flex h-100 w-100 justify-content-center flex-column align-content-center text-center position-relative ${roboto.className}`}
      style={{ minHeight: "300px" }}
    >
      <h1 className="fw-bold text-white mb-3" style={{ minHeight: "3rem" }}>
        {data?.name}
      </h1>
      {/* <p
        className="text-white pt-3 pt-md-0 fw-semibold"
        style={{ minHeight: "2rem", margin: 0 }}
      >
        Team Learntech <br className="d-block d-md-none" />
        <span className="px-2 d-none d-md-inline">|</span> {createdAt}
      </p> */}

      <p
  className="text-white pt-3 pt-md-0 fw-semibold"
  style={{
    minHeight: "2rem",     // reserves space for 1 line
    lineHeight: "2rem",    // matches minHeight so text box doesn't grow/shrink
    margin: 0
  }}
>
  Team Learntech <br className="d-block d-md-none" />
  <span className="px-2 d-none d-md-inline">|</span> {createdAt}
</p>
    </div>

      </section>

      <section className="bg-white">
        <div className="container py-3 linkFontSize">
          <Link href="/" className="text-black">
            Home <i className="bi bi-chevron-right"></i>
          </Link>
          <Link href="/blogs" className="text-black">
            Blogs <i className="bi bi-chevron-right"></i>
          </Link>{' '}
          <span className="text-blue">{data?.name}</span>
        </div>
      </section>
    </>
  )
}

export default BannerSec
