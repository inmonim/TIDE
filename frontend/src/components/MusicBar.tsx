import React, {FC, useEffect, useRef, useState} from 'react';
import SideBar from './SideBar';
import styles from '@/styles/MusicBar.module.scss';
import ReactPlayer from 'react-player';

export type MusicBarProps = {};

const MusicBar: FC<MusicBarProps> = props => {
  const youtube = useRef<any>(null);
  const [src, setSrc] = useState<string>('');
  const [playing, setPlaying] = useState<boolean>(true);
  const [init, setInit] = useState<boolean>(false);

  // 음악 플레이 시간
  const [playtime, setPlaytime] = useState<Number>(0);
  const [fullplaytime, setFullPlaytime] = useState<Number>(0);

  // 음악 재생바 현재
  const playbarRef = useRef<HTMLDivElement>(null);
  // 전체 음악 재생바
  const fullbarRef = useRef<HTMLDivElement>(null);
  // const [clickTime, setClickTime] = useState<Number>(0);

  useEffect(() => {
    setSrc('https://www.youtube.com/watch?v=11cta61wi0g');
    setPlaying(false);
    setInit(true);
  }, []);

  // 음악 플레이 시간, 바 1초마다 갱신
  useEffect(() => {
    if (playing) {
      const playSet = setInterval(() => {
        setPlaytime(parseInt(youtube.current.getCurrentTime()));
        if (playbarRef.current)
          playbarRef.current.style.width = `${
            (Number(playtime) / Number(fullplaytime)) * 100
          }%`;
      }, 1000);
      return () => clearInterval(playSet);
    }
  }, [playing, playtime, fullplaytime]);

  // 음악 플레이 바를 클릭한다면

  const musicState = (event: React.MouseEvent<HTMLDivElement>) => {
    setPlaying(prev => !prev);
    setFullPlaytime(parseInt(youtube.current.getDuration()));
    setPlaytime(parseInt(youtube.current.getCurrentTime()));
  };

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
                  <p>{`${Math.floor(Number(Number(playtime) / 60))}:${
                    Math.floor(Number(playtime) % 60) < 10
                      ? `0${Math.floor(Number(Number(playtime) % 60))}`
                      : Math.floor(Number(Number(playtime) % 60))
                  }`}</p>
                  <div className="w-60">
                    <div
                      className="z-10 w-0 h-1 translate-y-1 bg-sky-500 rounded-xl"
                      ref={playbarRef}></div>
                    <div
                      className="w-full h-1 bg-slate-700 rounded-xl"
                      ref={fullbarRef}></div>
                  </div>
                  <p>{`${Math.floor(Number(Number(fullplaytime) / 60))}:${
                    Math.floor(Number(fullplaytime) % 60) < 10
                      ? `0${Math.floor(Number(Number(fullplaytime) % 60))}`
                      : Math.floor(Number(Number(fullplaytime) % 60))
                  }`}</p>
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
      <SideBar />
    </>
  );
};
export default MusicBar;
