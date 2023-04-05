import Image from 'next/image';
import {useEffect, useState, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import logoUrl from 'public/images/Logo/TideLogoFinal.png';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {loginAsync} from 'store/api/features/loginSlice';
import {useRouter} from 'next/router';
import {setToken} from '@/components/TokenManager';
import {toast} from 'react-toastify';
import {initStatus} from 'store/api/features/signUpSlice';
import { profileAsync } from 'store/api/features/profileSlice';

interface LoginInterFace {
  email: string;
  password: string;
}

const login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginAccount, setLoginAccount] = useState<LoginInterFace>({
    email: '',
    password: ''
  });

  // 로그인 요청후 값 받아오기
  const {token, email, status} = useAppSelector(state => {
    return state.login;
  });

  // 로그인 요청후 받아온 상태값 변화에 따른 처리
  useEffect(() => {
    switch (status) {
      case 'completed':
        router.push({
          pathname: `/mainpage`
        });
        toast.success('로그인 성공');
        setToken(token, email);
        router.reload();
        break;
      case 'failed':
        toast.error('로그인 실패');
        break;
    }
    // status값 init
    dispatch(initStatus());
  }, [status]);

  //input에 입력될 때마다 loginAccount state값 변경되게 하는 함수
  const onChangeAccount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLoginAccount({
      ...loginAccount,
      [event.target.name]: event.target.value
    });
  };

  //로그인 form 제출
  const onSubmitLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginAsync(loginAccount));
  };

  return (
    <div
      className={`w-full h-screen overflow-hidden flex justify-center text-white bg-[url('/images/BackGround/loginBG.png')] bg-no-repeat bg-cover sm:bg-[url('/images/BackGround/loginWebBG.png')] sm:bg-no-repeat sm:bg-cover sm:justify-end sm:min-h-[50rem]`}>
      {/* 왼쪽 로고 */}
      <motion.div
        initial={{translateX: -1000}}
        animate={{translateX: 0}}
        transition={{
          delay: 0.2,
          duration: 0.5
        }}
        className={`hidden lg:w-2/3 lg:h-full lg:flex lg:justify-start lg:items-center`}>
        <Image src={logoUrl} alt="logo" />
      </motion.div>
      {/* 오른쪽 폼 */}
      <motion.div
        initial={{translateX: 500}}
        animate={{translateX: 0}}
        exit={{translateX: 500}}
        transition={{
          duration: 0.5
        }}
        className={`w-full mx-5 h-[95%] flex flex-col justify-center items-center bg-[#010122] bg-opacity-80 sm:w-[34rem] sm:h-full sm:bg-opacity-95 sm:mx-0`}>
        <div className={`w-40`}>
          <Image src={logoUrl} alt="logo" />
        </div>
        <form
          onSubmit={onSubmitLoginForm}
          className="flex flex-col items-center w-5/6 text-sm h-72 justify-evenly">
          <input
            onChange={onChangeAccount}
            name="email"
            type="email"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2 `}
            placeholder="이메일"
            required
          />
          <input
            onChange={onChangeAccount}
            name="password"
            type="password"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2`}
            placeholder="패스워드"
            required
          />
          <input
            type="submit"
            className={`border-2 w-4/5 h-10 rounded-md bg-sky-700 text-sm cursor-pointer hover:bg-sky-500`}
            value="로그인"
          />
        </form>
        <div className="w-1/2 border-[0.1rem] my-4"></div>
        <div className={`w-60 flex flex-col h-60 justify-evenly items-center`}>
          <div className="text-md"> 계정이 없으신가요? </div>
          <Link
            className={`border-2 w-full rounded-md bg-sky-700 hover:bg-sky-500`}
            href={`/signup`}>
            <input
              type="button"
              className={`w-full h-10 cursor-pointer text-sm`}
              value="가입"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default login;
