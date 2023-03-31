import axios from 'axios';
import {getCookie} from 'cookies-next';
import {NextRouter} from 'next/router';

// 파이어베이스
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {dbService} from '@/firebase';
import {serverTimestamp} from 'firebase/firestore';

const enterChat = async (router: NextRouter) => {
  const nickname = router.query.nickname;
  // 방 이름 검색위해 두가지 다 검색
  const roomName = `${getCookie('nickname')}${nickname}`;
  const roomName2 = `${nickname}${getCookie('nickname')}`;

  const docSnap = await getDoc(doc(dbService, roomName, 'start'));
  const docSnap2 = await getDoc(doc(dbService, roomName2, 'start'));

  // 채팅방 존재 여부 체크후 이동
  if (docSnap.exists()) {
    console.log('1');
    router.push(
      {
        pathname: '/message/[...nickname]',
        query: {
          nickname: nickname,
          roomName: roomName
        }
      }
      // `/message/${nickname}`
    );
    return;
  }
  if (docSnap2.exists()) {
    console.log('2');
    router.push(
      {
        pathname: '/message/[...nickname]',
        query: {
          nickname: nickname,
          roomName: roomName2
        }
      }
      // `/message/${nickname}`
    );
    return;
  }
  // 앞에서 방을 못찾으면 방을 만듬
  await setDoc(doc(dbService, roomName, 'start'), {
    startTime: serverTimestamp(),
    createdAt: serverTimestamp()
  });
  console.log('3');
  router.push(
    {
      pathname: '/message/[...nickname]',
      query: {
        nickname: nickname,
        roomName: roomName
      }
    }
    // `/message/${nickname}`
  );
};

export {enterChat};
