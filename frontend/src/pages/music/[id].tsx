import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect} from 'react';
import HeartButton from '@/components/Like/HeartButton';

function Musicpage() {
  const router = useRouter();

  const MusicId = router.query.id;

  const MusicData = {
    // 임시 데이터
    musicTitle: 'Hype Boy',
    artistName: 'New Jeans',
    artistid: '3114174',
    artistImage:
      'https://cdnimg.melon.co.kr/cm2/artistcrop/images/031/14/174/3114174_20230102131651_500.jpg?5ca391ef957f06aa173cfb18a6b4859f/melon/resize/416/quality/80/optimize',
    albumName: 'New Album',
    albumImage:
      'https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg',
    releaseYear: '2022',
    musicUrl: 'avHH4syRR-A'
  };

  useEffect(() => {
    console.log(MusicId);
  }, [MusicId]);

  const gotoartistpage = () => {
    router.push('/artist/[id]', `/artist/${MusicData.artistid}`);
  };

  return (
    <div>
      <Head>
        <title>Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-[91vh] bg-gradient-to-t from-slate-700 to-slate-900">
        <div
          className="w-[88%] h-[840px] ml-[12%]"
          style={{
            backgroundImage: `url(${MusicData.albumImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.25'
          }}></div>
        <div className="absolute flex flex-col justify-center left-[230px] w-[1690px] mt-12 text-white ">
          <div className="flex flex-row justify-center">
            <img
              className="w-[300px] h-[300px] rounded-full border-4 md:w-[350px] md:h-[350px] animate-[spin_10s_linear_infinite] pause hover:running"
              src={MusicData.albumImage}
              alt="album_image"
            />
            {/* 노래 제목, 출시일, 아티스트 이름 */}
            <div className="flex flex-col ml-10">
              <div className="flex flex-row items-center">
                <h1 className="text-[50px] font-bold">
                  {MusicData.musicTitle}
                </h1>
                {/* 노래 플레이 버튼 */}
                <div className="flex mt-4">
                  <img
                    className="w-[60px] h-[60px] hover:cursor-pointer hover:opacity-80 mx-8"
                    // onClick={gotoartistpage}
                    src="/buttons/playbutton.png"
                    alt="playbutton"></img>
                  <HeartButton />
                </div>
              </div>
              <p className="ml-2 text-2xl font-semibold">
                {MusicData.releaseYear}
              </p>
              <div className="flex flex-col items-center mr-32">
                <img
                  className="w-[100px] h-[100px] mt-8 rounded-full border-4 border-white md:w-[180px] md:h-[180px] hover:cursor-pointer hover:opacity-80"
                  src={MusicData.artistImage}
                  alt="artistImage"
                  onClick={gotoartistpage}
                />
                <p
                  className="flex flex-row my-2 text-xl font-semibold hover:cursor-pointer hover:opacity-80"
                  onClick={gotoartistpage}>
                  {MusicData.artistName}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[1500px]"></div>
          <hr className="my-1 border-1 border-gray" />
          <div className="flex flex-row py-2 justify-evenly">
            <div className="flex flex-col items-center text-2xl font-semibold w-[500px]">
              좋아하는 유저들
              {/* 이 노래를 좋아하는 유저들 */}
              <div className="flex justify-center w-full my-4 bg-red-600">
                1
              </div>
            </div>
            <div className="flex flex-col items-center text-2xl font-semibold w-[500px]">
              노래 가사
              <div className="flex justify-center w-full my-4 bg-green-600">
                2
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Musicpage;
