// import React, {FC, useEffect} from 'react';
// import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
// import {followDelAsync} from 'store/api/features/followDelSlice';
// import {followerDelAsync} from 'store/api/features/followerDelSlice';
// import { getCookie } from 'cookies-next';
// import { useRouter } from 'next/router';

// interface listInterFace {
//   nickname: string;
//   profile_img_path: string;
//   introduce: string;
// }

// export type FollowModalProps = {
//   type:Number
//   isMe: boolean
//   list:listInterFace[]
//   getModalType:Function
// };

// interface followAPIInterFace {
//   nickname: string;
// }

// const MusicModal: FC<FollowModalProps> = props => {
//   const {type, isMe, list, getModalType} = props;

//   const dispatch = useAppDispatch();

//   const {status} = useAppSelector(state => {
//     return state.followDel;
//   });

//   const onFollowDel = (nick:followAPIInterFace) => {
//       dispatch(followDelAsync(nick));
//   };

//   const onFollowerDel = (nick:followAPIInterFace) => {
//     dispatch(followerDelAsync(nick));
// };

//   const router = useRouter();
  

//   return(
//     <>
//     {type===0? null:
//     <div className={`left-[22%] right-[22%] top-[20%] min-w-[200px] rounded-md bg-slate-500 h-[60%] ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23] overflow-hidden
    
//     `}> 
//       <p className={`text-xl font-bold`}> {type===1?'팔로우 ':'팔로워 '} 목록</p>
      
//       {/*  감싸는 div */}

//       <div className={`mt-4 h-[90%] overflow-auto grid scrollbar-hide grid-rows-[repeat(auto-fill,minmax(70px,1fr))] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-black`}>

//       {list ? list.map((p, index) => (
//           <div 
//           onClick={()=>{
//             getModalType(0)
//             router.push(`/user/${p.nickname}`)
//           }}
//           className={`flex bg-slate-800 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
          
//           <div className={`flex items-center`}>
//             {
//               p.profile_img_path? 
//               <img src={p.profile_img_path} className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></img>
//               :
//               <div className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></div>
//             }
//             <p> {p.nickname}</p>
//           </div>

//             {isMe?
//           <div>
//             <button 
//             onClick={()=>{type===1?onFollowDel({nickname:p.nickname}):onFollowerDel({nickname:p.nickname})}}
//             className={`border rounded-3xl p-[6px] text-sm bg-slate-500 shadow text-shadow-md hover:bg-slate-800 duration-300`}> {type===1?`언팔로우`:`팔로워 삭제`}</button>
//           </div>
//           :null}
//           </div>      
//         )):null}    
//       </div>

//     </div>
//     }
//     </>
//   );
// }
// export default MusicModal;


import React, {FC, useEffect} from 'react';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import {followDelAsync} from 'store/api/features/followDelSlice';
import {followerDelAsync} from 'store/api/features/followerDelSlice';
import { getCookie } from 'cookies-next';

interface listInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

export type FollowModalProps = {
  type:Number
  isMe: boolean
  list:listInterFace[]
  getModalType:Function
};

interface followAPIInterFace {
  nickname: string;
}

const MusicModal: FC<FollowModalProps> = props => {
  const {type, isMe, list, getModalType} = props;

  const dispatch = useAppDispatch();

  const {status} = useAppSelector(state => {
    return state.followDel;
  });

  const onFollowDel = (nick:followAPIInterFace) => {
      dispatch(followDelAsync(nick));
  };

  const onFollowerDel = (nick:followAPIInterFace) => {
    dispatch(followerDelAsync(nick));
};

  
  

  return(
    <>
    {type===0? null:
    <div className={`left-[22%] right-[22%] top-[20%] min-w-[200px] rounded-md bg-slate-500 h-[60%] ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23] overflow-hidden
    
    `}> 
      <p className={`text-xl font-bold`}> {type===1?'팔로우 ':'팔로워 '} 목록</p>
      
      {/*  감싸는 div */}

      <div className={`mt-4 h-[90%] overflow-auto grid scrollbar-hide grid-rows-[repeat(auto-fill,minmax(70px,1fr))] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-black`}>

      {list ? list.map((p, index) => (
        <Link href={`/user/${p.nickname}`} className={` h-fit`} key={index}
        onClick={()=>{getModalType(0)}}
        >
          <div className={`flex bg-slate-800 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
          
          <div className={`flex items-center`}>
            {
              p.profile_img_path? 
              <img src={p.profile_img_path} className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></img>
              :
              <div className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></div>
            }
            <p> {p.nickname}</p>
          </div>

            {isMe?
          <div>
            <button 
            onClick={()=>{type===1?onFollowDel({nickname:p.nickname}):onFollowerDel({nickname:p.nickname})}}
            className={`border rounded-3xl p-[6px] text-sm bg-slate-500 shadow text-shadow-md hover:bg-slate-800 duration-300`}> {type===1?`언팔로우`:`팔로워 삭제`}</button>
          </div>
          :null}
          </div>      
        </Link>
        )):null}    
      </div>

    </div>
    }
    </>
  );
}
export default MusicModal;