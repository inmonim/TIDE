import React, {FC, useEffect, useRef, useState} from 'react';
import SideBar from './SideBar';
import styles from '@/styles/MusicBar.module.scss';
import ReactPlayer from 'react-player';
import {useAppSelector, useAppDispatch} from 'store';
import { changeNextSong, changePrevSong } from 'store/api/features/nowmusicSlice';

export type MusicBarProps = {};

const MusicBar: FC<MusicBarProps> = props => {
  const youtube = useRef<any>(null);
  const [src, setSrc] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);

  // 음악 플레이 시간
  const [playtime, setPlaytime] = useState<Number>(NaN);
  const [fullplaytime, setFullPlaytime] = useState<Number>(NaN);

  // 음악 재생바 현재
  const playbarRef = useRef<HTMLInputElement>(null);
  const playMaybarRef = useRef<HTMLDivElement>(null);
  // 전체 음악 재생바
  const fullbarRef = useRef<HTMLDivElement>(null);

  // 재생바 클릭상태
  const [onBarClick, setOnBarClick] = useState<boolean>(false);

  const musicplay = useAppSelector(state => state.nowmusic);

  useEffect(() => {

    if (musicplay.videoId) {
      setPlaying(true);
    }
    setSrc(`https://www.youtube.com/watch?v=${musicplay.videoId}`);

    setInit(true);
    
  }, [musicplay]);

  // 재생바에 마우스 올리면 거기까지 .... 시간과 바를 땡겨보여줌
  const BarTimeOn = (e: React.MouseEvent<HTMLElement>) => {
    if (playMaybarRef.current && fullbarRef.current)
      playMaybarRef.current.style.width = `${
        (Number(
          (Number(fullplaytime) * e.nativeEvent.offsetX) /
            fullbarRef.current.offsetWidth
        ) /
          Number(fullplaytime)) *
        100
      }%`;
  };

  // 재생바에서 마우스 떼면 흰바 리셋시키고
  const BarReset = (e: React.MouseEvent<HTMLElement>) => {
    if (playMaybarRef.current) playMaybarRef.current.style.width = `0%`;
  };

  // 재생바 클릭하면 해당 시간으로 타임 바꿔서
  const BarTimeSelect = (e: React.MouseEvent<HTMLElement>) => {
    if (fullbarRef.current) {
      youtube.current.seekTo(
        e.nativeEvent.offsetX / fullbarRef.current.offsetWidth
      );

      if (!Number.isNaN(fullplaytime)) {
        const pt =
          Number(fullplaytime) <
          (Number(fullplaytime) * e.nativeEvent.offsetX) /
            fullbarRef.current.offsetWidth
            ? fullplaytime
            : (Number(fullplaytime) * e.nativeEvent.offsetX) /
                fullbarRef.current.offsetWidth <
              0
            ? 0
            : (Number(fullplaytime) * e.nativeEvent.offsetX) /
              fullbarRef.current.offsetWidth;
        setPlaytime(pt);
      }
    }
  };

  // 플레이타임 바뀌면 바도 바로 변경
  // 단, 클릭 상태일때는 변경하지 않습니다
  useEffect(() => {
    if (playbarRef.current && !onBarClick) {
      playbarRef.current.value = `${
        (Number(playtime) / Number(fullplaytime)) * 100
      }`;
    }
  }, [playtime, onBarClick]);

  // 음악 플레이 시간, 바 0.1초마다 갱신
  useEffect(() => {
    if (init) {
      const playSet = setInterval(() => {
        setPlaytime(parseInt(youtube.current.getCurrentTime()));
      }, 100);
      return () => clearInterval(playSet);
    }
  }, [playing]);

  // 음악 플레이 바를 클릭한다면
  const musicState = (event: React.MouseEvent<HTMLDivElement>) => {
    setPlaying(prev => !prev);
  };


  // useEffect(() => {
  //   if (init && playMaybarRef.current) {
  //     playbarRef.current.value = 0
  //   }
  // }, [playing]);




  const dispatch = useAppDispatch();

  
  return (
    <>
      <div
        className={`fixed bottom-0 z-10 w-screen md:mx-auto overflow-auto ${styles.navBgDiv}`}>
        <nav>
          <div className="px-4 select-none">
            <div className="flex justify-center">
              <div
                className={`flex flex-row items-center m-2 ${styles.navSection}`}>
                <div className="flex flex-row items-center gap-x-5">
                  {/* 앨범 사진 */}
                  <div
                    className={`w-20 h-20 rounded-md bg-white min-w-20 min-h-20 ${styles.albumImg}`}>
                    {musicplay.albumImgPath ? (
                      <img
                        className="w-full h-full rounded-md"
                        src={musicplay.albumImgPath}
                        alt="NewJeans"
                      />
                    ) : (
                      <img
                        src="\favicon.ico"
                        alt="tide-logo"
                        className="p-1 rounded-md"
                      />
                    )}
                  </div>
                  {/* 음악 정보 */}
                  <div className={styles.musicDesc}>
                    {musicplay.title ? (
                      <div>
                        <p className="font-mono text-lg font-semibold">
                          {musicplay.title}
                        </p>
                        <p className="font-mono font-semibold text-md">
                          {musicplay.artist}
                        </p>
                      </div>
                    ) : (
                      <p className="font-mono text-sm font-semibold select-none">
                        재생할 음악을 선택해 주세요
                      </p>
                    )}
                  </div>
                </div>
                {/* 바 */}
                <div
                  className={`flex flex-row items-center gap-x-5 ${styles.timeBar}`}>
                  <p>
                    {Number.isNaN(playtime)
                      ? '0:00'
                      : `${Math.floor(Number(Number(playtime) / 60))}:${
                          Math.floor(Number(playtime) % 60) < 10
                            ? `0${Math.floor(Number(Number(playtime) % 60))}`
                            : Math.floor(Number(Number(playtime) % 60))
                        }`}
                  </p>

                  <div
                    className={`${styles.playBar}`}
                    onClick={BarTimeSelect}
                    ref={fullbarRef}>
                    <input
                      type="range"
                      className={` w-[200px] transparent h-3 cursor-pointer appearance-none rounded-lg border-transparent bg-slate-700 `}
                      onMouseDown={() => setOnBarClick(true)}
                      onMouseUp={() => setOnBarClick(false)}
                      ref={playbarRef}
                      min="0"
                      max="100"
                    />
                  </div>
                  <p>
                    {Number.isNaN(fullplaytime)
                      ? '0:00'
                      : `${Math.floor(Number(Number(fullplaytime) / 60))}:${
                          Math.floor(Number(fullplaytime) % 60) < 10
                            ? `0${Math.floor(
                                Number(Number(fullplaytime) % 60)
                              )}`
                            : Math.floor(Number(Number(fullplaytime) % 60))
                        }`}
                  </p>
                </div>

                {/* 재생 버튼들 */}
                <div className={`flex flex-row gap-x-2 ${styles.playBar}`}>
                  {init && (
                    <ReactPlayer
                      ref={youtube}
                      playing={playing}
                      loop={musicplay.plType===0?true:false}
                      url={src}
                      onReady={()=>{setFullPlaytime(parseInt(youtube.current.getDuration()))}}
                      onEnded={()=> 
                        {
                          dispatch(changeNextSong())
                        }}
                      style={{display: 'none'}}
                    />
                  )}
                  <div
                    onClick={()=> dispatch(changePrevSong())}
                    className={`w-7 h-7 cursor-pointer ${styles.Back}`}></div>
                  {playing ? (
                    <div
                      onClick={musicState}
                      className={`w-7 h-7 cursor-pointer ${styles.Pause}`}></div>
                  ) : (
                    <div
                      onClick={musicState}
                      className={`w-7 h-7 cursor-pointer ${styles.Play}`}></div>
                  )}
                  <div
                    onClick={()=> dispatch(changeNextSong())}
                    className={`w-7 h-7 cursor-pointer ${styles.Fast}`}></div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <SideBar isPlaying={playing} />
    </>
  );
};
export default MusicBar;
