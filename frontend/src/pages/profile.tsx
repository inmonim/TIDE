import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import Image from 'next/image';
import defaultImg from 'public/images/Logo/whiteLogo.png';
import Link from 'next/link';
import FollowModal from '@/components/Modal/FollowModal';
import {useRouter} from 'next/router';
import Seo from 'src/components/Seo';
import {followerListAsync} from 'store/api/features/followerListSlice';
import {followListAsync} from 'store/api/features/followListSlice';
import {diaryMineAsync} from 'store/api/features/diaryMineSlice';
import { playListMineAsync } from 'store/api/features/playListMineSlice';

function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {nickname, profile_img_path, introduce} = useAppSelector(state => {
    return state.profile;
  });

  const gotoprofileEdit = () => {
    router.push('/profileedit');
  };

  const {followers} = useAppSelector(state => {
    return state.followers;
  });

  const {follows} = useAppSelector(state => {
    return state.follows;
  });

  const {diarys} = useAppSelector(state => {
    return state.diaryMine;
  });

  useEffect(() => {
    dispatch(profileAsync());
    dispatch(followerListAsync());
    dispatch(followListAsync());
    dispatch(diaryMineAsync());
    dispatch(playListMineAsync());
  }, []);

  const [FModalType, setFModalType] = useState<Number>(0);
  const getModalType = (type: Number) => {
    setFModalType(type);
  };

  // true면 diary false면 playlist
  const [dpChange,setdpChange] = useState<boolean>(true)


  const {myplaylist} = useAppSelector(state => {
    return state.playListMine;
  });


  return (
    <>
      <Seo title={`Profile`} />

      <div
        className={`${
          FModalType === 0
            ? 'w-0 h-0'
            : 'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'
        }`}
        onClick={() => {
          setFModalType(0);
        }}></div>
      <FollowModal
        getModalType={getModalType}
        type={FModalType}
        isMe={true}
        list={FModalType == 1 ? follows : followers}
      />

      {/* 뒷배경 */}
      <div className="absolute w-full md:h-[200px] h-[115px] bg-slate-700"></div>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 min-w-[200px]`}>
        <div className="z-[1] absolue">
          <div className="flex flex-col items-center text-white">
            {/* 프로필 상단 구역 */}

            <div className="select-none flex flex-row justify-center w-[80%] mt-[2%] md:w-[90%] whitespace-nowrap">
              {/* 프로필 이미지, 닉네임, 자기소개 구역 */}
              {/* 프로필 사진 */}
              <div>
                {profile_img_path ? (
                  <div className="w-[80px] h-[80px] overflow-hidden rounded-full border-4 md:w-[250px] md:h-[250px] items-center flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ">
                    <img
                      className="w-[80px] h-[80px] rounded-full md:w-[280px] md:h-[250px] items-center flex justify-center"
                      src={profile_img_path}
                      alt="profile_image"
                    />
                  </div>
                ) : (
                  <div className="w-[80px] h-[80px] rounded-full border-4 md:w-[250px] md:h-[250px] items-center flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ">
                    <Image
                      className={`w-[80%]`}
                      src={defaultImg}
                      alt="profile_image"
                    />
                  </div>
                )}
              </div>

              {/* 닉네임, 자기소개 */}
              <div className="flex flex-col ml-4 pt-[2%] md:ml-6 pt-[2%] w-[100%] md:mt-28 mt-10">
                <h2 className="flex flex-row items-center text-xl text-white md:font-semibold md:text-4xl ">
                  {nickname}
                </h2>
                <div
                  className={`md:flex md:flex-row md:text-lg text-sm md:gap-x-7 md:pt-2 pb-2 mt-1 mb-1`}>
                  <div
                    className={`hover:text-slate-400 duration-300 font-bold`}
                    onClick={() =>
                      FModalType !== 1 ? setFModalType(1) : setFModalType(0)
                    }>
                    <p> 팔로우 {follows.length}</p>
                  </div>

                  <div
                    className={`hover:text-slate-400 duration-300 font-bold`}
                    onClick={() =>
                      FModalType !== 2 ? setFModalType(2) : setFModalType(0)
                    }>
                    <p> 팔로워 {followers.length}</p>
                  </div>

                  <div className={` font-bold`}>
                    <p> 🔷 500 </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-[80%] w-[100%] mt-4">
              <div className="text-[15px] w-[100%] min-w-[136px] rounded-md text-white bg-slate-600 break-normal break-words whitespace-pre-wrap md:text-lg p-2">
                {introduce}
              </div>
              {/* 프로필 수정으로 이동 버튼*/}
              <div className="flex flex-row-reverse min-w-[136px] h-10">
                <button
                  className="w-12 h-6 mt-2 mb-2 bg-blue-600 rounded-lg text-md hover:bg-blue-500 md:w-20 md:h-8"
                  onClick={gotoprofileEdit}>
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid items-center justify-center grid-cols-1 p-2 mt-4 border-t-2 select-none h-cover">
          {/* 영역 묶음 */}
          <div className={``}>
            {/* 영역 전환 텍스트 */}
            <div className={`flex flex-row gap-x-10 justify-center mb-2`}>
            <h2 
            className={`py-2 text-lg font-semibold text-center md:text-2xl ${dpChange?`text-white`:`text-slate-600 hover:text-slate-400`}`}
            onClick={()=>setdpChange(true)}>
              Diary
            </h2>
            <h2 className={`py-2 text-lg font-semibold text-center ${dpChange?`text-slate-600 hover:text-slate-400`:`text-white`} md:text-2xl`}
            onClick={()=>setdpChange(false)}>
              Playlist
            </h2>
            </div>
            
            {/* 영역 부분 */}
            <div className="w-[100%] h-[400px] border-t border-b pt-3 pb-3 overflow-auto scrollbar-hide">

            {dpChange?<>
              {diarys && diarys.length >0 ? diarys.filter(function(c){ return c.pub==='0'; }).map((p, id) => (
            <Link href={`/diary/${id}`} className={` h-fit`}>
                <div className={` mb-2 flex bg-slate-900 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300 overflow-hidden`}>

                <div className={`md:w-[70%] w-[90%]`}>
                  <p> {`${p.title}`}</p>
                  </div>
                  <div className={`md:flex md:gap-x-4`}>
                    <p className={` invisible md:visible`}> {`${p.createDt}`} </p>
                    <p> 💕 {`${p.like}`} </p>
                  </div>

                  
                <div>
              </div>
              </div>      
            </Link>
        )):
        <div className={`w-full bg-slate-900 bg-opacity-60 text-center h-full items-center flex flex-row justify-center`}>
          <p> 아직 작성된 일기가 없습니다. </p>
        </div>
        }  
            </>:
            <>
            {myplaylist && myplaylist.length > 0 ? myplaylist.map((p, id) => (
            <Link               
            href={{
              pathname: `/playlist/${id}`,
              query: {
                playlistTitle: p.playlistTitle,
                isPublic:p.isPublic
              }
            }}
            as={`/playlist/${id}`}
            className={` h-fit`}>
                <div className={`mb-2 flex bg-slate-900 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
                  {`${p.playlistTitle}`}
                <div>
              </div>
              </div>      
            </Link>
            )):
            <div className={`w-full bg-slate-900 bg-opacity-60 text-center h-full items-center flex flex-row justify-center`}>
              <p> 플레이리스트가 없습니다. </p>
            </div>
             }  
            </>   
            }
            </div>
          </div>          
        </div>
      </main>
    </>
  );
}

export default Profile;
