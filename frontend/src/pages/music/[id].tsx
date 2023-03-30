import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';

function Musicpage() {
  const router = useRouter();

  const MusicName = router.query.id;

  const MusicData = {
    // 임시 데이터
    musicTitle: '호랑 나비',
    artistName: '김흥국',
    artistImage:
      'https://cdnimg.melon.co.kr/cm/artistcrop/images/000/01/194/1194_500.jpg?4867e82abe04463f1dd41663eba70eb4/melon/resize/416/quality/80/optimize',
    albumName: 'Kim Heung Kook',
    albumImage:
      'https://cdnimg.melon.co.kr/cm/album/images/003/11/964/311964_500.jpg',
    releaseYear: '1989',
    musicUrl: 'avHH4syRR-A'
  };

  const gotomusicplayer = () => {
    router.push('/music/[id]/player', `/music/${MusicName}/player`);
  };

  return (
    <div>
      <Head>
        <title>Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="flex flex-row justify-center">
          <img
            className="w-[300px] h-[300px] rounded-lg border-2 md:w-[350px] md:h-[350px]"
            src={MusicData.albumImage}
            alt="album_image"
          />
          {/* 노래 제목, 출시일, 아티스트 이름 */}
          <div className="flex flex-col ml-10">
            <div className="flex flex-row items-center">
              <h1 className="text-[50px] font-bold">{MusicData.musicTitle}</h1>
              {/* 노래 플레이 버튼 */}
              <img
                className="ml-6 w-[70px] h-[70px] hover:cursor-pointer hover:opacity-80"
                onClick={gotomusicplayer}
                src="/buttons/playbutton.png"
                alt="playbutton"></img>
            </div>
            <p className="ml-2 text-2xl font-semibold">
              {MusicData.releaseYear}
            </p>
            <div className="flex flex-col items-center mr-28">
              <img
                className="w-[100px] h-[100px] mt-8 rounded-full border-2 md:w-[180px] md:h-[180px]"
                src={MusicData.artistImage}
                alt="artistImage"
              />
              <p className="flex flex-row my-2 text-xl font-semibold">
                {MusicData.artistName}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray" />
        <div className="bg-red-700">qeqeqeqqweqw</div>
      </main>
    </div>
  );
}

export default Musicpage;
