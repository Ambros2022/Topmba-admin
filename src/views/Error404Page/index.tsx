import BannerSec from "./Components/BannerSec";
import Head from 'next/head'
import { useRouter } from 'next/router'
const Error404Page = () => {
  const router = useRouter()
  return (

    <>
      <BannerSec />
    </>
  )
}
export default Error404Page;