import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileEditAsync} from 'store/api/features/profileEditSlice';
import {profileAsync} from 'store/api/features/profileSlice';
import {profileImages} from '@/components/ProfileImages';
import Link from 'next/link';
import {useRouter} from 'next/router';

function ProfileEdit() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const returntoprofile = () => {
    router.push('/profile');
  };

  const {nickname, introduce, profile_img_path} = useAppSelector(
    state => state.profile
  );
  const [selectedImage, setSelectedImage] = useState(profile_img_path);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newIntroduce, setNewIntroduce] = useState(introduce);

  useEffect(() => {
    dispatch(profileAsync());
  }, []);

  const handleNicknameChange = (event: any) => {
    setNewNickname(event.target.value);
  };

  const handleIntroduceChange = (event: any) => {
    setNewIntroduce(event.target.value);
  };

  const handleProfileImageChange = (event: any) => {
    setSelectedImage(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // console.log(newNickname, newIntroduce, selectedImage);

    try {
      await dispatch(
        profileEditAsync({newNickname, newIntroduce, selectedImage})
      );
      dispatch(profileAsync());
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>ProfileEdit</title>
        <meta name="description" content="ProfileEdit" />
      </Head>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center text-white ">
          {/* 프로필 상단 구역 */}
          <div className="flex flex-row mt-[50px] ">
            {/* 프로필 이미지와 닉네임 구역 */}
            <div className="flex flex-col items-center ">
              <div className="flex flex-row flex-wrap items-center justify-center mb-12">
                {/* 프론트에 저장되있는 프로필 사진들 제공해주기*/}
                {profileImages.map(imageUrl => (
                  <div
                    key={imageUrl}
                    onClick={() => setSelectedImage(imageUrl)}
                    className={`w-[10%] mx-2 my-2 rounded-full ${
                      selectedImage === imageUrl
                        ? 'border-4 border-white-600'
                        : ''
                    }`}>
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </div>
                ))}
              </div>
              {/* 닉네임과 자기소게 수정하는 칸 */}
              <div className=" ml-[5%]">
                {/* 닉네임 */}
                <label>
                  <p className="my-2 text-2xl">닉네임</p>
                  <input
                    type="text"
                    value={newNickname}
                    placeholder={nickname}
                    onChange={handleNicknameChange}
                    className="flex flex-row items-center text-4xl font-semibold border-2 border-gray-600 text-black rounded-lg w-[400px] mb-4"></input>
                </label>
                {/* 자기소개 */}
                <label>
                  <p className="my-2 text-2xl">자기소개</p>
                  <textarea
                    className="text-2xl font-semibold text-black max-w-[600px] min-w-[400px] min-h-[200px] mb-4 border-2 border-gray-600 rounded-lg"
                    value={newIntroduce}
                    maxLength={80}
                    placeholder={introduce}
                    onChange={handleIntroduceChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-[15%] ml-[35%]">
            {/* 취소 버튼 */}
            <div
              className="flex items-center justify-center text-xl w-20 h-8 my-4 mx-[5%] bg-red-600 hover:bg-red-500 rounded-xl hover:cursor-pointer"
              onClick={returntoprofile}>
              취소
            </div>
            {/* 저장 버튼 */}
            <button
              type="submit"
              className="justify-center text-xl w-20 h-8 my-4 ml-[5%] bg-blue-600 hover:bg-blue-500 rounded-xl">
              저장
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default ProfileEdit;
