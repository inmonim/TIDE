import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {wrapper} from 'store';
import MusicBar from '@/components/MusicBar';

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <MusicBar />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
