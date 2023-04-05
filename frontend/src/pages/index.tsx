import Head from 'next/head';
import Image from 'next/image';
import {Inter} from 'next/font/google';
import styles from '@/styles/Home.module.css';
// import Landing from './landing';

const inter = Inter({subsets: ['latin']});

export default function Home() {
  return (
    <>
      <Head>
        <title>TIDE</title>
        <meta name="description" content="Tide의 메인 페이지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        {/* <Landing /> */}
        <div className={styles.description}></div>
      </main>
    </>
  );
}
