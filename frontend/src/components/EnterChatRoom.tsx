import axios from 'axios';
import {getCookie} from 'cookies-next';
import {NextRouter} from 'next/router';

// 파이어베이스
import {doc, setDoc, getDoc} from 'firebase/firestore';
import {dbService} from '@/firebase';
import {serverTimestamp} from 'firebase/firestore';


const enterChat = async (router: NextRouter, otherNickname: any, profile_img_path?: string) => {

  const myNickName = getCookie('nickname');
  const myProfilePath = getCookie('profile_img_path');
  // const [nickname] = otherNickname;
  const nickname = otherNickname;
  console.log(otherNickname, "닉네임")
  
  // 방 이름 검색위해 두가지 다 검색
  const roomName = `${myNickName}${nickname}`;
  const roomName2 = `${nickname}${myNickName}`;

  const docSnap = await getDoc(doc(dbService, roomName, 'start'));
  const docSnap2 = await getDoc(doc(dbService, roomName2, 'start'));


  // 채팅방 존재 여부 체크후 이동
  if (docSnap.exists()) {
    // console.log('1');
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
    // console.log('2');
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
  await setDoc(doc(dbService, `${myNickName}`, `${nickname}`), {
    profilePath: profile_img_path,
    nickname,
    createdAt: serverTimestamp(),
  });

  // 상대 방에도 리스트 만듬
  await setDoc(doc(dbService, `${nickname}`, `${myNickName}`), {
    profilePath: myProfilePath,
    nickname: myNickName,
    createdAt: serverTimestamp(),
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
