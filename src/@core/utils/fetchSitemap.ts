// File: utils/fetchSitemap.ts

export async function fetchSitemapXML(type: string, res: any) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}api/website/xmlgenerator/get?type=${type}`;
    const response = await fetch(apiUrl, {
      headers: { "Cache-Control": "no-cache" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap [${type}]: ${response.statusText}`);
    }

    const xml = await response.text();

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.write(xml);
    res.end();
  } catch (error) {
    console.error(`[Sitemap][${type}] Error:`, error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/xml");
    res.end(`<error>Unable to generate sitemap: ${type}</error>`);
  }

  return { props: {} };
}
