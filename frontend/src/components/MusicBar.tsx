import type {FC} from 'react';
import React, {useState, useEffect, useRef} from 'react';
import styles from '@/styles/MusicBar.module.scss';

export type MusicBarProps = {};

const MusicBar: FC<MusicBarProps> = props => {
  // 반응형:: 윈도우 사이즈 CSR로 체크
  interface WindowSize {
    width: number | undefined;
    height: number | undefined;
  }
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  });

  // 재생바
  const musicBarDiv = useRef<HTMLDivElement>(null);
  // 오른쪽 메뉴
  // 나중에 선언해주소;

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    if (windowSize.width && windowSize.width <= 840) {
      // 이때 재생바, 오른쪽 메뉴 없애기
      console.log('헤이~');
      if (musicBarDiv.current) musicBarDiv.current.style.display = 'none';
    } else if (windowSize.width && windowSize.width <= 1265) {
      // 이때 오른쪽 메뉴만 없애기
      console.log('데얼~');
      if (musicBarDiv.current) musicBarDiv.current.style.display = 'block';
    } else {
      //재생바, 오른쪽 메뉴 둘다 보이기
      if (musicBarDiv.current) musicBarDiv.current.style.display = 'block';
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return (
    <div className="fixed bottom-0 z-10 w-screen bg-black md:mx-auto">
      <nav>
        <div className="px-4">
          <div className="flex justify-center">
            <div
              className={`flex flex-row items-center m-2 gap-x-16 ${styles.navSection}`}>
              <div className="flex flex-row items-center gap-x-5">
                {/* 앨범 사진 */}
                <div className="w-20 h-20 bg-white min-w-20 min-h-20"> </div>

                {/* 음악 정보 */}
                <div>
                  <p className="font-mono text-2xl"> Hype Boy </p>
                  <p className="font-mono text-xl"> NewJeans</p>
                </div>
              </div>
              {/* 바 */}
              <div
                className="flex flex-row items-center gap-x-5"
                ref={musicBarDiv}>
                <p> 2:00</p>
                <div className="w-60">
                  <div className="absolute h-1 bg-sky-500"></div>
                  <div className="w-full h-1 bg-slate-700"></div>
                </div>
                <p> 3:00</p>
              </div>

              {/* 재생 버튼들 */}
              <div className="flex flex-row gap-x-3">
                <div className={`w-8 h-8  ${styles.Back}`}></div>
                <div className={`w-8 h-8  ${styles.Play}`}></div>
                <div className={`w-8 h-8  ${styles.Fast}`}></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default MusicBar;
