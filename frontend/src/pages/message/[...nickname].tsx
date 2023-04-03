import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {getCookie} from 'cookies-next';

// 파이어베이스
import {dbService} from '@/firebase';
import {query, onSnapshot, collection, orderBy} from 'firebase/firestore';
import {enterChat} from '@/components/EnterChatRoom';
import {useAppDispatch, useAppSelector} from 'store';
import { userInfoAsync } from 'store/api/features/userInfoSlice';
import { toast } from 'react-toastify';

function Messages() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const myNickName = getCookie('nickname');
  // 상대방 이미지 주소
  const {profile_img_path} = useAppSelector(state => state.userInfo);
  // 상대방 닉네임
  const [usersNickName, setUsersNickName] = useState<
    string | string[] | undefined
  >('');
  // 채팅 방 이름
  const [roomName, setRoomName] = useState<string | string[] | undefined>('');
  // 나의 채팅방 리스트
  const [roomList, setRoomList] = useState<any[]>([]);

  // 넘겨줄 데이터
  const propsData = {
    usersNickName,
    roomName
  };
  // 채팅방 목록 가져오기
  const getRooms = async () => {
    // 방 목록 가져오기
    const rooms = query(
      collection(dbService, `${myNickName}`),
      orderBy('createdAt', 'desc')
    );
    // 실시간 방목록 변화 감지
    onSnapshot(rooms, snapshot => {
      const contentSnapshot = snapshot.docs.map(con => {
        return {
          ...con.data(),
          id: con.id
        }
      });
      setRoomList(prev => [...contentSnapshot]);
    });
  };

  // 채팅방 들어가기
  const enterChatting = (
    event: React.MouseEvent<HTMLDivElement>,
    otherNickname: string
  ) => {
    enterChat(router, otherNickname, profile_img_path);
  };

  useEffect(() => {
    const userNick = {
      nickname : router.query.nickname
    }
    dispatch(userInfoAsync(userNick));
    setUsersNickName(router.query.nickname);
    setRoomName(router.query.roomName);
    getRooms();
  }, [router]);

  return (
    <>
      {roomName && (
        <main
          className={`${router.pathname === "/message" ? `w-full` : ""}
    lg:p-[4rem] lg:pr-[calc(200px)] lg:pl-[calc(15%+100px)] text-sm lg:text-lg lg:h-screen lg:pb-[9rem] h-screen text-white flex lg:pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
          <div className="hidden md:bg-black md:w-1/4 md:mr-1 md:overflow-y-auto md:block">
            {roomList.map(room => {
              return (
                <div
                  key={room.nickname}
                  id={room.nickname}
                  onClick={event => {
                    enterChatting(event, room.nickname);
                  }}
                  className={`${
                    router.query.nickname![0] === room.nickname[0]
                      ? `bg-gray-800`
                      : ''
                  } flex items-center h-20 text-lg text-white cursor-pointer justify-evenly hover:bg-gray-800`}>
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                      className="object-contain"
                      src={room.profilePath}
                      alt={room.nickname}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center w-3/5">
                    <div>{room.nickname}</div>
                    <div className="text-sm text-gray-400">{room.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`${router.pathname === "/message" ? `hidden` : ""} w-full md:w-3/4 md:block`}>
            <Chat data={propsData} />
          </div>
        </main>
      )}
    </>
  );
}
export default Messages;
