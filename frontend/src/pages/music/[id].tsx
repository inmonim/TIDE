import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import HeartButton from '@/components/Like/HeartButton';
import {useAppSelector, useAppDispatch} from 'store';
import {musicAsync} from 'store/api/features/musicSlice';
import {getvideoId} from 'store/api/features/nowmusicSlice';
import {playListSongAddAsync} from 'store/api/features/playListSongAddSlice';
import MyPlaylist from '@/components/Modal/MyPlaylist';
import {playListMineAsync} from 'store/api/features/playListMineSlice';

function Musicpage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [MyPlaylistModal, setMyPlaylistModal] = useState<Number>(0);

  const MusicId = router.query.id;

  const {
    musicId,
    musicTitle,
    musicUrl,
    artistId,
    artistName,
    artistImage,
    albumImage,
    albumName,
    albumId,
    releaseYear,
    status,
    error,
    lyrics
  } = useAppSelector((state: any) => state.music);

  console.log(musicUrl, 'MusicId');

  const {myplaylist} = useAppSelector(state => {
    return state.playListMine;
  });

  useEffect(() => {
    dispatch(playListMineAsync());
  }, []);
  console.log(myplaylist, 'myplaylist');

  useEffect(() => {
    if (MusicId) {
      dispatch(musicAsync(MusicId));
    }
  }, [MusicId]);

  const playMusic = () => {
    dispatch(getvideoId({musicUrl, albumImage, musicTitle, artistName}));
  };

  const handlePlaylistAdd = () => {
    dispatch(playListSongAddAsync(musicUrl));
  };

  const openPlaylistModal = () => {
    setMyPlaylistModal(1);
  };

  const gotoartistpage = () => {
    router.push('/artist/[id]', `/artist/${artistId}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Head>
        <title>Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${
          MyPlaylistModal === 0
            ? 'w-0 h-0'
            : 'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'
        }`}
        onClick={() => {
          setMyPlaylistModal(0);
        }}></div>
      {MusicId && (
        <MyPlaylist
          type={MyPlaylistModal}
          isMe={true}
          list={myplaylist}
          songId={Number(Array.isArray(MusicId) ? MusicId[0] : MusicId)}
        />
      )}

      <main className="flex flex-col min-h-[91vh] bg-gradient-to-t from-slate-700 to-slate-900">
        {albumImage ? (
          <div
            className="w-[88%] h-[840px] ml-[12%]"
            style={{
              backgroundImage: `url(${albumImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '0.25'
            }}></div>
        ) : null}
        <div className="absolute flex flex-col justify-center left-[230px] w-[1690px] mt-12 text-white ">
          <div className="flex flex-row justify-center">
            {albumImage ? (
              <img
                className="w-[300px] h-[300px] rounded-full border-4 md:w-[350px] md:h-[350px] animate-[spin_10s_linear_infinite] pause hover:running"
                src={albumImage}
                alt="album_image"
              />
            ) : null}

            {/* 노래 제목, 출시일, 아티스트 이름 */}
            <div className="flex flex-col ml-10">
              <div className="flex flex-row items-center">
                <h1 className="text-[50px] font-bold">{musicTitle}</h1>
                {/* 노래 플레이 버튼 */}
                <div className="flex mt-4">
                  <img
                    className="w-[60px] h-[60px] hover:cursor-pointer hover:opacity-80 mx-8"
                    onClick={playMusic}
                    src="/buttons/playbutton.png"
                    alt="playbutton"></img>
                  <HeartButton songId={musicId} />
                  <div
                    className="flex items-center mx-4 text-2xl"
                    onClick={openPlaylistModal}>
                    Playlist 추가
                  </div>
                </div>
              </div>
              <p className="ml-2 text-2xl font-semibold">{releaseYear}</p>
              <div className="flex flex-col items-center mr-32">
                <img
                  className="w-[100px] h-[100px] mt-8 rounded-full border-4 border-white md:w-[180px] md:h-[180px] hover:cursor-pointer hover:opacity-80"
                  src={artistImage}
                  alt="artistImage"
                  onClick={gotoartistpage}
                />
                <p
                  className="flex flex-row my-2 text-xl font-semibold hover:cursor-pointer hover:opacity-80"
                  onClick={gotoartistpage}>
                  {artistName}
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
              <div className="flex justify-center w-full h-[340px] my-4 overflow-auto scrollbar-hide">
                <textarea
                  value={lyrics}
                  className="overflow-auto  scrollbar-hide rounded-xl w-[500px] bg-slate-600 p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Musicpage;
