import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {wrapper} from 'store';
import MusicBar from '@/components/MusicBar';
import { useState } from 'react';

function App({Component, pageProps}: AppProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <>
      {isLogin && <MusicBar />}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
