import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {getCookie} from 'cookies-next';

// 파이어베이스
import {dbService} from '@/firebase';
import {
  query,
  onSnapshot,
  collection,
  where,
  orderBy
} from 'firebase/firestore';
import {enterChat} from '@/components/EnterChatRoom';

function Messages() {
  const router = useRouter();
  const myNickName = getCookie('nickname');
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
      orderBy('createdAt')
    );
    // 실시간 변화 감지
    onSnapshot(rooms, snapshot => {
      const contentSnapshot = snapshot.docs.map(con => ({
        ...con.data(),
        id: con.id
      }));
      setRoomList(prev => [...contentSnapshot]);
    });
  };

  // 채팅방 들어가기
  const enterChatting = (otherNickname: string) => {
    enterChat(router, otherNickname);
  };

  useEffect(() => {
    setUsersNickName(router.query.nickname);
    setRoomName(router.query.roomName);
    getRooms();
  }, [router]);

  return (
    <>
      {roomName && (
        <main
          className={`
    lg:p-[4rem] lg:pr-[calc(200px)] lg:pl-[calc(15%+100px)] text-sm lg:text-lg lg:h-screen lg:pb-[9rem] h-screen text-white flex lg:pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
          <div className="w-1/4 overflow-y-auto bg-black">
            {roomList.map(room => {
              return (
                <div
                  onClick={() => enterChatting(room.nickname)}
                  className="flex items-center justify-center h-20 text-xl text-white border-2 border-white cursor-pointer hover:bg-gray-800">
                  {room.nickname}
                </div>
              );
            })}
          </div>
          <div className="w-3/4">
            <Chat data={propsData} />
          </div>
        </main>
      )}
    </>
  );
}
export default Messages;
