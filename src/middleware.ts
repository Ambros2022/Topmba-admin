import { NextRequest, NextResponse } from 'next/server'

let redirectionsCache: { old_url: string; new_url: string }[] | null = null
let lastCacheTime = 0
const CACHE_TTL = 1000 * 60 * 60 * 12 

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // console.log("json=======================")
  if (pathname.endsWith('.json')) return NextResponse.next()
    // console.log("json=======================2",pathname)
  // ✅ Skip Next.js internal prefetch requests
  const isPrefetch = request.headers.get('x-middleware-prefetch') === '1'
  if (isPrefetch) return NextResponse.next()

  try {
    // ✅ Cache redirect rules for 5 minutes
    const now = Date.now()
    if (!redirectionsCache || now - lastCacheTime > CACHE_TTL) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
      const response = await fetch(apiUrl)
      // console.log("new req")
      if (response.ok) {
        redirectionsCache = await response.json()
        lastCacheTime = now
      } else {
        console.error('Redirect fetch failed:', response.statusText)
      }
    }

    const redirect = redirectionsCache?.find(item => item.old_url === pathname)

    if (redirect) {
      url.pathname = redirect.new_url
      url.href = url.origin + redirect.new_url
      return NextResponse.redirect(url, 301)
    }

    // ✅ Trailing slash normalization
    if (pathname !== '/' && pathname.endsWith('/')) {
      const cleanPath = pathname.slice(0, -1)
      url.pathname = cleanPath
      url.href = url.origin + cleanPath
      return NextResponse.redirect(url, 301)
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/|api/|$|_next|admin/login|thank-you|write-review|app/dashboard(?:/.*)?|.*\\.(?:js|css|json|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|map)).*)',
  ],
}