import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import Image from 'next/image';
import Link from 'next/link';

function Profile() {
  const dispatch = useAppDispatch();

  const {nickname, profile_img_path, introduce} = useAppSelector(state => {
    // console.log(state.profile, 333);
    return state.profile;
  });

  useEffect(() => {
    dispatch(profileAsync());
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <div className="bg-gradient-to-t from-[#020217] to-[#000066] ml-[230px] min-h-[97vh]">
        <div className="flex flex-col text-white bg-green-600">
          {/* 프로필 상단 구역 */}
          <div className=" flex ml-[25%] mt-[50px] bg-red-400">
            {/* 프로필 이미지와 닉네임 구역 */}
            <div className="flex flex-row bg-purple-400">
              <img
                className="w-[250px] h-[250px] rounded-full"
                src={profile_img_path}
                alt="profile_image"
              />
              {/* <Image className="" src={profileImage} alt="" /> */}
              <h2 className="flex flex-row items-center text-3xl font-semibold text-white  pl-[5%]">
                {nickname}
              </h2>
            </div>

            <p className="text-white">{introduce}</p>
          </div>
        </div>
        <button className="justify-center text-xl w-20 h-8 my-10 ml-[35%] bg-red-400 rounded-xl">
          <Link href="/profileedit">수정</Link>
        </button>
      </div>
    </>
  );
}

export default Profile;
