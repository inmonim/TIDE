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
import defaultImg from 'public/images/Logo/whiteLogo.png';
import MusicEmotion from '@/components/MusicEmotion';
import {EmotionsItem} from '@/components/EmotionsItem';
import {userIdAsync} from 'store/api/features/userIdSlice';

function Musicpage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [MyPlaylistModal, setMyPlaylistModal] = useState<Number>(0);

  const getMyPlaylistModal = (type: Number) => {
    setMyPlaylistModal(type);
  };
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

  // console.log(MusicId, 'MusicId');

  const Emotions = EmotionsItem;
  // console.log(Emotions, 'Emotions');

  const {myplaylist} = useAppSelector(state => {
    return state.playListMine;
  });

  const {userId} = useAppSelector(state => {
    return state.userId;
  });

  useEffect(() => {
    dispatch(userIdAsync());
  }, []);

  console.log(userId, 'userId');

  useEffect(() => {
    dispatch(playListMineAsync());
  }, []);
  // console.log(myplaylist, 'myplaylist');

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
          getMyPlaylistModal={getMyPlaylistModal}
          type={MyPlaylistModal}
          isMe={true}
          list={myplaylist}
          songId={Number(Array.isArray(MusicId) ? MusicId[0] : MusicId)}
        />
      )}

      <main className="flex flex-col md:pt-0.5 md:ml-[12%] md:min-w-[80%] md:w-[88%] md:min-h-[90vh] md:bg-gradient-to-t from-slate-700 to-slate-900 w-[390px] pt-[60px] ">
        {albumImage ? (
          <div
            className="md:w-full md:h-[840px] w-[400px] h-[400px] md:bg-cover bg-center"
            style={{
              backgroundImage: `url(${albumImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '0.25'
            }}></div>
        ) : null}
        <div className="md:absolute absolute flex flex-col justify-center md:left-[230px] md:w-[1690px] md:mt-12 text-white ">
          <div className="flex flex-row justify-center">
            {albumImage ? (
              <img
                className="w-[100px] h-[100px] rounded-full border-4 md:w-[350px] md:h-[350px] animate-[spin_50s_linear_infinite] "
                src={albumImage}
                alt="album_image"
              />
            ) : null}

            {/* 노래 제목, 출시일, 아티스트 이름 */}
            <div className="flex flex-col ml-4 md:ml-10">
              <div className="flex flex-row items-center md:w-[800px] w-[300px]">
                <h1 className="md:w-[300px] md:text-[30px] font-bold w-[100px] text-sm">
                  {musicTitle}
                </h1>
                {/* 노래 플레이 버튼 */}
                <div className="flex mt-4">
                  <img
                    className="w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 md:mx-8 mx-4 md:w-[60px] md:h-[60px]"
                    onClick={playMusic}
                    src="/buttons/playbutton.png"
                    alt="playbutton"></img>
                  {MusicId && <HeartButton songId={MusicId} />}
                  <button
                    className="flex items-center p-1 mx-2 text-xs border-2 rounded-lg md:p-2 md:mx-6 md:text-xl"
                    onClick={openPlaylistModal}>
                    Playlist 추가
                  </button>
                </div>
              </div>
              <p className="text-sm md:font-semibold md:text-2xl">
                {releaseYear}
              </p>
              {/* 아티스트 이미지 섹션 */}
              <div className="flex flex-col items-center mr-32">
                {artistImage ? (
                  <img
                    className="w-[80px] h-[80px] mt-8 rounded-full border-4 border-white md:w-[180px] md:h-[180px] hover:cursor-pointer hover:opacity-80"
                    src={artistImage}
                    alt="artistImage"
                    onClick={gotoartistpage}
                  />
                ) : (
                  <Image src={defaultImg} alt="default-artist" />
                )}

                <p
                  className="flex flex-row my-2 text-xl font-semibold hover:cursor-pointer hover:opacity-80"
                  onClick={gotoartistpage}>
                  {artistName}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-[1200px] w-[600px]"></div>
          <hr className="my-2 border-1 border-gray" />
          <div className="flex flex-col items-center md:py-2 md:flex-row md:flex md:justify-evenly">
            {/* 이하 노래 감정 설문 */}
            <div className="flex flex-col items-center md:text-2xl font-semibold w-[500px] text-md">
              이 노래에는 어떤 감정이 느껴지나요?
              <div className="flex justify-center md:w-[500px] my-4 border-2 bg-slate-600 rounded-xl w-[300px]">
                <MusicEmotion emotions={Emotions} />
              </div>
            </div>
            <div className="flex flex-col items-center md:text-2xl font-semibold md:w-[500px] w-[200px] text-md">
              노래 가사
              <div className="flex justify-center md:w-full md:h-[340px] md:my-4 overflow-auto scrollbar-hide">
                <textarea
                  value={lyrics}
                  className="overflow-auto scrollbar-hide rounded-xl md:w-[500px] bg-slate-600 border-2 p-3"
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
