import type {FC} from 'react';
import Link from 'next/link';
import styles from '@/styles/MusicBar.module.scss';

export type SideBarProps = {};

const SideBar: FC<SideBarProps> = props => {
  return(
    <>

    <div className={`${styles.topBgDiv}`}> 
        {/* 검색창 영역 */}
        <div className={styles.searchBox}>
          <form action="." method="post">
            <button type="submit"></button>
            <input type="text" placeholder="Search"/>
          </form>
        </div>
        {/* 로고 영역 */}
        <div className={styles.logoDiv}> </div>

        {/* 알림, 친구 */}
        <div className={`flex flex-row items-center gap-x-7 ${styles.rightIconDiv}`}>
          <div className={`w-7 h-7 min-w-7 min-h-7 ${styles.alarmBtn}`}> </div>
          <div className={`w-7 h-7  min-w-7 min-h-7 ${styles.friendBtn}`}> </div>
        </div>
    </div>


    {/* 하단 메뉴바 영역 */}
  <div className="circle">
  <div className="ring">
    <Link href="" className="menuItem fa fa-home fa-2x"></Link>
    <Link href="" className="menuItem fa fa-comment fa-2x"></Link>
    <Link href="" className="menuItem fa fa-play fa-2x"></Link>
    <Link href="" className="menuItem fa fa-camera fa-2x"></Link>
    <Link href="" className="menuItem fa fa-music fa-2x"></Link>
    <Link href="" className="menuItem fa fa-user fa-2x"></Link>
    <Link href="" className="menuItem fa fa-trash-o fa-2x"></Link>
    <Link href="" className="menuItem fa fa-star fa-2x"></Link>
    </div>
    <Link href="#" className="center fa fa-th fa-2x"></Link>
  </div>




    <div className={` ${styles.sideBgDiv}`}> 
      {/* 로고 영역 */}
      <div className={styles.logoDiv}> </div>

      {/* 검색창 영역 */}
      <div className={styles.searchBox}>
        <form action="." method="post">
          <button type="submit"></button>
          <input type="text" placeholder="Search"/>
        </form>
      </div>

    {/* 메뉴버튼 영역 */}
    <div className={`grid gap-y-16 mt-16`}>
      <Link href="/">
        <div className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
          <div className={styles.profileIcon}></div>
          <div className='flex flex-row justify-center w-full text-sm'> <p> 프로필 </p> </div>
        </div>
      </Link>

      <Link href="/diary">
      <div className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
        <div className={styles.diaryIcon}></div>
        <div className='flex flex-row justify-center w-full text-sm'> <p> 개인 노트 </p> </div>
      </div>
      </Link>

      <Link href="/">
      <div className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
        <div className={styles.playlistIcon}></div>
        <div className='flex flex-row justify-center w-full text-sm'> <p> 플레이리스트 </p> </div>
      </div>
      </Link>

      <Link href="/">
      <div className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
        <div className={styles.messageIcon}></div>
        <div className='flex flex-row justify-center w-full text-sm'> <p> 메세지 </p> </div>
      </div>
      </Link>
      </div>

    </div>
    </>
  );
};
export default SideBar;