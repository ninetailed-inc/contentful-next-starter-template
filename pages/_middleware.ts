import { NextRequest, NextResponse } from 'next/server';
import {
  buildNinetailedEdgeRequestContext,
  fetchEdgeProfile,
} from '../nintailed/next-esr';

const excludedPrefixes = ['/favicon', '/api'];

export async function middleware(req: NextRequest) {
  if (
    excludedPrefixes.find((path) => {
      return req.nextUrl.pathname?.startsWith(path);
    }) /* ||
    req.method !== 'GET' */
  ) {
    return NextResponse.next();
  }

  const { profile } = await fetchEdgeProfile({
    ctx: buildNinetailedEdgeRequestContext({ req }),
    clientId: process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? '',
    environment: process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? '',
    cookies: req.cookies,
    ip: req.ip,
    location: {
      city: req.geo?.city,
      region: req.geo?.region,
      country: req.geo?.country,
    },
  });
  console.log({ 'MIDDLEWARE:Profile': profile });
  let response = NextResponse.next();

  if (profile.audiences.length) {
    const url = req.nextUrl.clone();
    url.pathname = `/;${profile.audiences.join(',')}${req.nextUrl.href.replace(
      req.nextUrl.origin,
      ''
    )}`;
    response = NextResponse.rewrite(url);
  }

  return response;
}
