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
// import App from 'next/app';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 파이어베이스
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc
} from 'firebase/firestore';
import {dbService} from '@/firebase';

function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  const myNick = getCookie('nickname');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 상태 체크
  useEffect(() => {
    // 쿠키 가져오고
    const token = getCookie('accessToken');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [router]);

  // 알람메시지 데이터들
  const [alramDatas, setAlramDatas] = useState<any[]>([]);

  // 알람 데이터들 가져오기
  const getContents = async () => {
    // 우선 query로 데이터 가져오기 두번째 인자 where로 조건문도 가능
    const alrams = query(
      // 여기 중요.. 바로 router에서 가져와서 해야함.. 안그러니까 한박자 느리네
      collection(dbService, `${myNick}alram`),
      orderBy('createdAt')
    );

    // 실시간 알람 감지 최신버전
    onSnapshot(alrams, snapshot => {
      const alramSnapshot = snapshot.docs.map(con => {
        return {
          ...con.data(),
          id: con.id
        };
      });
      setAlramDatas(prev => [...alramSnapshot]);
    });
  };
  useEffect(() => {
    getContents();
  }, []);
  // 업데이트 알람
  const updateAlram = async (id: string) => {
    await updateDoc(doc(dbService, `${myNick}alram`, `${id}`), {
      check: true
    });
  };

  // 메시지 감지
  useEffect(() => {
    if (alramDatas && alramDatas.length > 0) {
      const {userNick, check, id} = alramDatas[alramDatas.length - 1];

      if (check === false && !router.query.roomName?.includes(`${userNick}`)) {
        toast.info(`${userNick}한테 메시지왔쪄염!!!!`);
        updateAlram(id);
      }
    }
  }, [alramDatas]);

  return (
    <>
      {isLogin && <MusicBar />}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        closeOnClick={true}
        draggable
        pauseOnHover
        theme="dark"
        limit={2}
        // icon={({ type }) => {
        //   switch (type) {
        //     case "success":
        //       return "💚";
        //     case "error":
        //       return "❗";
        //     case "info":
        //       return "🗨";
        //   }
        // }}
        progressStyle={{
          height: '0.1rem'
          // height: "0rem",
        }}
        style={{
          fontSize: '1rem',
          minWidth: 'fit-content'
        }}
      />
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
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps: any = await App.getInitialProps(appContext);

//   const {ctx} = appContext;
//   const allCookies = cookies(ctx);
//   const accessTokenByCookie = allCookies['accessToken'];

//   return {...appProps};
// };

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

export default wrapper.withRedux(App);
