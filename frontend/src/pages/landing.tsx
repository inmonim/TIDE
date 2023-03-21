import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import styles from '../styles/Landing.module.css';
import Image from 'next/image';
import logo from 'public/images/Logo/TideLogoFinal.png';
import landingImage1 from 'public/images/Landing/Tidelanding1.png';
import landingImage2 from 'public/images/Landing/landingtest1.png';
import Link from 'next/link';

function LandingPage() {
  const firstDiv = useRef<HTMLDivElement>(null);
  const secondDiv = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<number>(0);

  // 마우스 윌 이벤트 발생시
  const onWheelScroll = (event: any) => {
    const {deltaY} = event;
    if (deltaY > 0) {
      setTimeout(() => {
        secondDiv.current?.scrollIntoView({behavior: 'smooth'});
      }, 600);
    } else {
      setTimeout(() => {
        firstDiv.current?.scrollIntoView({behavior: 'smooth'});
      }, 600);
    }
  };

  return (
    <>
      <Head>
        <title>My Landing Page</title>
        <meta name="description" content="TIDE는 제공합니다." />
      </Head>

      {/* 전체 컨테이너 */}
      <div
        onWheel={onWheelScroll}
        className="flex flex-col w-full h-full justify-items-center">
        {/* container1 */}
        <div
          className="flex flex-row items-center content-center justify-center w-full h-screen pt-24 bg-[#021b30]"
          ref={firstDiv}>
          {/* landingImage */}
          <div className="w-[1100px] h-[850px]">
            <Image src={landingImage1} alt="Tide Landing" />
          </div>
          {/* subcontainer1 */}
          <div className="flex flex-col items-center justify-center max-w-[400px] ml-16 mb-20">
            {/* Tide 로고 */}
            <Image
              className="w-[300px] h-[100px] p-1"
              src={logo}
              alt="Tide Logo"
            />
            {/* title */}
            <h1 className="my-6 text-4xl font-bold text-center text-white">
              당신 손안의 음악
            </h1>
            <p className="my-6 text-2xl text-center text-white">
              플레이리스트와 맞춤형 추천을 제공하는 혁신적인 모바일 서비스로,
              이전과는 다른 음악 청취 경험을 즐겨보세요.
            </p>
            <Link href={`/signup`}>
              {/* 버튼 */}
              <button className="w-[200px] h-[50px] text-3xl text-center bg-blue-500 rounded-lg text-white cursor-pointer">
                가입
              </button>
            </Link>
            <p className="my-6 text-2xl text-center text-white">
              이미 계정이 있으신가요?
            </p>
            <Link href={`/login`}>
              <button className="w-[200px] h-[50px] text-3xl text-center bg-blue-500 rounded-lg text-white cursor-pointer">
                로그인
              </button>
            </Link>
          </div>
        </div>

        <div
          ref={secondDiv}
          className="flex flex-row items-center content-center justify-center w-full h-screen bg-[#021b30]">
          <div className="w-[1100px] h-[850px] overflow-hidden">
            <Image
              src={landingImage2}
              className={`max-h-[85%] object-cover rounded-[20px] shadow-md hover:rounded-[20px]`}
              alt="Tide Landing"
            />
          </div>

          <div className="flex flex-col items-center justify-center max-w-[400px] ml-16">
            <Image
              className="w-[300px] h-[100px] p-1"
              src={logo}
              alt="Tide Logo"
            />
            <h1 className="my-6 text-4xl font-bold text-center text-white">
              TIDE는 제공합니다
            </h1>
            {/* 아이콘 */}
            <div className="flex flex-row flex-wrap justify-center mb-8">
              {/* 아이콘텍스트 */}
              <div className="flex flex-col items-center justify-center m-6 text-white hover:animate-pulse">
                <Image
                  src="/icons/personalize.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>개인 맞춤</p>
              </div>
              <div className="flex flex-col items-center justify-center m-6 text-white hover:animate-co">
                <Image
                  src="/icons/analysis.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>분석</p>
              </div>
              <div className="flex flex-col items-center justify-center m-6 text-white">
                <Image
                  src="/icons/networking.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>네트워킹</p>
              </div>
              <div className="flex flex-col items-center justify-center m-6 text-white">
                <Image
                  src="/icons/mobile.png"
                  width={100}
                  height={100}
                  alt="personalize-icon"
                />
                <p>모바일 지원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
