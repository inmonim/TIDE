import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

interface propsInterFace {
  usersNickName: string | string[] | undefined;
  roomName: string | string[] | undefined;
}

function Messages() {
  const router = useRouter();
  const [usersNickName, setUsersNickName] = useState<
    string | string[] | undefined
  >('');
  const [roomName, setRoomName] = useState<string | string[] | undefined>('');

  // 넘겨줄 데이터
  const propsData = {
    usersNickName,
    roomName
  };
  useEffect(() => {
    setUsersNickName(router.query.nickname);
    setRoomName(router.query.roomName);
  }, [router]);
  return (
    <>
      {roomName && (
        <main
          className={`
    lg:p-[4rem] lg:pr-[calc(200px)] lg:pl-[calc(15%+100px)] text-sm lg:text-lg lg:h-screen lg:pb-[9rem] h-screen text-white flex flex-col lg:pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
          <Chat data={propsData} />
        </main>
      )}
    </>
  );
}
export default Messages;
