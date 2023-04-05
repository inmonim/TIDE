import {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀
import {followWaitAsync} from 'store/api/features/followWaitSlice';
import {followerListAsync} from 'store/api/features/followerListSlice';
import {followListAsync} from 'store/api/features/followListSlice';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

// 파이어베이스
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import {dbService} from '@/firebase';
import {enterChat} from './EnterChatRoom';
import {barZero} from 'store/api/features/barOpenSlice';

export type RightBarProps = {
  barType: Number;
};

const RightBar: FC<RightBarProps> = props => {
  const router = useRouter();
  const myNick = getCookie('nickname');
  const dispatch = useAppDispatch();

  interface followWaitInterFace {
    nickname: string;
    profile_img_path: string;
    introduce: string;
  }
  // 알람메시지 데이터들
  const [alramDatas, setAlramDatas] = useState<any[]>([]);
  // 알림용 컴포넌트 데이터
  const [alramMessage, setAlramMessage] = useState<any[]>([]);

  // 알람 데이터들 가져오기
  const getContents = async () => {
    const alrams = query(
      collection(dbService, `${myNick}alram`),
      orderBy('createdAt')
    );

    // 실시간 알람 감지 최신버전
    onSnapshot(alrams, snapshot => {
      const alramSnapshot = snapshot.docs.map(con => {
        return {
          ...con.data(),
          id: con.id
        };
      });
      setAlramDatas(prev => [...alramSnapshot]);
    });
  };

  // 알람 컴포넌트 지우기
  const deleteChatAlram = async (userNick: string) => {
    dispatch(barZero());
    setAlramMessage([]);
    await deleteDoc(doc(dbService, `${myNick}alram`, `message`));
    // 채팅방 들어가기
    enterChat(router, userNick);
  };
  // 알람 컴포넌트용 데이터 세팅
  useEffect(() => {
    if (alramDatas && alramDatas.length > 0) {
      const {userNick, nickname, check, id} = alramDatas[alramDatas.length - 1];
      const data = {userNick, nickname, check, id};
      // 현재 내가 그 채팅방이면
      if (router.query.roomName?.includes(`${userNick}`)) {
        return;
      }
      setAlramMessage(prev => [data]);
    }
  }, [alramDatas]);

  const {barType} = props;

  const {status, followWaiters} = useAppSelector(state => {
    return state.followWait;
  });

  useEffect(() => {
    getContents();
    dispatch(followWaitAsync());
  }, []);

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
              <>
                {alramMessage &&
                  alramMessage.map((alram, index) => {
                    return (
                      <div
                        onClick={() => deleteChatAlram(alram.userNick)}
                        className={`flex flex-row mb-2 cursor-pointer`}
                        key={index}>
                        <div
                          className={`rounded-lg min-w-[3rem] min-h-[3rem] w-12 h-12 bg-white`}></div>
                        <div className={`ml-3 flex items-center`}>
                          <p className={`text-xs text-white`}>
                            {alram.userNick}님이 채팅을 보냈습니다
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </>
              <>
                {followWaiters
                  ? followWaiters.map((followWaiter, index) => (
                      <Link href={`/user/${followWaiter.nickname}`}>
                        <div
                          onClick={() =>
                            // 알림창 끄기
                            {
                              dispatch(barZero());
                            }
                          }
                          className={`flex flex-row mb-2`}
                          key={index}>
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
            </>
          ) 
           : null}
        </div>
      </div>
    </>
  );
};
export default RightBar;
