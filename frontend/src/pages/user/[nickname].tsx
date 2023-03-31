import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import {useRouter} from 'next/router';
import {followReqAsync} from 'store/api/features/followReqSlice';
import {followAccAsync} from 'store/api/features/followAccSlice';
import {followNoneAccAsync} from 'store/api/features/followNoneAccSlice';
import {followerListAsync} from 'store/api/features/followerListSlice';
import {followListAsync} from 'store/api/features/followListSlice';
import { userInfoAsync } from 'store/api/features/userInfoSlice';
import Seo from '@/components/Seo';
import {useEffect, useState} from 'react';
<<<<<<< HEAD
import {getCookie} from 'cookies-next';
import defaultImg from 'public/images/Logo/whiteLogo.png';
import FollowModal from '@/components/Modal/FollowModal';
import Image from 'next/image';
=======
>>>>>>> 59042779416476b46796ea957301ca68e0c31136
import {toast} from 'react-toastify';
import { enterChat } from '@/components/EnterChatRoom';



interface followReqInterFace {
  nickname: string;
}

export default function DiaryDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // 닉네임
  const [followReqNick, setFollowReqNick] = useState<followReqInterFace>({
    nickname: `${router.query.nickname}`
  });

  useEffect(() => {
    dispatch(followerListAsync());
    dispatch(followListAsync());
  }, []);

  useEffect(()=>{
    if (followReqNick.nickname === router.query.nickname)
        dispatch(userInfoAsync(followReqNick));
  },[followReqNick])

    const {followers} = useAppSelector(state => {
      return state.followers;
    });
  
    const {follows} = useAppSelector(state => {
      return state.follows;
    });

    // 요청 후 값 받아오기
    const {nickname, profile_img_path, introduce} = useAppSelector(state => {
      // console.log(state.profile, 333);
      return state.userInfo;
    });
      

    const [FModalType,setFModalType] = useState<Number>(0);

  //팔로우 요청 form 제출
  const onSubmitFollowReqForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('닉네임 - ',followReqNick)
    if (followReqNick.nickname === router.query.nickname)
      dispatch(followReqAsync(followReqNick));
  };

  const onFollowAcc = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (followReqNick.nickname === router.query.nickname)
      dispatch(followAccAsync(followReqNick));
  };

  const onFollowNoneAcc = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (followReqNick.nickname === router.query.nickname)
      dispatch(followNoneAccAsync({nickname: `${router.query.nickname}`}));
  };


  // 파이어베이스 메시지 방 생성
  const onSendMessage = async () => {
    const otherNickname =  router.query.nickname;
    await enterChat(router, otherNickname);
  };

  useEffect(() => {
    setFollowReqNick({nickname: `${router.query.nickname}`});
  }, [router.query]);

  return (
    <>
      <Seo title={`User ${router.query.nickname}`} />


      <div className={`${FModalType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setFModalType(0)}} >
      </div>
      <FollowModal type={FModalType} list={FModalType==1?follows:followers}/>


      {/* 뒷배경 */}
      <div className='absolute w-full md:h-[200px] h-[115px] bg-slate-700'>
      </div>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 min-w-[200px]`}>
        
        <div className='z-[1] absolue'>
        <div className="flex flex-col items-center text-white">
          {/* 프로필 상단 구역 */}

          <div className="select-none flex flex-row justify-center w-[80%] mt-[2%] md:w-[90%] whitespace-nowrap">
            {/* 프로필 이미지, 닉네임, 자기소개 구역 */}
            {/* 프로필 사진 */}
            <div>
              {profile_img_path?
              
              <div
              className="w-[80px] h-[80px] overflow-hidden rounded-full border-4 md:w-[250px] md:h-[250px] items-center flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 "
              >

              <img
              className="w-[80px] h-[80px] rounded-full md:w-[280px] md:h-[250px] items-center flex justify-center"              
              src={profile_img_path}
              alt="profile_image"/>
              </div>
            :
            <div
            className="w-[80px] h-[80px] rounded-full border-4 md:w-[250px] md:h-[250px] items-center flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 "
            >
            <Image
            className={`w-[80%]`}
            src={defaultImg}
            alt="profile_image"
            />
            </div>
            }
            </div>

            {/* 닉네임, 자기소개 */}
            <div className="flex flex-col ml-4 pt-[2%] md:ml-6 pt-[2%] w-[100%] md:mt-28 mt-10">
              <h2 className="flex flex-row items-center text-xl text-white md:font-semibold md:text-4xl ">
                {nickname}
              </h2>
              <div className={`md:flex md:flex-row md:text-lg text-sm md:gap-x-7 md:pt-2 pb-2 mt-1 mb-1`}>
                
                <div  className={`hover:text-slate-400 duration-300 font-bold`}
                onClick={()=> FModalType!==1? setFModalType(1) : setFModalType(0)}
                >
                <p> 팔로우 {follows.length}</p>
                </div>

                <div  className={`hover:text-slate-400 duration-300 font-bold`}
                onClick={()=> FModalType!==2? setFModalType(2) : setFModalType(0)}
                >
                <p> 팔로워 {followers.length}</p>
                </div>
                
                <div  className={` font-bold`}>
                  <p> 🔷 500 </p>
                </div>
                
              </div>
            </div>
            
          </div>

          <div className='md:w-[80%] w-[100%] mt-4'>
             <div className="text-[15px] w-[100%] min-w-[136px] rounded-md text-white bg-slate-600 break-normal break-words whitespace-pre-wrap md:text-lg p-2">
                {introduce}
              </div>
              {/* 프로필 수정으로 이동 버튼*/}
                <div className='flex flex-row-reverse min-w-[136px] h-10'>
                </div>
            </div>


        </div>
        </div> 
        <div className="grid items-center justify-center grid-cols-1 p-2 mt-4 border-t-2 select-none h-cover">
          {/* 영역 묶음 */}
          <div className={``}>
            {/* 영역 전환 텍스트 */}
            <div className={`flex flex-row gap-x-10 justify-center mb-2`}>
            <h2 className="py-2 text-lg font-semibold text-center md:text-2xl">
              Diary
            </h2>
            <h2 className="py-2 text-lg font-semibold text-center text-slate-600 md:text-2xl">
              Playlist
            </h2>
            </div>
            
            {/* 영역 부분 */}
            <div className="w-[100%] h-[400px] bg-red-400 ">
              
            </div>
          </div>

          {/* 플리 */}
          {/* <div>
            <h2 className="py-2 text-lg font-semibold text-center md:text-2xl">
              Playlist
            </h2>
          <div className="w-[100%] h-[300px] bg-red-400 "></div>
          </div> */}

          <div className={`mt-10 bg-black`}>
          <form
            onSubmit={onSubmitFollowReqForm}
            className="flex flex-col items-center text-sm h-72 justify-evenly">
            <button className={`w-30 h-30 bg-red-400 p-3 rounded-lg`}>
              {' '}
              비공개 계정 팔로우{' '}
            </button>
          </form>

          <button
            className={`w-30 h-30 bg-blue-600 p-3 rounded-lg`}
            onClick={onFollowAcc}>
            {' '}
            팔로우 요청 수락{' '}
          </button>
          <button
            className={`w-30 h-30 bg-red-600 p-3 rounded-lg`}
            onClick={onFollowNoneAcc}>
            {' '}
            팔로우 요청 거절{' '}
          </button>

          <button
            className={`w-30 h-30 bg-red-400 p-3 rounded-lg`}
            onClick={onSendMessage}>
            {' '}
            메시지 보내기{' '}
          </button>
        </div>



          
        </div>
      </main>

    </>
  );
}
