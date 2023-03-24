import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileAsync} from 'store/api/features/profileSlice';
import Image from 'next/image';

function Profile() {
  const dispatch = useAppDispatch();

  const {nickname, profileImage, profileBGImage, introduction} = useAppSelector(
    state => state.profile
  );

  useEffect(() => {
    dispatch(profileAsync());
    console.log(nickname);
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Head>
      <div className="bg-gradient-to-t from-[#020217] to-[#000066] ml-[230px] min-h-[97vh]">
        <div className="flex flex-col text-white">
          {/* 프로필 배경사진 구역 */}
          <div
            className="h-[450px] bg-cover bg-center bg-no-repeat opacity-80"
            style={{
              backgroundImage: `url(${profileBGImage})`
            }}>
            <div className="w-[300px] h-[300px] mx-auto rounded-full border-solid border-white"></div>
            <Image
              className=""
              src={profileImage}
              alt=""
              width={100}
              height={100}
            />
            <div className="mx-auto mt-[50px] text-center">
              <h2 className="text-xl ml-[500px] text-white">{nickname}</h2>
              <p className="text-white">{introduction}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
