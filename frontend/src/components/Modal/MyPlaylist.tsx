import React, {FC, useEffect} from 'react';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import {followDelAsync} from 'store/api/features/followDelSlice';
import {followerDelAsync} from 'store/api/features/followerDelSlice';
import {getCookie} from 'cookies-next';

interface listInterFace {
  id: number;
  playlistTitle: string;
  likeCnt: number;
  isPublic: string;
}

export type FollowModalProps = {
  type: Number;
  isMe: boolean;
  list: listInterFace[];
};

interface followAPIInterFace {
  nickname: string;
}

const MusicModal: FC<FollowModalProps> = props => {
  const {type, isMe, list} = props;

  const dispatch = useAppDispatch();

  const {status} = useAppSelector(state => {
    return state.followDel;
  });

  return (
    <>
      {type === 0 ? null : (
        <div
          className={`left-[22%] right-[22%] top-[20%] min-w-[200px] rounded-md bg-slate-500 h-[60%] ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23] overflow-hidden
    
    `}>
          <p className={`text-xl font-bold`}>
            {' '}
            {type === 1 ? '팔로우 ' : '팔로워 '} 목록
          </p>

          {/*  감싸는 div */}

          <div
            className={`mt-4 h-[90%] overflow-auto grid scrollbar-hide grid-rows-[repeat(auto-fill,minmax(70px,1fr))] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-black`}>
            {list
              ? list.map((p, index) => (
                  <Link href={`/user/${p.id}`} className={` h-fit`} key={index}>
                    <div
                      className={`flex bg-slate-800 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
                      <div className={`flex items-center`}>
                        <p> {p.playlistTitle}</p>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};
export default MusicModal;
