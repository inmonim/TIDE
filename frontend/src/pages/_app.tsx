import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {wrapper} from 'store';
import MusicBar from '@/components/MusicBar';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';

function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
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

export default wrapper.withRedux(App);
