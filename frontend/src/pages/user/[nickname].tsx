import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { useRouter } from 'next/router';
import {followReqAsync} from 'store/api/features/followReqSlice';
import Seo from '@/components/Seo';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface followReqInterFace {
  nickname: string;
}

export default function DiaryDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 닉네임
  const [followReqNick, setFollowReqNick] = useState<followReqInterFace>({
    nickname:`${router.query.nickname}`
  });

  // 요청 후 값 받아오기
  const {status} = useAppSelector(state => {
    return state.followReq;
  });

  //팔로우 요청 form 제출
  const onSubmitFollowReqForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(followReqAsync(followReqNick));
  };


  return (
    <>
      <Seo title={`User ${router.query.nickname}`} />

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> User {router.query.nickname}</h1>
        </div>

        <div className={`mt-10 bg-black`}>
          <form
            onSubmit={onSubmitFollowReqForm}
            className="flex flex-col items-center text-sm h-72 justify-evenly"
            >
              <button className={`w-30 h-30 bg-red-400 p-3 rounded-lg`}> 팔로우 </button>
          </form>
        </div>
      </main>
    </>
  );
}
