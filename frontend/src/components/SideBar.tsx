import type {FC} from 'react';
import {useState} from 'react';
import Link from 'next/link';
import styles from '@/styles/MusicBar.module.scss';

export type SideBarProps = {};

const SideBar: FC<SideBarProps> = props => {
  const [RmenuOpen, setRmenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className={`${styles.topBgDiv} fixed`}>
        {/* 검색창 영역 */}
        <div className={styles.searchBox}>
          <form action="." method="post">
            <button type="submit"></button>
            <input className={''} type="text" placeholder="Search" />
          </form>
        </div>
        {/* 로고 영역 */}
        <div className={styles.logoDiv}> </div>

        {/* 알림, 친구 */}
        <div
          className={`flex flex-row items-center gap-x-7 ${styles.rightIconDiv}`}>
          <div className={`w-7 h-7 min-w-7 min-h-7 ${styles.alarmBtn}`}> </div>
          <div className={`w-7 h-7  min-w-7 min-h-7 ${styles.friendBtn}`}>
            {' '}
          </div>
        </div>
      </div>

      {/* 하단 메뉴바 영역 */}
      <div
        className={` ${
          styles.recordMenuDiv
        }  w-[40px] h-[40px] fixed left-[50%] bottom-[75px] bg-[#eb456d] rounded-[50%] z-[9] flex justify-center  ${
          RmenuOpen ? 'z-[10]' : 'w-0 h-0'
        }`}
        onClick={() => setRmenuOpen(!RmenuOpen)}>
        <div
          className={
            RmenuOpen
              ? ` border-slate-700 border-2 w-[256px] h-[256px] bg-[#151515e7] rounded-[50%] absolute bottom-[-105px] translate-x-[0px] translate-y-[0px] rotate-[270deg] transition-all duration-500 `
              : `w-[0px] h-[0px] absolute `
          }>
          <Link href="/">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn}  no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Profile.png')] z-10 bg-no-repeat bg-contain translate-x-[140px] translate-y-[30px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>

          <Link href="/diary">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn}  no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Diary.png')] z-10 bg-no-repeat bg-contain translate-x-[190px] translate-y-[70px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>

          <Link href="/">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn}  no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Messege.png')] z-10 bg-no-repeat bg-contain translate-x-[190px] translate-y-[150px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>

          <Link href="/">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn} no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Playlist.png')] z-10 bg-no-repeat bg-contain translate-x-[140px] translate-y-[195px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>
        </div>
        <div
          className={` ${styles.recordMenuDiv} w-[40px] h-[40px] absolute left-[0%] bottom-[0%] bg-[#eb456d] rounded-[50%] z-[9]`}></div>
      </div>

      {/* 사이드바 영역 */}
      <div className={` ${styles.sideBgDiv}`}>
        {/* 로고 영역 */}
        <div className={styles.logoDiv}> </div>

        {/* 검색창 영역 */}
        <div className={`${styles.searchBox} `}>
          <form action="." method="post">
            <button type="submit"></button>
            <input className={''} type="text" placeholder="Search" />
          </form>
        </div>

        {/* 메뉴버튼 영역 */}
        <div className={`grid gap-y-10 mt-16`}>
          <Link href="/">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.profileIcon}></div>
              <div className="flex flex-row justify-center w-full text-sm">
                {' '}
                <p> 프로필 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/diary">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.diaryIcon}></div>
              <div className="flex flex-row justify-center w-full text-sm">
                {' '}
                <p> 개인 노트 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.playlistIcon}></div>
              <div className="flex flex-row justify-center w-full text-sm">
                {' '}
                <p> 플레이리스트 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.messageIcon}></div>
              <div className="flex flex-row justify-center w-full text-sm">
                {' '}
                <p> 메세지 </p>{' '}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default SideBar;
