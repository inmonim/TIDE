import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const token = request ? request.cookies.get('accessToken')?.value : null;
  const nickname : string | null | undefined = request ? request.cookies.get('nickname')?.value : null;
  // token 확인후 로그인 페이지로 리다이렉트

  if (!token && request.nextUrl.pathname.startsWith('/mainpage')) {
    return NextResponse.redirect(new URL('/landing', request.url));
  }
  if (!token && request.nextUrl.pathname.startsWith('/diary')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!token && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!token && request.nextUrl.pathname.startsWith('/artist')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!token && request.url.includes("/user")) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (!token && request.url.includes("/message")) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 다른사람이 url로 채팅접근하는거 막음
  if (token && request.url.includes("/message/")) {
    // 인코딩 해야함 
    const encodeNickName = encodeURIComponent(nickname!);
    if (request.url.includes(`${encodeNickName}`)) {
      return 
    } 
    return NextResponse.redirect(new URL('/mainpage', request.url));
  }
  // 토큰있을떄 로긴 랜딩접근시 메인페이지로
  if (token && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/mainpage', request.url));
  }
  
  
  if (token && request.nextUrl.pathname.startsWith('/landing')) {
    return NextResponse.redirect(new URL('/mainpage', request.url));
  }
  
}
export const config = {
  // matcher: '/:path*'
  matcher: [
    '/diary',
    '/diary/:path*',
    '/mainpage',
    '/landing',
    '/login',
    '/profile',
    '/artist',
    '/artist/:path*',
    '/user/:path*',
    '/message',
    '/message/:path*',
  ]
};
