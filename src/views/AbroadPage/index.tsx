import React from 'react';
import Head from 'next/head';
import BannerSec from './Components/BannerSec'
import StudySec from './Components/StudySec'
import TopUniversity from './Components/TopUniversity'
import FaqSec from './Components/FaqSec'
import OrganizationSection from './Components/OrganizationalSec';
import ExperTraineeSec from './Components/ExpertTrainneSec';
import { useRouter } from 'next/router';
function AbroadPage({ data }) {
  const router = useRouter();

  const formattedData = data && data?.abroadpagefaqs && data?.abroadpagefaqs.map((item) => ({

    "@type": "Question",
    "name": item.questions,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answers,
    },
  }));

  return (
    <>
      <Head>
        {formattedData?.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": formattedData,
            })}
          </script>
        )}
        <script type="application/ld+json">

          {JSON.stringify([




            {

              "@context": "https://schema.org/",

              "@type": "BreadcrumbList",

              "itemListElement": [

                {

                  "@type": "ListItem",

                  "position": 1,

                  "name": "Home",

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}/`



                },

                {

                  "@type": "ListItem",

                  "position": 2,

                  "name": `${data?.name}`,

                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`

                },



              ]

            }

          ])}

        </script>

      </Head>
      <BannerSec data={data} />
      <StudySec data={data} />
      <OrganizationSection data={data} />
      <ExperTraineeSec data={data} />
      <TopUniversity data={data} />
      {data && data?.abroadpagefaqs.length > 0 && <FaqSec data={data} />}
    </>
  )
}

export default AbroadPage
