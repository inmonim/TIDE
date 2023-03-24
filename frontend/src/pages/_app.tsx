import '@/styles/globals.css';
import type {AppContext, AppProps} from 'next/app';
import {wrapper} from 'store';
import MusicBar from '@/components/MusicBar';
import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';
import cookies from 'next-cookies';
import {getCookie} from 'cookies-next';
import {setToken} from '@/components/TokenManager';
import App from 'next/app';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 상태 체크
  useEffect(() => {
    // 쿠키 가져오고
    const token = getCookie('accessToken');
    if (token) {
      console.log(token, '토큰 있음');
      setIsLogin(true);
    } else {
      console.log(token, '토큰 없음');
      setIsLogin(false);
    }
  }, [router]);
  return (
    <>
      {isLogin && <MusicBar />}
      <AnimatePresence key={router.route}>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.8
          }}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps: any = await App.getInitialProps(appContext);

  const {ctx} = appContext;
  const allCookies = cookies(ctx);
  const accessTokenByCookie = allCookies['accessToken'];

  return {...appProps};
};

// App.getInitialProps = async (appContext: AppContext) => {
//   const appProps: any = await App.getInitialProps(appContext)

//   const {ctx} = appContext;
//   const allCookies = cookies(ctx);
//   console.log(allCookies, "쿠키데이터");
//   const accessTokenByCookie = allCookies['accessToken'];

//   if(accessTokenByCookie !== undefined) {
//       const refreshTokenByCookie = (allCookies["refreshToken"] || "");
//       setToken(accessTokenByCookie, refreshTokenByCookie)
//   }

//   return {...appProps}
// }

export default wrapper.withRedux(MyApp);
