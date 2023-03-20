import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import styles from '../styles/Landing.module.css';
import Image from 'next/image';
import logo from 'public/images/Logo/TideLogoFinal.png';
import landingImage1 from 'public/images/Landing/Tidelanding1.png';
import landingImage2 from 'public/images/Landing/Tidelanding2.png';
import Link from 'next/link';

function LandingPage() {
  const firstDiv = useRef<HTMLDivElement>(null);
  const secondDiv = useRef<HTMLDivElement>(null);
  // 마우스 윌 이벤트 발생시
  const onClick = (event: any) => {
    secondDiv.current?.scrollIntoView({behavior: 'smooth'});
  }
  const onWheelScroll = (event: any) => {
    // event.preventDefault();
    const {deltaY} = event;
    console.log(deltaY, 'zz');
    // const { scrollTop } = scrollDivRef.current;
    // const pageHeight = window.innerHeight;

    // 마우스 아래와 위일때 조건
    if (deltaY > 0) {
      // console.log("123", deltaY, scrollTop, pageHeight);
      secondDiv.current?.scrollIntoView({behavior: 'smooth'});
    } else if (deltaY < 0) {
      // console.log("456", deltaY, scrollTop, pageHeight);
      firstDiv.current?.scrollIntoView({behavior: 'smooth'});
    }
  };
  return (
    <>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="TIDE는 제공합니다." />
      </Head>
      <div
        onWheel={onWheelScroll}
        onClick={onClick}
        ref={firstDiv}
        className={styles.bigcontainer}>
        <div className={styles.container1}>
          <div className={styles.landingImages}>
            <Image src={landingImage1} alt="Tide Landing" />
          </div>

          <div className={styles.subcontainer1}>
            <Image
              className={styles.landingTideLogo}
              src={logo}
              alt="Tide Logo"
            />
            <h1 className={styles.title}>당신 손안의 음악</h1>
            <p className={styles.text}>
              플레이리스트와 맞춤형 추천을 제공하는 혁신적인 모바일 서비스로,
              이전과는 다른 음악 청취 경험을 즐겨보세요.
            </p>
            <Link href={`/signup`}>
              <button className={styles.button}>가입</button>
            </Link>
            <p className={styles.text2}>이미 계정이 있으신가요?</p>
            <Link href={`/login`}>
              <button className={styles.button}>로그인</button>
            </Link>
          </div>
        </div>

        <div ref={secondDiv} className={styles.container2}>
          <div className={styles.landingImages}>
            <Image src={landingImage2} alt="Tide Landing" />
          </div>

          <div className={styles.subcontainer2}>
            <Image
              className={styles.landingTideLogo}
              src={logo}
              alt="Tide Logo"
            />
            <h1 className={styles.title}>TIDE는 제공합니다</h1>
            <div className={styles.icons}>
              <div className={styles.icontexts}>
                <Image
                  src="/icons/personalize.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>개인 맞춤</p>
              </div>
              <div className={styles.icontexts}>
                <Image
                  src="/icons/analysis.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>분석</p>
              </div>
              <div className={styles.icontexts}>
                <Image
                  src="/icons/networking.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>네트워킹</p>
              </div>
              <div className={styles.icontexts}>
                <Image
                  src="/icons/mobile.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>모바일 지원</p>
              </div>
            </div>
            {/* <button className={styles.button}></button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
