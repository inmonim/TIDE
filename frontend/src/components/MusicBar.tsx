import type {FC} from 'react';
import SideBar from './SideBar';
import styles from '@/styles/MusicBar.module.scss';

export type MusicBarProps = {};

const MusicBar: FC<MusicBarProps> = props => {

  return (
    <>
    <div className={`fixed bottom-0 z-10 w-screen md:mx-auto overflow-auto ${styles.navBgDiv}`}>
      <nav>
        <div className="px-4">
          <div className="flex justify-center">
            <div
              className={`flex flex-row items-center m-2 ${styles.navSection}`}>
              <div className="flex flex-row items-center gap-x-5">
                {/* 앨범 사진 */}
                <div className={`w-20 h-20 bg-white min-w-20 min-h-20 ${styles.albumImg}`}> </div>
                {/* 음악 정보 */}
                <div className={styles.musicDesc}>
                  <div>
                    <p className="font-mono text-xl"> Hype Boy</p>
                    <p className="font-mono text-l">  NewJeans</p>
                  </div>
                </div>
              </div>
              {/* 바 */}
              <div
                className={`flex flex-row items-center gap-x-5 ${styles.timeBar}`}
                >
                <p> 2:00</p>
                <div className="w-60">
                  <div className="absolute h-1 bg-sky-500"></div>
                  <div className="w-full h-1 bg-slate-700"></div>
                </div>
                <p> 3:00</p>
              </div>

              {/* 재생 버튼들 */}
              <div className={`flex flex-row gap-x-2 ${styles.playBar}`}>
                <div className={`w-7 h-7  ${styles.Back}`}></div>
                <div className={`w-7 h-7  ${styles.Play}`}></div>
                <div className={`w-7 h-7  ${styles.Fast}`}></div>
              </div>

              
              {/* 알림, 친구 */}
              <div className={`flex flex-row items-center gap-x-7 ${styles.rightIconDiv}`}>
                <div className={`w-7 h-7 min-w-7 min-h-7 ${styles.alarmBtn}`}> </div>
                <div className={`w-7 h-7  min-w-7 min-h-7 ${styles.friendBtn}`}> </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <SideBar/>
    </>
  );
};
export default MusicBar;
