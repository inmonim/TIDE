import Head from 'next/head';
import styles from '../styles/Mainpage.module.css';
import MusicBar from '@/components/MusicBar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BsChevronCompactRight, BsChevronCompactLeft} from 'react-icons/bs';
import Link from 'next/link';

interface playlists {
  id: number;
  title: string;
  image: string;
}

interface Props {
  playlists: playlists[];
}

function Mainpage() {
  const [playlists, setPlaylists] = useState<playlists[]>([]);

  const url = 'http://localhost:3000/api/playlists';

  const slides = [
    {
      url: 'https://ibighit.com/bts/images/profile/proof/member/bts-m.jpg',
      name: 'BTS',
      id: 1
    },
    {
      url: 'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/05/11/67bd75fb-68d8-4121-bd34-f0d2b0d26ee1_e6d7ff44.jpg?itok=3Hz-PruW&v=1652251890',
      name: 'Le sserafim',
      id: 2
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/NewJeans_theMEGASTUDY.jpg',
      name: 'New Jeans',
      id: 3
    },
    {
      url: 'https://images.samsung.com/is/image/samsung/ph-feature-galaxy-a80-blackpink-176630227?$ORIGIN_JPG$',
      name: 'Blackpink',
      id: 4
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // 플레이 리스트 받아 오기
  useEffect(() => {
    const Token = 'bearer' + localStorage.getItem('token');
    const Email = localStorage.getItem('email');
    async function getPlaylists() {
      try {
        const response = await axios.get(url, {
          // email 대문자인지 소문자 인지 나중에 확인
          headers: {Authorization: Token, Email: Email}
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPlaylists();
  }, []);

  return (
    <div>
      <Head>
        <title>TIDE</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <div>
        <MusicBar />
      </div> */}
      <div className="bg-gradient-to-b from-[#020217] to-[#000066] ml-[230px] min-h-[97vh]">
        <div className="flex flex-col text-white">
          <div className="py-3 my-1 text-3xl font-bold text-center">
            Trending
          </div>
          <div className="w-[750px] h-[400px] m-auto relative group flex flex-row justify-center">
            {/* carousel wrapper */}
            <Link
              style={{backgroundImage: `url(${slides[currentIndex].url})`}}
              className="w-full h-full duration-500 bg-center bg-no-repeat bg-cover rounded-lg opacity-75 drop-shadow-2xl"
              href={`/artist/${slides[currentIndex].id}`}>
              <div className="flex flex-row h-[60px] text-4xl bg-gray-800 mt-[340px] opacity-80 items-center">
                <p className="ml-3 font-bold">{slides[currentIndex].name}</p>
              </div>
            </Link>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={40} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={40} />
            </div>
          </div>

          {/* playlists */}
          <div className="flex flex-col m-6 text-white">
            <h2 className="mb-4 text-2xl font-semibold">Featured Playlists</h2>
            {/* 여기 아래 플레이리스트 뿌려주기 */}
            <div className=" w-[250px] h-[250px] flex flex-row justify-center items-center">
              <div className="flex flex-col items-center">
                <img
                  className="w-48 h-48 rounded-lg drop-shadow-2xl"
                  src="https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj"
                  alt="Playlist 1"
                />
                <p className="mt-2 text-xl drop-shadow-2xl">User's Pick</p>
              </div>
            </div>
          </div>
          {/* <div className="">
            <img src="playlist2.jpg" alt="Playlist 2" />
            <h3>Pop Classics</h3>
          </div> */}
          {/* <div className="">
            <img src="playlist3.jpg" alt="Playlist 3" />
            <h3>New Releases</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
