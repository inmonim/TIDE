import type {FC} from 'react';
import {useState} from 'react';
import RightBar from './RightBar';
import Link from 'next/link';
import Image from 'next/image';
import Lp from 'public/icons/lp.png';
import styles from '@/styles/MusicBar.module.scss';
import {deleteCookie} from 'cookies-next';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from 'store';
import {musicsearchAsync} from 'store/api/features/musicsearchSlice';
import {alramOff} from 'store/api/features/alramSlice';

export type SideBarProps = {
  isPlaying: boolean;
};

const SideBar: FC<SideBarProps> = props => {
  const router = useRouter();
  const {isPlaying} = props;
  const [RmenuOpen, setRmenuOpen] = useState<boolean>(false);
  const [BarOpen, setBarOpen] = useState<Number>(0);
  const [title, setTitle] = useState<string>('');
  
  const dispatch = useAppDispatch();

  const {value} = useAppSelector(state => {
    return state.alramStatus;
  });

  const musicsearch = dispatch(musicsearchAsync(title));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(musicsearchAsync(title));
    router.push(`/music/search`);
  };

  const onLogOut = () => {
    deleteCookie('accessToken');
    deleteCookie('nickname');
    deleteCookie('email');
    deleteCookie('profile_img_path');
    router.reload();
  };
  return (
    <>
      {/* 상단바 영역 */}
      {router.asPath.includes('/message') ? null : (
        <div className={`${styles.topBgDiv} fixed`}>
          {/* 검색창 영역 */}
          <div className={styles.searchBox}>
            <form onSubmit={handleSearchSubmit}>
              <button type="submit"></button>
              <input
                value={title}
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
              />
            </form>
          </div>
          {/* 로고 영역 */}
          <div className={`${styles.logoDiv} flex justify-center`}>
            <Link href="/mainpage">
              <div className={`w-24 h-8`}></div>
            </Link>
          </div>
          {/* 알림, 친구 */}
          <div
            className={`flex flex-row items-center gap-x-5 right-0 mr-[-20px] ${styles.rightIconDiv}`}>
            <div
              className={`cursor-pointer w-7 h-7 min-w-7 min-h-7 ${styles.alarmBtn} ${value && `drop-shadow-[0_0_5px_#8da0ff] animate-[ring_3s_infinite]`}`}
              onClick={() => (BarOpen === 1 ? setBarOpen(0) : setBarOpen(1))}>
              {' '}
            </div>
            <div
              className={`cursor-pointer w-7 h-7  min-w-7 min-h-7 ${styles.friendBtn}`}
              onClick={() => (BarOpen === 2 ? setBarOpen(0) : setBarOpen(2))}>
              {' '}
            </div>
            <div
              className={`cursor-pointer w-7 h-7 min-w-7 min-h-7 bg-[url('../../public/buttons/Logout.png')] bg-cover bg-no-repeat ${styles.Btn}`}
              onClick={onLogOut}></div>
          </div>
        </div>
      )}

      {/* 알림, 친구 */}
      <div
        className={`flex flex-row items-center gap-x-5 fixed z-20 right-0 mr-[0px] bottom-[2.2rem] ${styles.rightIconDiv}`}>
        <div
          className={`cursor-pointer w-7 h-7 min-w-7 min-h-7 ${styles.alarmBtn} ${value && `drop-shadow-[0_0_5px_#8da0ff] animate-[ring_3s_infinite]`}`}
          onClick={() => {
            dispatch(alramOff());
            (BarOpen === 1 ? setBarOpen(0) : setBarOpen(1))}}>
          {' '}
        </div>
        <div
          className={`cursor-pointer w-7 h-7  min-w-7 min-h-7 ${styles.friendBtn}`}
          onClick={() => (BarOpen === 2 ? setBarOpen(0) : setBarOpen(2))}>
          {' '}
        </div>
        <div
          className={`cursor-pointer w-7 h-7 min-w-7 min-h-7 bg-[url('../../public/buttons/Logout.png')] bg-cover bg-no-repeat ${styles.Btn}`}
          onClick={onLogOut}></div>
      </div>

      {/* 하단 메뉴바 영역 */}
      <div
        className={` ${
          styles.recordMenuDiv
        }   border-slate-700 border-2 w-[100px] h-[100px] fixed left-[calc(50%-50px)] bottom-[calc(40px+0.5vw)] bg-[#170207] rounded-[50%] z-[9] flex justify-center  ${
          RmenuOpen ? 'z-[10]' : 'w-0 h-0'
        }`}
        onClick={() => setRmenuOpen(!RmenuOpen)}>
        <div
          className={
            RmenuOpen
              ? ` border-slate-700 border-2 w-[256px] h-[256px] bg-[#151515e7] rounded-[50%] absolute bottom-[-75px] translate-x-[0px] translate-y-[0px] rotate-[270deg] transition-all duration-500 `
              : `w-[0px] h-[0px] absolute `
          }>
          <Link href="/profile">
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

          <Link href="/message ">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn}  no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Messege.png')] z-10 bg-no-repeat bg-contain translate-x-[190px] translate-y-[150px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>

          <Link href="/playlist">
            <div
              className={
                RmenuOpen
                  ? `${styles.Btn} no-underline outline-none  text-[#eeeeee] h-[30px] absolute text-center w-[30px] bg-[url('../../public/buttons/Playlist.png')] z-10 bg-no-repeat bg-contain translate-x-[140px] translate-y-[195px] rotate-90 `
                  : `w-[0] h-[0] absolute`
              }></div>
          </Link>
        </div>
        <div
          className={`w-[39px] h-[39px] absolute left-[30%] bottom-[30%] bg-[#eb456d] rounded-[50%] z-[9]`}></div>
        <Image
          src={Lp}
          alt="Lp"
          className={`w-[100%] h-[100%] animate-[spin_5s_linear_infinite] ${
            isPlaying ? `running` : `pause`
          }`}
        />
      </div>

      {/* 사이드바 영역 */}
      <div className={` ${styles.sideBgDiv}`}>
        {/* 로고 영역 */}
        <Link href="/mainpage">
          <div className={styles.logoDiv}> </div>
        </Link>
        {/* 검색창 영역 */}
        <div className={`${styles.searchBox} `}>
          <form onSubmit={handleSearchSubmit}>
            <button type="submit"></button>
            <input
              type="text"
              placeholder="Search"
              value={title}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        {/* 메뉴버튼 영역 */}
        <div className={`grid gap-y-10 mt-10`}>
          <Link href="/profile">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.profileIcon}></div>
              <div className="flex flex-row justify-center w-full text-[16px]">
                {' '}
                <p> 프로필 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/diary">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.diaryIcon}></div>
              <div className="flex flex-row justify-center w-full text-[16px]">
                {' '}
                <p> 개인 노트 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/playlist">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.playlistIcon}></div>
              <div className="flex flex-row justify-center w-full text-[16px]">
                {' '}
                <p> 플레이리스트 </p>{' '}
              </div>
            </div>
          </Link>

          <Link href="/message">
            <div
              className={`flex flex-row gap-x-4 justify-between  w-3/4 m-auto ${styles.MenuDiv}`}>
              <div className={styles.messageIcon}></div>
              <div className="flex flex-row justify-center w-full text-[16px]">
                {' '}
                <p> 메세지 </p>{' '}
              </div>
            </div>
          </Link>
        </div>
      </div>
      {BarOpen !== 0 ? <RightBar barType={BarOpen} /> : <></>}
    </>
  );
};
export default SideBar;
