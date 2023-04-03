import {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀
import {followWaitAsync} from 'store/api/features/followWaitSlice';
import {followerListAsync} from 'store/api/features/followerListSlice';
import {followListAsync} from 'store/api/features/followListSlice';
import Link from 'next/link';


export type RightBarProps = {
  barType: Number;
};

const RightBar: FC<RightBarProps> = props => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  interface followWaitInterFace {
    nickname: string;
    profile_img_path: string;
    introduce: string;
  }
  const {barType} = props;

  const {status, followWaiters} = useAppSelector(state => {
    return state.followWait;
  });

  const {followers} = useAppSelector(state => {
    return state.followers;
  });

  const {follows} = useAppSelector(state => {
    return state.follows;
  });


  useEffect(() => {
    dispatch(followWaitAsync());
    dispatch(followerListAsync());
    dispatch(followListAsync());
  }, []);

  useEffect(() => {
    const BarSet = setInterval(() => {
      if (barType == 1) dispatch(followWaitAsync());
      else if (barType == 2) dispatch(followerListAsync());
    }, 1000);
    return () => clearInterval(BarSet);
  }, [barType]);


  return (
    <>
      <div
        className={`w-[calc(3%+200px)] h-[calc(100%-140px)] bg-[#1E272FF6] fixed right-2 top-[2.7rem] z-[25] rounded-xl overflow-hidden border-2 border-sky-700`}>
        <div className={`w-[100%] h-[30px] bg-[#2E608C]`}>
          <p className={`text-white pl-2 pt-[2px]`}>
            {barType === 1 ? 'Notification' : 'Friends'}
          </p>
        </div>
        <div
          className={`w-[100%] h-[95%] overflow-y-auto p-3 scrollbar-hide text-white`}>
          {/* 그래서니가뭘 이미지 / 그래서니가뭘 팔로우신청 */}

          {barType === 1 ? (
            <>
              {followWaiters
                ? followWaiters.map((followWaiter, index) => (
                    <Link href={`/user/${followWaiter.nickname}`}>
                      <div className={`flex flex-row mb-2`} key={index}>
                        <div
                          className={`rounded-lg min-w-[3rem] min-h-[3rem] w-12 h-12 bg-white`}></div>
                        <div className={`ml-3 flex items-center`}>
                          <p className={`text-xs text-white`}>
                            {followWaiter.nickname}님이 팔로우 신청을
                            보냈습니다.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </>
          ) : barType === 2 ? (
            <>
              {followers
                ? followers.map((follower, index) => (
                    <Link href={`/user/${follower.nickname}`}>
                      <div className={`flex flex-row mb-2`} key={index}>
                        <div
                          className={`rounded-lg min-w-[3rem] min-h-[3rem] w-12 h-12 bg-white`}></div>
                        <div className={`ml-3 flex items-center`}>
                          <p className={`text-xs text-white`}>
                            {follower.nickname}은 당신을 팔로우하는
                            팔로워입니다.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}

              {follows
                ? follows.map((follow, index) => (
                    <Link href={`/user/${follow.nickname}`}>
                      <div className={`flex flex-row mb-2`} key={index}>
                        <div
                          className={`rounded-lg min-w-[3rem] min-h-[3rem] w-12 h-12 bg-white`}></div>
                        <div className={`ml-3 flex items-center`}>
                          <p className={`text-xs text-white`}>
                            {follow.nickname}은 당신이 팔로우 한 사람입니다.
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default RightBar;
