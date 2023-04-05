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

interface playlists {
  id: number;
  title: string;
  image: string;
}

interface diarylist {
  id: number;
  title: string;
  image: string;
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

  const [playlists, setPlaylists] = useState<playlists[]>([]);
  const [diarylist, setDiarylist] = useState<diarylist[]>([]);

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

  const topArtists = useAppSelector(state => {
    return state.likeTopSix.topArtist;
  });

  useEffect(() => {
    dispatch(likeTopSixAsync());
  }, []);
  console.log(topArtists, 'test');

  // 더미 플레이리스트
  useEffect(() => {
    // 내 프로필정보 요청
    dispatch(profileAsync());
    setPlaylists([
      {
        id: 1,
        title: 'hi',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 2,
        title: 'hello',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 3,
        title: '커즈아이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 4,
        title: '롸익보이이이이이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 5,
        title: '롸익보이이이이이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 6,
        title: '롸익보이이이이이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      }
    ]);

    setDiarylist([
      {
        id: 1,
        title: '핑크빈의 일기',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 2,
        title: 'hello',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 3,
        title: '배고프다마',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 4,
        title: '사람이라면 인간적으로 밥드셔야죠 밥밥밥밥밥밥밥밥밥',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 5,
        title: '롸익보이이이이이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      },
      {
        id: 6,
        title: '롸익보이이이이이',
        image: `https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`
      }
    ]);
  }, []);

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
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <div>
        <MusicBar />
      </div> */}
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="flex flex-col text-white">
          <div className="py-3 my-1 text-3xl font-bold text-center">
            Trending
          </div>
          <div className="md:w-[60%] w-[200px] md:h-[400px] h-[200px] m-auto relative group flex flex-row justify-center">
            {/* carousel wrapper */}
            <Link
              style={{backgroundImage: `url(${slides[currentIndex].url})`}}
              className="w-full h-full duration-500 bg-center bg-no-repeat bg-cover rounded-lg opacity-75 drop-shadow-2xl"
              href={`/artist/${slides[currentIndex].id}`}>
              <div className="flex flex-row h-[60px] bg-gray-800 md:mt-[340px] mt-[140px] opacity-80 items-center">
                <p className="ml-3 text-xl font-bold md:text-4xl">
                  {slides[currentIndex].name}
                </p>
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
          <div className="flex flex-col mt-6 text-white">
            <h2 className="mb-4 text-2xl font-semibold">Featured Playlists</h2>
            {/* 여기 아래 플레이리스트 뿌려주기 */}
            <div className=" w-[100%] h-[250px] flex flex-row items-center gap-x-5 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-500 scrollbar-track-black">
              {playlists.map((pl, id) => (
                <div className="flex flex-col items-center" key={id}>
                  <img
                    className="w-48 h-48 rounded-lg drop-shadow-2xl min-w-[12rem]"
                    src={pl.image}
                    alt="Playlist 1"
                  />
                  <p className="mt-2 text-xl drop-shadow-2xl">{pl.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 오늘의 일기들 인기순 */}
          <div className={`mt-5`}>
            <div className={`flex  items-center justify-between`}>
              <h2 className="mb-4 text-2xl font-semibold">Daily hot Diary</h2>

              <Link href={`/diary-public`}>
                <button
                  className={`border pl-2 pr-2 rounded-xl bg-slate-700 hover:bg-blue-400 duration-300`}>
                  {' '}
                  모든 일기 보러가기
                </button>
              </Link>
            </div>

            <div
              className={`md:flex overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-500 scrollbar-track-black border-t-2 border-b-2 pt-2 pb-2 md:max-h-[630px] max-h-[550px]`}>
              {diarylist.map((dl, id) => (
                <Link href={`/diary/${id}`}>
                  <div
                    className={`grid grid-cols-1 hover:bg-gradient-to-bl bg-blue-900 hover:from-blue-500 hover:to-slate-800 md:min-w-[300px]`}
                    key={id}>
                    <div
                      className={`border rounded-lg p-5 max-h-[300px] overflow-hidden scrollbar-hide `}>
                      <h3 className="text-2xl font-bold">
                        {' '}
                        {id + 1} : {dl.title}
                      </h3>
                      <p> 2023.03.31</p>
                      <br />
                      <p>
                        {' '}
                        일기 내용 Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit. Excepturi numquam odio quam animi a
                        fuga, illo atque qui quia libero delectus fugiat
                        temporibus consequatur nam provident facilis cumque
                        nobis distinctio debitis tempora praesentium? Minus vero
                        ipsum optio nisi quaerat, laboriosam itaque illo ullam
                        magni dolor recusandae obcaecati ducimus ex porro
                        blanditiis accusantium tenetur cum suscipit? Assumenda
                        rerum placeat sunt cum totam, quia eveniet obcaecati
                        dicta ipsa iure, aspernatur molestias blanditiis et
                        pariatur tempora id voluptatum nihil, sapiente cumque
                        qui at non nulla. Repudiandae sit iste numquam alias
                        natus ducimus veniam officia iure ratione, reprehenderit
                        earum eaque laboriosam nihil rerum quibusdam. Dolores
                        delectus facilis aut unde amet! Sint aliquid iure quam
                        voluptatum dolor pariatur, aspernatur facilis ipsum
                        laborum aut tenetur officia, ut doloremque odio nihil
                        maxime minima eos vel iste, a nesciunt excepturi
                        voluptate molestias. Maxime delectus obcaecati
                        accusantium. Optio placeat beatae omnis quisquam minus
                        molestiae autem, voluptate cumque consectetur saepe
                        temporibus amet commodi voluptas suscipit. Suscipit
                        corporis, deleniti voluptatem sed commodi, fugiat illo
                        facilis veniam perferendis amet cum unde placeat,
                        recusandae distinctio tenetur error quaerat
                        exercitationem quos earum quod est iure. Neque debitis,
                        quos porro nisi, veniam obcaecati ipsum dicta corrupti
                        maiores dolorum consequuntur nam sunt perferendis modi
                        iste placeat quaerat voluptate sint. Officia dolorem
                        autem laborum similique amet, pariatur ab. Est nam sit
                        nihil aperiam quasi non, voluptate molestias impedit.
                        Odit hic reprehenderit soluta, ex molestias accusantium
                        quasi nostrum perferendis inventore assumenda,
                        aspernatur blanditiis officiis ipsum animi. Corporis
                        voluptatibus doloremque nisi dolores, inventore quod ex
                        tempore maiores non, deserunt suscipit, perspiciatis
                        veritatis? Ad aliquam quo molestiae exercitationem
                        atque, quos pariatur repellendus aut numquam aliquid,
                        rem facere explicabo earum tenetur necessitatibus
                        quisquam esse doloribus. Unde labore laudantium, tenetur
                        quam placeat quidem, nesciunt repudiandae consectetur
                        amet laboriosam esse ut ipsa id quasi delectus quae! Ab,
                        esse a? Sint error ad fugiat!
                      </p>
                    </div>
                    <div
                      className={`border rounded-lg p-5 max-h-[300px] h-[220px] md:h-[300px] overflow-hidden justify-center grid text-center`}>
                      <img
                        src={dl.image}
                        className={`bg-no-repeat bg-cover animate-[spin_5s_linear_infinite] pause hover:running ${styles.cdBG}`}></img>
                      <h3 className="text-2xl font-bold"> 음악 제목</h3>
                      <p> 아티스트 이름</p>
                    </div>
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
