import BannerSec from "./Components/BannerSec";
import Head from 'next/head'
import { useRouter } from 'next/router'
const Error404Page = () => {
  const router = useRouter()
  return (

    <>
      <Head>
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
                  "name": "Error 404",
                  "item": `${process.env.NEXT_PUBLIC_WEB_URL}${router.asPath}`
                },
              ]
            }
          ])}
        </script>
      </Head>
      <BannerSec />
    </>
  )
}
export default Error404Page;