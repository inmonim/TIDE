import {useState, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector, wrapper} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import {getCookie} from 'cookies-next';

// 파이어베이스
import {dbService} from '@/firebase';
import {
  query,
  orderBy,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';

// 컴포넌트
import Message from './Message';

const Chat = () => {
  const dispatch = useAppDispatch();
  // 내 이메일 정보
  const myEmail = getCookie('email');
  // 채팅 div
  const chatDiv = useRef<HTMLDivElement>(null);
  // 유저 프로필 데이터
  const {nickname} = useAppSelector(state => {
    return state.profile;
  });
  // 채팅메시지 데이터들
  const [messageDatas, setMessageDatas] = useState<any[]>([]);

  // 채팅 데이터들 가져오기
  const getContents = async () => {
    // 유저 정보 요청
    dispatch(profileAsync());

    // 우선 query로 데이터 가져오기 두번째 인자 where로 조건문도 가능
    const content = query(collection(dbService, 'test'), orderBy('createdAt'));

    // 실시간 변화 감지 최신버전
    onSnapshot(content, snapshot => {
      const contentSnapshot = snapshot.docs.map(con => ({
        ...con.data(),
        id: con.id
      }));
      setMessageDatas(prev => [...contentSnapshot]);
    });
  };

  // 메시지 데이터
  const [message, setMessage] = useState<string>('');
  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };

  // 메시지 제출
  const onSubmitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 메시지 빈값일떄 무시
    if (message === '') {
      return;
    }
    // 메시지 데이터에 추가
    await addDoc(collection(dbService, 'test'), {
      email: myEmail,
      nickname: nickname,
      content: message,
      // imageDatas,
      createdAt: serverTimestamp(),
      type: 'text'
    });
    setMessage('');
  };
  // 처음 실행하는 곳
  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    // 채팅 스크롤 젤 밑으로
    setTimeout(() => {
      chatDiv.current!.scrollTop = chatDiv.current!.scrollHeight;
    }, 50);
  }, [messageDatas]);
  return (
    <div className="flex justify-center h-screen text-white ">
      <h1>Chatting</h1>
      <div className="flex flex-col items-center justify-center w-1/2 h-full border-2 border-red-400">
        {/* 메시지들 보이는 곳 */}
        <div
          ref={chatDiv}
          className="w-5/6 overflow-y-auto h-1/2">
          {messageDatas.map(msg => {
            return <Message key={msg.createdAt} data={msg} email={myEmail} />;
          })}
        </div>
        {/* 메시지 보내는 곳 */}
        <form className="flex justify-center w-5/6" onSubmit={onSubmitMessage}>
          <input
            className="w-11/12 h-10 p-2 bg-transparent border-[1px] rounded-md outline-none focus:border-sky-600" 
            type="text"
            placeholder="메시지 보내기..."
            value={message}
            onChange={onChangeMessage}
            maxLength={50}
          />
          <input
            className="w-1/12 p-1 border-[1px] rounded-md cursor-pointer"
            type="submit"
            value="보내기"
          />
        </form>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 0.6rem; /* 스크롤바의 너비 */
        }
        div::-webkit-scrollbar-thumb {
          // height: 70%;
          background: #2e608c; /* 스크롤바의 색상 */

          border-radius: 10px;
        }
        div::-webkit-scrollbar-track {
          background: #011526;
        }
      `}</style>
    </div>
  );
};

export default Chat;
