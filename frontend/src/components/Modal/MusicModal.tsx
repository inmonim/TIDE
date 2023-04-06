import {stat} from 'fs';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import {initContent, setContent} from 'store/api/features/diaryContentSlice';
import {
  recomMusicAsync,
  recominitStatus,
  setSong
} from 'store/api/features/recomMusicSlice';
import {
  musicsearchAsync,
  searchinitStatus
} from 'store/api/features/musicsearchSlice';
import {diaryMineAsync} from 'store/api/features/diaryMineSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js/auto';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import {Doughnut} from 'react-chartjs-2';
import {getvideoId} from 'store/api/features/nowmusicSlice';
import {musicAsync} from 'store/api/features/musicSlice';

export type MusicModalProps = {
  type: Number;
  getModalType: Function;
};

interface song {
  albumImgPath: string;
  albumTitle: string;
  artist: string[];
  songId: Number;
  title: string;
}

const MusicModal: FC<MusicModalProps> = props => {
  const {type, getModalType} = props;
  const dispatch = useAppDispatch();
  const {content} = useAppSelector(state => {
    return state.diaryContent;
  });

  useEffect(() => {
    if (type === 1) {
      dispatch(searchinitStatus());
    } else if (type === 2) {
      dispatch(recomMusicAsync({content: content}));
    }
  }, [type]);

  const {
    status,
    aModel2CategoryTop1One,
    bModel2CategoryTop1Two,
    cModel2CategoryTop2One,
    dModel2CategoryTop2Two,
    eModel1CategoryTop1,
    fModel1CategoryTop2,
    emotion0,
    emotion1,
    emotion2,
    emotion3,
    emotion4,
    emotion5,
    emotion6,
    emotion7,
    emotion8,
    emotion9,
    messageFirst,
    messageSecond
  } = useAppSelector(state => {
    return state.recomMusic;
  });

  const [song1, setsong1] = useState<song>();
  const [song2, setsong2] = useState<song>();
  const [song3, setsong3] = useState<song>();
  const [song4, setsong4] = useState<song>();
  const [song5, setsong5] = useState<song>();
  const [song6, setsong6] = useState<song>();
  const [fm1, setfm1] = useState<string>();
  const [fm2, setfm2] = useState<string>();

  const [e0, sete0] = useState<number>();
  const [e1, sete1] = useState<number>();
  const [e2, sete2] = useState<number>();
  const [e3, sete3] = useState<number>();
  const [e4, sete4] = useState<number>();
  const [e5, sete5] = useState<number>();
  const [e6, sete6] = useState<number>();
  const [e7, sete7] = useState<number>();
  const [e8, sete8] = useState<number>();
  const [e9, sete9] = useState<number>();

  useEffect(() => {
    // setrecStatus(status)
    if (status === 'completed') {
      setsong1(aModel2CategoryTop1One);
      setsong2(bModel2CategoryTop1Two);
      setsong3(cModel2CategoryTop2One);
      setsong4(dModel2CategoryTop2Two);
      setsong5(eModel1CategoryTop1);
      setsong6(fModel1CategoryTop2);
      setfm1(messageFirst);
      setfm2(messageSecond);
      sete0(emotion0);
      sete1(emotion1);
      sete2(emotion2);
      sete3(emotion3);
      sete4(emotion4);
      sete5(emotion5);
      sete6(emotion6);
      sete7(emotion7);
      sete8(emotion8);
      sete9(emotion9);
    }
    // console.log('get' ,status, songModel1CosineTop,songModel1T3Top,songModel2CosineTop,songModel2T3Top)
    // console.log('re',recStatus, song1,song2,song3,song4)
  }, [status]);

  const onSetSong = (song: song) => {
    dispatch(setSong(song));
    console.log(song.songId, '1122');
    dispatch(diaryMineAsync());
    getModalType(0);
  };

  const musicSearchRef = useRef<HTMLInputElement>(null);

  const {musicSearchResult} = useAppSelector(state => {
    return state.musicsearch;
  });

  const data = {
    backgroundColor: [
      'rgb(204,61,61)',
      'rgb(103,0,0)',
      'rgb(2,88,255)',
      'rgb(33,33,33)',
      'rgb(255,166,72)',
      'rgb(128,65,217)',
      'rgb(0,87,102)',
      'rgb(63,0,153)',
      'rgb(255,178,217)',
      'rgb(250,237,125)'
    ],
    labels: [
      '분노',
      '악의',
      '슬픔',
      '절망',
      '당황',
      '걱정',
      '컴플렉스',
      '상처',
      '사랑',
      '행복'
    ],
    datasets: [
      {
        label: '감정분석표',
        data: [
          e0 && e0 > 0 ? e0 : 0,
          e1 && e1 > 0 ? e1 : 0,
          e2 && e2 > 0 ? e2 : 0,
          e3 && e3 > 0 ? e3 : 0,
          e4 && e4 > 0 ? e4 : 0,
          e5 && e5 > 0 ? e5 : 0,
          e6 && e6 > 0 ? e6 : 0,
          e7 && e7 > 0 ? e7 : 0,
          e8 && e8 > 0 ? e8 : 0,
          e9 && e9 > 0 ? e9 : 0
        ],
        backgroundColor: [
          'rgb(204,61,61)',
          'rgb(103,0,0)',
          'rgb(2,88,255)',
          'rgb(33,33,33)',
          'rgb(255,166,72)',
          'rgb(128,65,217)',
          'rgb(0,87,102)',
          'rgb(63,0,153)',
          'rgb(255,178,217)',
          'rgb(250,237,125)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    // responsive:false,
    elements: {
      // responsive:false,
      // arc:{
      //   weight:0.5,
      //   borderWidth:3,
      // },
    },
    cutout: 60
  };

  const {musicId, musicTitle, musicUrl, artistName, albumImage} =
    useAppSelector((state: any) => state.music);

  // console.log(musicUrl, albumImage, musicTitle, artistName, '');

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

  useEffect(() => {
    if (musicUrl) {
      console.log('야호야호야호');
      playMusic();
    }
  }, [musicUrl]);

  return (
    <>
      {type === 0 ? null : type === 1 ? (
        // 음악 검색
        <div>
          <div
            className={`left-[2%] right-[2%] md:left-[22%] md:right-[22%] top-[20%] min-w-[200px] bg-slate-800 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23] bg-opacity-95`}>
            <div className={``}>
              <p className={`text-xl font-bold mb-3`}> 음악 검색</p>
              <input
                type="text"
                className={`w-full rounded-lg h-8 text-black p-2`}
                ref={musicSearchRef}></input>
              <button
                onClick={() =>
                  dispatch(
                    musicsearchAsync(String(musicSearchRef.current?.value))
                  )
                }
                className={` border bg-slate-600 pl-2 pr-2 rounded-xl absolute right-[2%] h-8 hover:bg-slate-400`}>
                {' '}
                검색{' '}
              </button>
            </div>

            <div className={`overflow-y-auto scrollbar-hide`}>
              {/* 추천1 */}
              {musicSearchResult
                ? musicSearchResult.map((music, songId) => (
                    <>
                      <div
                        className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] overflow-hidden `}>
                        <img src={music?.albumImgPath}></img>
                        <div>
                          <p className={`text-md md:text-lg whitespace-nowrap`}>
                            {' '}
                            {music?.title}
                          </p>
                          <p
                            className={`text-[10px] md:text-sm whitespace-nowrap`}>
                            {' '}
                            album.{music?.artist}{' '}
                          </p>

                          <div
                            className={`flex justify-start w-full gap-x-3 md:mt-0 mt-2`}>
                            <button
                              className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                              onClick={() => {
                                dispatch(musicAsync(music.songId));
                              }}>
                              {' '}
                              듣기{' '}
                            </button>
                            <button
                              onClick={() => {
                                music
                                  ? onSetSong({
                                      albumImgPath: music.albumImgPath,
                                      artist: music.artist,
                                      songId: music.songId,
                                      title: music.title,
                                      albumTitle: ''
                                    })
                                  : null;
                              }}
                              className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                              {' '}
                              선택{' '}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : (
        // 음악 추천
        <>
          <div
            className={`left-[2%] right-[2%] md:left-[22%] md:right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}>
            <p className={`text-xl font-bold mb-3`}>
              {' '}
              {type === 1 ? '전체 ' : '추천 '}음악 목록
            </p>

            {status === 'completed' ? (
              <div className={`overflow-y-auto scrollbar-hide`}>
                <div
                  className={` bg-slate-700  bg-oparcity-80 p-3 text-center`}>
                  <p className={`text-xl`}> {fm1} </p>
                  <p> {fm2} </p>
                </div>

                {/* 차트영역 */}
                <div
                  className={`pb-5  bg-slate-700 grid grid-cols-1 items-center`}>
                  <div
                    className={`max-h-[450px] items-center flex justify-center`}>
                    <Doughnut
                      data={data}
                      width={'10vw'}
                      height={'10vh'}
                      options={options}
                    />
                  </div>
                </div>

                {/* 추천1 */}
                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] overflow-hidden `}>
                  <img src={song1?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song1?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song1?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song1?.artist}
                    </p>

                    <div
                      className={`flex justify-start w-full gap-x-3 md:mt-0 mt-2`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          dispatch(musicAsync(song1?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song1 ? onSetSong(song1) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 추천2 */}

                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
                  <img src={song2?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song2?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song2?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song2?.artist}
                    </p>

                    <div className={`flex justify-start gap-x-3`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          console.log(song2?.songId, '추천2');
                          dispatch(musicAsync(song2?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song2 ? onSetSong(song2) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 추천3 */}
                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%]`}>
                  <img src={song3?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song3?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song3?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song3?.artist}
                    </p>

                    <div className={`flex justify-start gap-x-3`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          console.log(song3?.songId, '추천3');
                          dispatch(musicAsync(song3?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song3 ? onSetSong(song3) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 추천4 */}

                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
                  <img src={song4?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song4?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song4?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song4?.artist}
                    </p>

                    <div className={`flex justify-start gap-x-3`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          console.log(song4?.songId, '추천4');
                          dispatch(musicAsync(song4?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song4 ? onSetSong(song4) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 추천5 */}

                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
                  <img src={song5?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song5?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song5?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song5?.artist}
                    </p>

                    <div className={`flex justify-start gap-x-3`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          console.log(song5?.songId, '추천5');
                          dispatch(musicAsync(song5?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song5 ? onSetSong(song5) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 추천6 */}

                <div
                  className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
                  <img src={song6?.albumImgPath}></img>
                  <div>
                    <p className={`text-md md:text-lg whitespace-nowrap`}>
                      {' '}
                      {song6?.title}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      album.{song6?.albumTitle}{' '}
                    </p>
                    <p className={`text-[10px] md:text-sm whitespace-nowrap`}>
                      {' '}
                      {song6?.artist}
                    </p>

                    <div className={`flex justify-start gap-x-3`}>
                      <button
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}
                        onClick={() => {
                          console.log(song6?.songId, '추천6');
                          dispatch(musicAsync(song6?.songId));
                        }}>
                        {' '}
                        듣기{' '}
                      </button>
                      <button
                        onClick={() => (song6 ? onSetSong(song6) : null)}
                        className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}>
                        {' '}
                        선택{' '}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex justify-center w-full h-full`}>
                <p>텍스트 감정분석 후 음악 추천 중...</p>
                <div
                  className="ml-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default MusicModal;
