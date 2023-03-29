import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {nickname, profile_img_path, introduce} = useAppSelector(state => {
    // console.log(state.profile, 333);
    return state.profile;
  });

  const gotoprofileEdit = () => {
    router.push('/profileedit');
  };

  useEffect(() => {
    dispatch(profileAsync());
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="flex flex-col items-center text-white">
          {/* 프로필 상단 구역 */}

          <div className="flex flex-row justify-center w-[80%] mt-[2%] md:w-[50%]">
            {/* 프로필 이미지, 닉네임, 자기소개 구역 */}
            {/* 프로필 사진 */}
            <img
              className="w-[80px] h-[80px] rounded-full border-4 md:w-[250px] md:h-[250px]"
              src={profile_img_path}
              alt="profile_image"
            />
            {/* 닉네임, 자기소개 */}
            <div className="flex flex-col ml-4 pt-[2%] bg-red-400 md:ml-6 md:pt-[2%] w-[100%]">
              <h2 className="flex flex-row items-center text-xl text-white md:font-semibold md:text-5xl ">
                {nickname}
              </h2>
              <div className="mt-[10%] text-[5px] text-white bg-orange-600 break-normal break-words whitespace-pre-wrap md:text-lg md:mt-[4%] md:w-[500px] md:h-[150px] p-2">
                {introduce}
              </div>
              {/* 프로필 수정으로 이동 버튼*/}

              <button
                className="text-md w-12 h-6 mt-[10%] ml-[60%] bg-blue-600 hover:bg-blue-500 rounded-lg md:w-20 md:text-xl md:h-8 md:ml-[80%] md:mt-[4%]"
                onClick={gotoprofileEdit}>
                수정
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4 bg-green-600 justify-evenly md:flex md:flex-row ">
          {/* 즐겨듣는 아티스트 */}
          <div>
            <h2 className="text-lg font-semibold text-center md:text-2xl">
              베스트
            </h2>
            <div className="h-[200px] w-[200px] bg-red-400"></div>
          </div>
          {/* 스페이서 */}
          <div className="w-10 h-10 bg-purple-600"></div>
          {/* 팔로우 */}
          <div>
            <h2 className="text-lg font-semibold text-center md:text-2xl">
              팔로잉
            </h2>
            <div className="h-[200px]"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
