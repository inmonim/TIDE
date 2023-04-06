import Head from 'next/head';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import HeartButton from '@/components/Like/HeartButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
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

  useEffect(() => {
    dispatch(playListMineAsync());
  }, []);

  useEffect(() => {
    if (MusicId) {
      dispatch(musicAsync(MusicId));
    }
  }, [MusicId]);

  const playMusic = () => {
    dispatch(
      getvideoId({
        videoId: musicUrl,
        albumImgPath: albumImage,
        title: musicTitle,
        artist: artistName
      })
    );
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
      {albumImage ? (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-center"
          style={{
            backgroundImage: `url(${albumImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.25'
          }}></div>
      ) : null}
      <main className="flex flex-col md:pb-[9rem] md:pt-0.5 md:w-screen md:min-h-screen md:bg-gradient-to-t md:from-slate-700 md:to-slate-900 bg-transparent min-w-screen min-h-screen w-screen h-screen pt-[45px] ">
        <div className="md:absolute absolute flex flex-col justify-center md:left-[230px] md:w-[1690px] md:mt-12 text-white ">
          <ArrowBackRoundedIcon
            className="ml-4 md:hidden hover:text-blue-300"
            fontSize="medium"
            onClick={() => router.back()}
          />
          <div className="flex flex-row justify-center items-center min-h-[22vh]">
            {/* 노래 제목, 출시일, 아티스트 이름 */}
            <div className="flex flex-col ml-4 md:ml-10">
              <div className="flex w-[90vw] items-center justify-center md:w-full ">
                {albumImage ? (
                  <img
                    className="w-[38vw] h-fit rounded-full border-4 md:w-[350px] md:h-[350px] animate-[spin_50s_linear_infinite] cursor-pointer hover:opacity-80"
                    src={albumImage}
                    alt="album_image"
                    onClick={gotoartistpage}
                  />
                ) : null}
                <div className="flex flex-col md:flex md:flex-row justify-center items-start md:items-center md:w-[800px] w-3/5">
                  <div className="mx-2 md:h-40 md:flex md:flex-col md:justify-start">
                    <h1 className="md:w-[300px] md:text-[30px] font-bold w-full text-lg break-words">
                      {musicTitle}
                    </h1>
                    <p
                      className="flex flex-row text-lg hover:cursor-pointer hover:opacity-80 md:hidden"
                      onClick={gotoartistpage}>
                      {artistName}
                    </p>
                    <p className="w-full text-sm md:font-semibold md:text-2xl">
                      {releaseYear}
                    </p>
                  </div>
                  {/* 노래 플레이 버튼 */}
                  <div className="flex w-full mt-4 md:mt-0 justify-evenly md:flex md:items-start md:h-40">
                    <img
                      className="w-7 h-7 hover:cursor-pointer hover:opacity-80 md:mx-8 md:w-[60px] md:h-[60px]"
                      onClick={playMusic}
                      src="/buttons/playbutton.png"
                      alt="playbutton"></img>
                    {MusicId && <HeartButton songId={MusicId} />}
                    <button
                      className="flex items-center px-3 py-1 text-sm border-2 rounded-lg md:p-2 md:mx-6 md:text-xl md:px-6"
                      onClick={openPlaylistModal}>
                      Playlist
                    </button>
                  </div>
                </div>
              </div>

              {/* 아티스트 이미지 섹션 */}
              {/* <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:mr-32"> */}
              <div className="hidden md:flex md:absolute md:left-[38%] md:top-[19.5%] md:flex-row md:items-center md:justify-center md:mr-32">
                {artistImage ? (
                  <img
                    className="w-32 h-32 rounded-full border-4 border-white md:w-[180px] md:h-[180px] hover:cursor-pointer hover:opacity-80"
                    src={artistImage}
                    alt="artistImage"
                    onClick={gotoartistpage}
                  />
                ) : (
                  <Image src={defaultImg} alt="default-artist" />
                )}

                <div
                  className="flex items-center h-full my-2 text-2xl font-semibold hover:cursor-pointer hover:opacity-80"
                  onClick={gotoartistpage}>
                  {artistName}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[1200px] w-screen"></div>
          <hr className="my-2 border-1 border-gray" />
          <div className="flex flex-col justify-evenly items-center w-full md:py-2 md:flex-row md:flex md:justify-center min-h-[50vh]">
            {/* 이하 노래 감정 설문 */}
            <div className="flex flex-col items-center w-[90vw] md:w-[30vw] md:h-[35vh] font-semibold md:text-2xl text-base">
              이 노래에는 어떤 감정이 느껴지나요?
              <div className="flex justify-center md:w-[500px] my-2 md:h-full border-[0.1rem] md:border-2 bg-black bg-opacity-50 md:bg-slate-600 rounded-xl w-3/4">
                <MusicEmotion
                  songId={MusicId}
                  emotions={Emotions}
                  userId={userId}
                />
              </div>
            </div>
            <div className="flex flex-col items-center w-[90vw] md:text-2xl font-semibold md:w-[500px] md:h-[35vh] text-base">
              {musicTitle}
              <div className="flex justify-center w-full md:w-full md:h-[340px] md:my-2 overflow-auto scrollbar-hide">
                <textarea
                  value={lyrics}
                  className="overflow-auto w-full h-[25vh] md:h-full font-normal rounded-xl md:w-[500px] border-[0.1rem] bg-black bg-opacity-50 md:bg-slate-600 md:border-2 p-3"
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
