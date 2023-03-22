import React, {FC, useEffect, useRef, useState} from 'react';
import SideBar from './SideBar';
import styles from '@/styles/MusicBar.module.scss';
import ReactPlayer from 'react-player';

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
  const playbarRef = useRef<HTMLDivElement>(null);
  const playMaybarRef = useRef<HTMLDivElement>(null);
  // 전체 음악 재생바
  const fullbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSrc('https://www.youtube.com/watch?v=11cta61wi0g');
    setPlaying(false);
    setInit(true);
  }, []);

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
        setPlaytime(
          (Number(fullplaytime) * e.nativeEvent.offsetX) /
            fullbarRef.current.offsetWidth
        );
      }
    }
  };

  // 플레이타임 바뀌면 즉각적용~!
  useEffect(() => {
    if (playbarRef.current)
      playbarRef.current.style.width = `${
        (Number(playtime) / Number(fullplaytime)) * 100
      }%`;
  }, [playtime]);

  // 음악 플레이 시간, 바 0.1초마다 갱신
  useEffect(() => {
    if (init) {
      const playSet = setInterval(() => {
        setPlaytime(parseInt(youtube.current.getCurrentTime()));
      }, 1000);
      return () => clearInterval(playSet);
    }
  }, [playing]);

  // 음악 플레이 바를 클릭한다면
  const musicState = (event: React.MouseEvent<HTMLDivElement>) => {
    setPlaying(prev => !prev);
    // setPlaytime(parseInt(youtube.current.getCurrentTime()));
  };

  // 최초 실행 시 fullplaytime 가져오기
  useEffect(() => {
    if (youtube.current && Number.isNaN(fullplaytime)) {
      const fullSet = setInterval(() => {
        setFullPlaytime(parseInt(youtube.current.getDuration()));
        if (playbarRef.current)
          playbarRef.current.style.width = `${
            (Number(playtime) / Number(fullplaytime)) * 100
          }%`;
      }, 400);
      return () => clearInterval(fullSet);
    }
  }, [init, fullplaytime]);

  return (
    <>
      <div
        className={`fixed bottom-0 z-10 w-screen md:mx-auto overflow-auto ${styles.navBgDiv}`}>
        <nav>
          <div className="px-4">
            <div className="flex justify-center">
              <div
                className={`flex flex-row items-center m-2 ${styles.navSection}`}>
                <div className="flex flex-row items-center gap-x-5">
                  {/* 앨범 사진 */}
                  <div
                    className={`w-20 h-20 bg-white min-w-20 min-h-20 ${styles.albumImg}`}>
                    {' '}
                  </div>
                  {/* 음악 정보 */}
                  <div className={styles.musicDesc}>
                    <div>
                      <p className="font-mono text-xl"> Hype Boy</p>
                      <p className="font-mono text-l"> NewJeans</p>
                    </div>
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
                    className="h-3 mb-[0px] select-all w-60 rounded-xl overflow-hidden"
                    onMouseMove={BarTimeOn}
                    onClick={BarTimeSelect}
                    // onMouseUp={BarTimeSelect}
                    onMouseLeave={BarReset}
                    ref={fullbarRef}>
                    <div className="w-[calc(100%)] h-3 select-all bg-slate-700 rounded-xl"></div>
                    <div
                      className={`z-10 w-0 h-3 translate-y-[-12px] select-all bg-sky-100 rounded-xl`}
                      ref={playMaybarRef}></div>
                    <div
                      className={`z-10 w-0 h-3 translate-y-[-24px] select-all bg-sky-500 rounded-xl`}
                      ref={playbarRef}></div>
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
                      loop={true}
                      url={src}
                      style={{display: 'none'}}
                    />
                  )}
                  <div
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
