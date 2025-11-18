import { fetchSitemapXML } from "src/@core/utils/fetchSitemap.ts";

export async function getServerSideProps({ res }) {
  return fetchSitemapXML("courses", res);
}

export default function SitemapNews() {
  return null;
}
