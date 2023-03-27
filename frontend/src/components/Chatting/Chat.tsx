import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector, wrapper} from 'store';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'; // getServerSideProps type

// 파이어베이스
import {dbService} from '@/firebase';
import {
  query,
  orderBy,
  onSnapshot,
  addDoc,
  collection,
  getCountFromServer,
  serverTimestamp
} from 'firebase/firestore';
import Message from './Message';

// SSR: 서버에서 구동되는 영역
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(store => async () => {
//     // 서버 영역에서 Redux 사용
//     // await store.dispatch(fetchAsync());
//     // 전달할 props가 있으면 전달
//     return {
//       props: {
//         message: 'SSR!!'
//       }
//     };
//   });

const Chat = () =>
  // props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    // 유저 데이터
    const [messageDatas, setMessageDatas] = useState<any[]>([]);

    // 채팅 데이터들 가져오기
    const getContents = async () => {
      // 우선 query로 데이터 가져오기 두번째 인자 where로 조건문도 가능
      const content = query(
        collection(dbService, 'test'),
        orderBy('createdAt')
      );

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

    const onSubmitMessage = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // 메시지 데이터에 추가

      await addDoc(collection(dbService, 'test'), {
        nickname: 'pinkbean',
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

    return (
      <div className="flex justify-center h-screen text-white ">
        <h1>Chatting</h1>
        <div className="flex flex-col items-center justify-center w-1/2 h-full border-2 border-red-400">
          {/* 메시지들 보이는 곳 */}
          <div className="w-5/6 overflow-y-auto border-2 border-blue-500 h-1/2">
            {messageDatas.map(msg => {
              return <Message key={msg.createdAt} data={msg} />;
            })}
          </div>
          {/* 메시지 보내는 곳 */}
          <form onSubmit={onSubmitMessage}>
            <input
              className="w-10/12 h-10 p-2 bg-transparent border-2 rounded-md"
              type="text"
              placeholder="메시지 보내기..."
              value={message}
              onChange={onChangeMessage}
              maxLength={50}
            />
            <input
              className="p-2 border-2 rounded-md cursor-pointer"
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
