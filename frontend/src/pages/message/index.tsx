import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {getCookie} from 'cookies-next';
import styles from '@/styles/Diary.module.scss';

// 파이어베이스
import {dbService} from '@/firebase';
import {
  query,
  onSnapshot,
  collection,
  orderBy,
  getDocs
} from 'firebase/firestore';
import {enterChat} from '@/components/EnterChatRoom';
import Link from 'next/link';
import {useAppDispatch} from 'store';

function MessagesIndex() {
  const router = useRouter();
  const myNickName = getCookie('nickname');

  // 나의 채팅방 리스트
  const [roomList, setRoomList] = useState<any[]>([]);
  // 방 클릭 체크 여부
  const [isActive, setIsActive] = useState<string>('');

  // 채팅방 목록 가져오기
  const getRooms = async () => {
    // 방 목록 가져오기
    const rooms = query(
      collection(dbService, `${myNickName}`),
      orderBy('createdAt', 'desc')
    );
    // 실시간 방목록 변화 감지
    onSnapshot(rooms, snapshot => {
      const contentSnapshot = snapshot.docs.map(con => ({
        ...con.data(),
        id: con.id
      }));
      setRoomList(prev => [...contentSnapshot]);
    });
  };

  // 채팅방 들어가기
  const enterChatting = (
    event: React.MouseEvent<HTMLDivElement>,
    otherNickname: string
  ) => {
    const clickedId = event.currentTarget.id;
    setIsActive(prev => clickedId);
    enterChat(router, otherNickname);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <main
        className={`
    lg:p-[4rem] lg:pr-[calc(200px)] lg:pl-[calc(15%+100px)] text-sm lg:text-lg lg:h-screen lg:pb-[9rem] h-screen text-white flex lg:pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="w-full overflow-y-auto bg-black md:mr-1 md:w-1/4">
          <div className={`${styles.description} my-6 ml-8 md:m-0 md:hidden` }><h1 className='text-2xl font-bold md:hidden'>CHATTING</h1></div>
          {roomList.map(room => {
            return (
              <div
                key={room.nickname}
                id={room.nickname}
                onClick={event => {
                  enterChatting(event, room.nickname);
                }}
                className={`${
                  isActive === room.nickname[0] ? `bg-gray-800` : ''
                }   flex items-center h-24 text-xl md:text-lg text-white cursor-pointer justify-evenly hover:bg-gray-800`}>
                <div className="w-16 h-16 overflow-hidden rounded-full md:w-12 md:h-12">
                  <img
                    className="object-contain"
                    src={room.profilePath}
                    alt={room.nickname}
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-3/5">
                  <div>{room.nickname}</div>
                  <div className="text-base text-gray-400 md:text-sm">{room.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            router.pathname === '/message' ? 'hidden md:w-3/4 md:flex' : ''
          } flex-col items-center justify-center h-full bg-black rounded-lg bg-opacity-40`}>
          <div className="flex justify-center w-full text-xl text-white">
            채팅을 시작해보세요
          </div>
          <Link href={`/profile`}>
            <button className="border-[1px] border-white rounded-xl py-1 px-4 my-3">
              내 프로필
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
export default MessagesIndex;
