import Image from 'next/image';
import {useEffect, useState, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import logoUrl from 'public/images/Logo/TideLogoFinal.png';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {initStatusSignUp, signUpAsync} from 'store/api/features/signUpSlice';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

// 데이터값
interface AccountInterFace {
  email: string;
  password: string;
  password2: string;
  year: string;
  month: string;
  day: string;
  gender: number;
  nickname: string;
}

// 12월 까지의 리스트
const months: string[] = Array.from({length: 12}, (v, i) => i + 1).map(num => {
  if (num <= 9) {
    return '0' + String(num);
  } else {
    return String(num);
  }
});
// 31일 까지의 리스트
const days: string[] = Array.from({length: 31}, (v, i) => i + 1).map(num => {
  if (num <= 9) {
    return '0' + String(num);
  } else {
    return String(num);
  }
});

const signup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //input에서 value를 담기 위한 state 생성
  const [account, setAccount] = useState<AccountInterFace>({
    email: '',
    password: '',
    password2: '',
    year: '',
    month: '01',
    day: '01',
    gender: 0,
    nickname: ''
  });
  // 비밀번호 확인 일치여부
  const [checkPassword, setCheckPassword] = useState<string>('');

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value
    });
    if (
      event.target.name === 'password2' &&
      event.target.value !== account.password
    ) {
      setCheckPassword('비밀번호가 일치하지 않습니다');
    }
    if (
      event.target.name === 'password2' &&
      event.target.value === account.password
    ) {
      setCheckPassword('비밀번호가 일치합니다');
    }
  };

  //회원가입 form 제출
  const onSubmitSignUpForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkPassword === '비밀번호가 일치하지 않습니다') {
      toast('비밀번호가 일치하지 않습니다');
    } else {
      dispatch(signUpAsync(account));
    }
  };

  // 회원가입 요청후 값
  const {status} = useAppSelector(state => {
    return state.signup;
  });

  useEffect(() => {
    switch (status) {
      case 'completed':
        toast.success('회원가입성공');
        router.push({
          pathname: `/login`
        });
        break;
      case 'failed':
        toast.info('아이디 또는 닉네임이 중복입니다');
        break;
    }
    // status값 init
    dispatch(initStatusSignUp());
  }, [status]);

  return (
    <div
      className={`w-full h-screen flex justify-center overflow-hidden text-white bg-[url('/images/BackGround/loginBG.png')] bg-no-repeat bg-cover sm:bg-[url('/images/BackGround/signupBlackBG2.png')] sm:bg-no-repeat sm:bg-cover sm:justify-end sm:min-h-[50rem]`}>
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
          onSubmit={onSubmitSignUpForm}
          className="flex flex-col items-center w-5/6 text-sm h-[36rem] justify-evenly">
          {/* 이메일 및 비번 체크 */}
          <input
            onChange={onChangeAccount}
            name="email"
            type="email"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2 outline-none focus:border-sky-600`}
            placeholder="이메일"
            required
          />
          <input
            onChange={onChangeAccount}
            name="password"
            type="password"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2 outline-none focus:border-sky-600`}
            placeholder="패스워드"
            required
          />
          <input
            onChange={onChangeAccount}
            name="password2"
            type="password"
            className={`border-2 w-full h-10 rounded-md bg-transparent p-2 outline-none focus:border-sky-600`}
            placeholder="패스워드 확인"
            required
          />
          <div
            className={`${
              checkPassword === '비밀번호가 일치하지 않습니다'
                ? `text-red-500`
                : `text-green-500`
            }`}>
            {checkPassword}&nbsp;
          </div>
          {/* 생년월일 체크 */}
          <div className="w-full text-lg text-left">생년월일</div>
          <div className={`w-full`}>
            <input
              onChange={onChangeAccount}
              name="year"
              type="text"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2 outline-none focus:border-sky-600`}
              placeholder="년(4자리)"
              maxLength={4}
              required
            />
            <select
              onChange={onChangeAccount}
              name="month"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2 outline-none focus:border-sky-600`}>
              {months.map(mon => {
                return (
                  <option
                    className={`bg-black`}
                    key={mon}
                    value={mon}>{`${mon}월`}</option>
                );
              })}
            </select>
            <select
              onChange={onChangeAccount}
              name="day"
              className={`border-2 w-1/5 h-10 rounded-md bg-transparent p-2 mr-2`}>
              {days.map(day => {
                return (
                  <option
                    className={`bg-black`}
                    key={day}
                    value={day}>{`${day}일`}</option>
                );
              })}
            </select>
          </div>
          {/* 성별 체크 */}
          <div className="w-full text-lg text-left">성별</div>
          <div className={`w-full flex`}>
            <input
              onChange={onChangeAccount}
              type="radio"
              name="gender"
              className={`border-2 w-1/12 h-6`}
              value={0}
              defaultChecked
            />
            <span>남자</span>
            <input
              onChange={onChangeAccount}
              type="radio"
              name="gender"
              className={`border-2 w-1/12 h-6`}
              value={1}
            />
            <span>여자</span>
          </div>
          {/* 닉네임 체크 */}
          <div className="w-full text-lg text-left">닉네임</div>
          <div className={`w-full flex`}>
            <input
              onChange={onChangeAccount}
              name="nickname"
              type="text"
              className={`border-2 w-full h-10 rounded-md bg-transparent p-2`}
              placeholder="닉네임을 입력해주세요"
              required
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
              type="button"
              className={`w-full h-10 cursor-pointer text-sm`}
              value="로그인"
            />
          </Link>
        </div>
      </motion.div>
      <style jsx>{`
        select::-webkit-scrollbar {
          width: 0.6rem; /* 스크롤바의 너비 */
        }
        select::-webkit-scrollbar-thumb {
          // height: 30%;
          background: #2e608c; /* 스크롤바의 색상 */

          border-radius: 10px;
        }
        select::-webkit-scrollbar-track {
          background: #011526;
        }
      `}</style>
    </div>
  );
};

export default signup;
