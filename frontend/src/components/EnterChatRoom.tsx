import axios from 'axios';
import {getCookie} from 'cookies-next';
import {NextRouter} from 'next/router';

// 파이어베이스
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {dbService} from '@/firebase';
import {serverTimestamp} from 'firebase/firestore';


const enterChat = async (router: NextRouter, otherNickname: any) => {
  const myNickName = getCookie('nickname');
  const nickname = otherNickname;
  console.log(nickname)
  // 방 이름 검색위해 두가지 다 검색
  const roomName = `${myNickName}${nickname}`;
  const roomName2 = `${nickname}${myNickName}`;

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
    );
    return;
  }
  // 나의 방 리스트 만듬
  console.log('3');
  await setDoc(doc(dbService, `${myNickName}`, `${nickname}`), {
    nickname,
    createdAt: serverTimestamp()
  });

  // 앞에서 방을 못찾으면 방을 만듬
  await setDoc(doc(dbService, roomName, 'start'), {
    startTime: serverTimestamp(),
    createdAt: serverTimestamp()
  });
  router.push(
    {
      pathname: '/message/[...nickname]',
      query: {
        nickname: nickname,
        roomName: roomName
      }
    }
  );
};

export {enterChat};
