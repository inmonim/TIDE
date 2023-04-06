import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import {useRouter} from 'next/router';
import {followReqAsync} from 'store/api/features/followReqSlice';
import {followAccAsync} from 'store/api/features/followAccSlice';
import {followNoneAccAsync} from 'store/api/features/followNoneAccSlice';
import { userInfoAsync } from 'store/api/features/userInfoSlice';
import { userfollowListAsync } from 'store/api/features/userFollowListSlice';
import { userfollowerListAsync } from 'store/api/features/userFollowerListSlice';
import { userDiaryAsync } from 'store/api/features/userDiarySlice';
import Seo from '@/components/Seo';
import {useEffect, useState} from 'react';
import {getCookie} from 'cookies-next';
import defaultImg from 'public/images/Logo/whiteLogo.png';
import FollowModal from '@/components/Modal/FollowModal';
import Image from 'next/image';
import {toast} from 'react-toastify';
import { enterChat } from '@/components/EnterChatRoom';
import Message from 'public/buttons/Messege.png'
import { userPlayListAsync } from 'store/api/features/userPlayListSlice';
import { followWaitAsync } from 'store/api/features/followWaitSlice';

interface nickInterFace {
  nickname: string;
}

export default function userDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // 닉네임
  const [Nick, setNick] = useState<nickInterFace>({
    nickname: `${router.query.nickname}`
  });

  useEffect(()=>{
    dispatch(followWaitAsync())
  },[])

  const {followWaiters} = useAppSelector((state)=>{
    return state.followWait
  })

  useEffect(()=>{
    if (Nick.nickname === router.query.nickname)
    {
      dispatch(userInfoAsync(Nick));
      dispatch(userfollowListAsync(Nick));      
      dispatch(userfollowerListAsync(Nick));
      dispatch(userDiaryAsync(Nick));
      dispatch(userPlayListAsync(Nick));
    }
  },[Nick])

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
    if (Nick.nickname === router.query.nickname)
      dispatch(followReqAsync(Nick));
  };

  const onFollowAcc = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (Nick.nickname === router.query.nickname)
      dispatch(followAccAsync(Nick));
  };

  const onFollowNoneAcc = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (Nick.nickname === router.query.nickname)
      dispatch(followNoneAccAsync({nickname: `${router.query.nickname}`}));
  };


  const {followers} = useAppSelector(state => {
    return state.userFollower;
  });

  const {follows} = useAppSelector(state => {
    return state.userFollow;
  });

  const {diarys} = useAppSelector(state => {
    return state.userDiary;
  });

  const {playlists} = useAppSelector(state => {
    return state.userPlayList;
  });


  // 메시지 방 생성
  const onSendMessage = async () => {
    const otherNickname =  router.query.nickname;
    await enterChat(router, otherNickname, profile_img_path);
  };

  // 본인이면 프로필로 리다이렉트
  useEffect(() => {
    setNick({nickname: `${router.query.nickname}`});
    if(getCookie('nickname') === router.query.nickname)
    {
      router.push({
        pathname: `/profile`,
      });
    }
  }, [router.query]);

    // true면 diary false면 playlist
  const [dpChange,setdpChange] = useState<boolean>(true)
  
  const getModalType = (type:Number) =>{
    setFModalType(type)
  }

  return (
    <>
      <Seo title={`${nickname}`} />


      <div className={`${FModalType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setFModalType(0)}} >
      </div>
      <FollowModal getModalType={getModalType} type={FModalType} isMe={false} list={FModalType==1?followers:follows}/>


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
              <div className="flex flex-row items-center text-xl text-white md:font-semibold md:text-4xl ">
                {nickname}
                <form
                onSubmit={onSubmitFollowReqForm}>

{followWaiters.findIndex(e=>e.nickname === nickname)?                <button className={`ml-2 mb-1 w-26 h-5 bg-blue-400 rounded-lg pl-2 pr-2 text-sm hover:bg-blue-600 duration-200`}>
                  {' '}
                  팔로우{' '}
                </button>
                :
                <div className='grid h-full ml-2 md:flex'>
                                <button
                  className={`w-30  text-sm h-6 bg-blue-800 pl-1 pr-1 rounded-lg hover:bg-blue-400 duration-200 z-[2]`}
                  onClick={onFollowAcc}>
                  {' '}
                  팔로우 수락{' '}
                </button>
                <button
                  className={`w-30 h-6 text-sm bg-red-800 pl-1 pr-1 rounded-lg hover:bg-red-500 duration-200 z-[2]`}
                  onClick={onFollowNoneAcc}>
                  {' '}
                  팔로우 거절{' '}
                </button>
                </div>
                }
                </form>
              </div>

              <div className={`md:flex md:flex-row md:text-lg text-sm md:gap-x-7 md:pt-2 pb-2 mt-1 mb-1`}>
                
                <div  className={`hover:text-slate-400 duration-300 font-bold`}
                onClick={()=> FModalType!==1? setFModalType(1) : setFModalType(0)}
                >
                <p> 팔로우 {followers.length}</p>
                </div>

                <div  className={`hover:text-slate-400 duration-300 font-bold`}
                onClick={()=> FModalType!==2? setFModalType(2) : setFModalType(0)}
                >
                <p> 팔로워 {follows.length}</p>
                </div>
                <button
                  className={`md:w-7 md:h-7 w-5 h-5 rounded-lg justify-center items-center flex hover:fliter hover:drop-shadow-[0_0px_4px_rgba(255,255,255,1)] duration-200`}
                  onClick={onSendMessage}>
                  <Image src={Message} alt="직접 메세지 보내기"/>
                </button>
                
              </div>
            </div>
            
          </div>

          <div className='md:w-[80%] w-[100%] mt-4'>
             <div className="mt-2 text-[15px] w-[100%] min-w-[136px] rounded-md text-white bg-slate-600 break-normal break-words whitespace-pre-wrap md:text-lg p-2">
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
            <Link href={`/diary/${p.id}`} className={` h-fit`}>
                <div className={`grid items-center mb-2 md:flex bg-slate-900 rounded-md w-[100%] h-[90px] p-[2%] items-center gap-2 bg-opacity-80 md:justify-between hover:bg-blue-500 duration-300 overflow-hidden`}>
                  <div className={`md:w-[80%] w-[90%] whitespace-nowrap flex items-center`}>
                    <p className={`pr-1 pl-1 border rounded-lg text-sm mr-2 ${p.pub ==='0'? `bg-blue-800 md:px-3` : `bg-red-800 md:px-3`}`}> {p.pub ==='0'? `공개` : `비공개`}</p>
                    <p> {`${p.title}`}</p>
                    </div>
                    <div className={` md:flex md:gap-x-4`}>
                      <p className={`text-sm whitespace-nowrap`}> {`${p.createDt}`} </p>
                      <p className={`text-sm whitespace-nowrap`}> 💕 {`${p.like}`} </p>
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
            {playlists && playlists.length >0 ? playlists.filter(function(c){ return c.isPublic==='0'; }).map((p, id) => (
            <Link               
            href={{
              pathname: `/playlist/${p.id}`,
              query: {
                playlistTitle: p.playlistTitle,
                isPublic:p.isPublic,
                likeCnt:p.likeCnt
              }
            }}
            as={`/playlist/${p.id}`}
            className={` h-fit`}>


           <div className={`grid items-center mb-2 md:flex bg-slate-900 rounded-md w-[100%] h-[90px] p-[2%] items-center gap-2 bg-opacity-80 md:justify-between hover:bg-blue-500 duration-300 overflow-hidden`}>
                <div className={`md:w-[80%] w-[90%] whitespace-nowrap`}>
                  <p> {`${p.playlistTitle}`}</p>
                  <p className={`text-sm whitespace-nowrap`}> 💕 {`${p.likeCnt}`} </p>

          </div>              </div> 

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
