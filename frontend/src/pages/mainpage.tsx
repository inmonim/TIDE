import Head from 'next/head';
import styles from '../styles/Mainpage.module.scss';
import MusicBar from '@/components/MusicBar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BsChevronCompactRight, BsChevronCompactLeft} from 'react-icons/bs';
import Link from 'next/link';
import {getCookie} from 'cookies-next';
import cookie from 'react-cookies';
import {useAppDispatch, useAppSelector} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import {likeTopSixAsync} from 'store/api/features/likeTopSixSlice';
import {playlisttopAsync} from 'store/api/features/playlisttopSlice';
import {useRouter} from 'next/router';
import {publicDiaryAsync} from 'store/api/features/publicDiarySlice';
import parse from 'html-react-parser';

interface playlists {
  id: number;
  playlistTitle: string;
  isPublic: boolean;
  likeCnt: number;
}

interface diarylist {
  id: number;
  title: string;
  nickname: string;
  content: string;
  createDt: string;
  like: number;
}

interface Props {
  playlists: playlists[];
  diarylist: diarylist[];
}

function Mainpage() {
  const dispatch = useAppDispatch();
  const {nickname, profile_img_path} = useAppSelector(state => {
    return state.profile;
  });
  const router = useRouter();

  const [playlists, setPlaylists] = useState<playlists[]>([]);
  const [diarylist, setDiarylist] = useState<diarylist[]>([]);
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

  const topArtists = useAppSelector(state => {
    return state.likeTopSix.topArtist;
  });

  const topPlaylist = useAppSelector(state => {
    return state.playlisttop.topPlaylist;
  });

  const publicDiary = useAppSelector(state => {
    return state.publicDiary.diarys;
  });

  useEffect(() => {
    dispatch(likeTopSixAsync());
  }, []);

  useEffect(() => {
    dispatch(playlisttopAsync());
  }, []);

  useEffect(() => {
    dispatch(publicDiaryAsync());
  }, []);

  const topPlaylistShow = topPlaylist.map((playlist: any) => ({
    id: playlist.id,
    playlistTitle: playlist.playlistTitle,
    isPublic: playlist.isPublic,
    likeCnt: playlist.likeCnt
  }));

  const slides = topArtists.map((artist: any) => ({
    id: artist.artistId,
    artistImgPath: artist.artistImgPath,
    artistName: artist.artistName
  }));

  // 다이어리
  const topdiary = publicDiary.map((diary: any) => ({
    id: diary.id,
    nickname: diary.nickname,
    title: diary.title,
    content: diary.content,
    createDt: diary.createDt,
    pub: diary.pub,
    like: diary.like
  }));

  const gotoTopPlaylist = (id: number) => {
    router.push(`/playlist/${id}`);
  };

  // 더미 플레이리스트
  useEffect(() => {
    // 내 프로필정보 요청
    dispatch(profileAsync());
    setPlaylists(topPlaylistShow);
    setDiarylist(topdiary);
  }, [topPlaylist, publicDiary]);

  // 쿠키에 닉네임 추가
  useEffect(() => {
    cookie.save('nickname', nickname, {
      path: '/'
      // , expires
      // , httpOnly: HTTP_ONLY // dev/prod 에 따라 true / false 로 받게 했다.
    });
    cookie.save('profile_img_path', profile_img_path, {
      path: '/'
      // , expires
      // , httpOnly: HTTP_ONLY // dev/prod 에 따라 true / false 로 받게 했다.
    });
  }, [nickname, profile_img_path]);

  return (
    <>
      <Head>
        <title>TIDE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div>
        <MusicBar />
      </div> */}
      <main
        className={`
      p-[4rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="flex flex-col text-white">
          <div className="pb-2 mb-1 text-4xl font-bold text-center">
            Top Artists
          </div>
          <div className="md:w-[45%] w-[200px] md:h-[400px] h-[200px] m-auto relative group flex flex-row justify-center ">
            {/* carousel wrapper */}
            <Link
              style={{
                backgroundImage: `url(${slides[currentIndex]?.artistImgPath})`
              }}
              className="md:w-[600px] md:h-[400px] w-[300px] h-[200px] duration-100 bg-center bg-no-repeat bg-cover rounded-lg opacity-75 drop-shadow-2xl"
              href={`/artist/${slides[currentIndex]?.id}`}>
              <div className="flex flex-row h-[60px] bg-gray-800 md:mt-[340px] mt-[140px] opacity-80 items-center">
                <p className="ml-3 text-xl font-bold md:text-4xl">
                  {slides[currentIndex]?.artistName}
                </p>
              </div>
            </Link>

            {/* Left Arrow */}
            <div className="md:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] md:left-4 left-[-70px] text-2xl rounded-full p-2 bg-slate-700 md:bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={40} />
            </div>
            {/* Right Arrow */}
            <div className="md:hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] md:right-4 right-[-70px] text-2xl rounded-full p-2 bg-slate-700 md:bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={40} />
            </div>
          </div>

          {/* playlists */}
          <div className="flex flex-col mt-4 text-white">
            <h2 className="mb-1 text-2xl font-semibold">Featured Playlists</h2>
            {/* 여기 아래 플레이리스트 뿌려주기 */}
            <div className=" h-[120px] md:w-[100%] md:h-[200px] flex flex-row  items-center gap-x-5 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-500 scrollbar-track-black">
              {playlists.map((pl, id) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={id}>
                  <div
                    className="p-2 flex flex-row justify-center items-center mt-1 text-md rounded-lg drop-shadow-2xl w-[100px] h-[80px]  md:w-[160px] md:h-[120px] border-2 hover:cursor-pointer hover:bg-blue-600"
                    onClick={() => gotoTopPlaylist(pl.id)}>
                    {pl.playlistTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오늘의 일기들 인기순 */}
          <div className={`mt-8`}>
            <div className={`flex justify-between `}>
              <h2 className="mb-4 text-2xl font-semibold">Daily Hot Diary</h2>

              <Link href={`/diary-public`}>
                <button
                  className={`border-2 py-2 my-2 pl-2 pr-2 rounded-xl bg-slate-700 hover:bg-blue-400 md:animate-bounce`}>
                  {' '}
                  모든 일기
                </button>
              </Link>
            </div>

            <div
              className={`md:flex overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-500 scrollbar-track-black border-t-2 border-b-2 pt-2 pb-2 md:max-h-[630px] max-h-[550px]`}>
              {diarylist
                .sort(() => 0.5 - Math.random())
                .slice(0, 6)
                .map((dl, id) => (
                  <Link href={`/diary/${dl.id}`}>
                    <div
                      className={`min-h-[300px] grid grid-cols-1 hover:bg-gradient-to-bl my-4 md:mx-2 bg-blue-900 hover:from-blue-500 hover:to-slate-800 md:min-w-[300px] mr-1`}
                      key={id}>
                      <div
                        className={`border rounded-lg p-5 md:min-h-[400px] max-h-[400px] overflow-hidden scrollbar-hide `}>
                        <h3 className="text-2xl font-bold w-[250px] truncate">
                          {' '}
                          {dl.title}
                        </h3>
                        <p className="my-2 text-sm font-semibold">
                          {dl.nickname}
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {dl.createDt}
                        </p>
                        <hr className="my-2" />
                        <div>{parse(dl.content)}</div>
                      </div>
                      {/* <div
                        className={`border rounded-lg p-5 max-h-[300px] h-[220px] md:h-[300px] overflow-hidden justify-center grid text-center`}>
                        <img
                        src={dl.}
                        className={`bg-no-repeat bg-cover animate-[spin_5s_linear_infinite] pause hover:running ${styles.cdBG}`}></img>
                        <h3 className="text-2xl font-bold"> 음악 제목</h3>
                        <p> 아티스트 이름</p>
                      </div> */}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Mainpage;
