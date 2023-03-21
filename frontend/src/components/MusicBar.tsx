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

  useEffect(() => {
    setSrc('https://www.youtube.com/watch?v=11cta61wi0g');
    setPlaying(true);
    setInit(true);
  }, []);

  const musicState = (event: React.MouseEvent<HTMLDivElement>) => {
    setPlaying(prev => !prev);
    console.log(youtube.current.getCurrentTime());
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
                  <p> 0:00</p>
                  <div className="w-60">
                    <div className="absolute h-1 bg-sky-500"></div>
                    <div className="w-full h-1 bg-slate-700"></div>
                  </div>
                  <p> 3:00</p>
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
