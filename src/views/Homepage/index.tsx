import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BannerSection from "./Components/BannerSection";
import NewsLinkSection from "./Components/NewsLinkSection";
import AnalysisSection from "./Components/AnalysisSection";
import Head from "next/head";
const FeaturedCollegeSection = dynamic(() => import("./Components/FeaturedCollegeSection"), { ssr: false });
const ExploreSection = dynamic(() => import("./Components/ExploreSection"), { ssr: false });
const StudyAbroadSection = dynamic(() => import("./Components/StudyAbroadSection"), { ssr: false });
const LatestNewsSection = dynamic(() => import("./Components/LatestNewsSection"), { ssr: false });
const ExpertSection = dynamic(() => import("./Components/ExpertSection"), { ssr: false });


interface Banner {
  image: string;
  link: string;
}

interface WorkProps {
  banners: Banner[];
}

const Work: React.FC<WorkProps> = ({ banners }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 200,
      easing: 'ease-in-sine',
      delay: 100,
      duration: 1000,
    })
  }, []);

  return (
    <>
      <Head>
        <meta
          name='description'
          content='Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.'
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}`} />
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "Mansoor Ali",
              "url": "",
              "image": "https://learntechww.com/_next/image/?url=%2Fimages%2Ficons%2FMansoorAli.jpeg&w=640&q=75",
              "jobTitle": "Founder, Chairman and Managing Director",
              "worksFor": {
                "@type": "Organization",
                "name": "Learntech Edu Solutions Pvt. Ltd."
              }
            }
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Learntech Edu Solutions Pvt. Ltd.",
              "image": "https://learntechww.com/_next/image/?url=%2Fimages%2Ficons%2Flearntech-logo.png&w=256&q=75",
              "@id": "",
              "url": "https://learntechww.com/",
              "telephone": "1800 120 8696",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "#80 (4), 'D' Main Rd, East End, 9th Block, Jayanagar",
                "addressLocality": "Bangalore",
                "postalCode": "560041",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9204609,
                "longitude": 77.5920295
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "10:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.facebook.com/learntechedu",
                "https://twitter.com/learntechww",
                "https://www.instagram.com/learntechedus",
                "https://www.youtube.com/channel/UCZP40_ivVcdelNOVhmQFr7w",
                "https://www.linkedin.com/company/learntech-edu-solutions-pvt-ltd/"
              ]
            }

          )}
        </script>
      </Head>
      <BannerSection banners={banners} />
      <NewsLinkSection />
      <AnalysisSection />
      <FeaturedCollegeSection />
      <ExploreSection />
      <StudyAbroadSection />
      <LatestNewsSection />
      <ExpertSection />
    </>
  );
}


export default Work;
