import Image from 'next/image';
import {useEffect, useState, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import logoUrl from 'public/images/Logo/TideLogoFinal.png';
import Link from 'next/link';

// SSR: 서버에서 구동되는 영역
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async () => {
//     console.log("SSR");
//     // 서버 영역에서 Redux 사용
//     // await store.dispatch(fetchAsync("갔냐?"))
//     // 전달할 props가 있으면 전달
//     return {
//       props: {
//         message: "SSR!!",
//       },
//     };
//   });

const signup = () => {
  const google = useRef<string>('/images/Logo/google.png');
  useEffect(() => {}, []);

  return (
    <div
      className={`w-full h-screen flex justify-center text-white bg-[url('/images/BackGround/loginBG.png')] bg-no-repeat bg-cover sm:bg-[url('/images/BackGround/signupBlackBG.png')] sm:bg-no-repeat sm:bg-cover sm:justify-end sm:min-h-[50rem]`}>
      <div
        className={`w-full mx-5 h-[95%] flex flex-col justify-center items-center bg-black bg-opacity-50 sm:w-[34rem] sm:h-full sm:bg-opacity-95 sm:mx-0`}>
        <div className={`w-40`}>
          <Image src={logoUrl} alt="logo" />
        </div>
        <form className="flex flex-col items-center w-5/6 text-sm h-[34rem] justify-evenly">
          <input
            type="email"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2 `}
            placeholder="이메일"
          />
          <input
            type="password"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2`}
            placeholder="패스워드"
          />
          <input
            type="password"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2`}
            placeholder="패스워드 확인"
          />
          <div className="w-full text-lg text-left">생년월일</div>
          <div className={`w-full`}>
            <input
              type="text"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2`}
              placeholder="년(4자리)"
            />
            <input
              type="text"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2`}
              placeholder="월"
            />
            <input
              type="text"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2`}
              placeholder="일"
            />
          </div>
          <div className="w-full text-lg text-left">성별</div>
          <div className={`w-full flex`}>
            <input
              type="radio"
              name="gender"
              className={`border-2 w-1/12 h-6`}
              value="남자"
              checked
            />
            <span>남자</span>
            <input
              type="radio"
              name="gender"
              className={`border-2 w-1/12 h-6`}
              value="여자"
            />
            <span>여자</span>
          </div>
          <div className="w-full text-lg text-left">닉네임</div>
          <div className={`w-full flex`}>
            <input
              type="text"
              className={`border-2 w-full h-10 rounded-md bg-transparent p-2`}
              placeholder="닉네임을 입력해주세요"
            />
          </div>

          <input
            type="submit"
            className={`border-2 w-4/5 h-10 rounded-md bg-sky-700 text-sm cursor-pointer hover:bg-sky-500`}
            value="회원가입"
          />
        </form>
        <div className="w-1/2 border-[0.1rem] my-4"></div>
        <div className={`w-60 flex flex-col h-32 justify-evenly items-center`}>
          <div className="text-md"> 계정이 이미 있으신가요? </div>
          <Link
            className={`border-2 w-full rounded-md bg-sky-700 hover:bg-sky-500`}
            href={`/login`}>
            <input
              type="submit"
              className={`w-full h-10 cursor-pointer text-sm`}
              value="로그인"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signup;
