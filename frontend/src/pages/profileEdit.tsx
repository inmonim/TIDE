import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileEditAsync} from 'store/api/features/profileEditSlice';
import {profileAsync} from 'store/api/features/profileSlice';
import {profileImages} from '@/components/ProfileImages';
import Link from 'next/link';

function ProfileEdit() {
  const dispatch = useAppDispatch();

  const {nickname, introduce} = useAppSelector(state => state.profile);
  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(newNickname, newIntroduce);

    try {
      await dispatch(profileEditAsync({newNickname, newIntroduce}));
      dispatch(profileAsync());
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
          className="flex flex-col items-center text-white bg-green-600">
          {/* 프로필 상단 구역 */}
          <div className=" flex mt-[50px] bg-red-400">
            {/* 프로필 이미지와 닉네임 구역 */}
            <div className="flex flex-col items-center bg-purple-400">
              <div className="">
                {profileImages.map(imageUrl => (
                  <button
                    key={imageUrl}
                    onClick={() => setSelectedImage(imageUrl)}
                    className={`w-[200px] ${
                      selectedImage === imageUrl ? 'selected' : ''
                    }`}>
                    <img src={imageUrl} alt="Profile" />
                  </button>
                ))}
              </div>
              <div className="bg-blue-400 ml-[5%] ">
                <label>
                  <p>Nickname:</p>
                  <input
                    type="text"
                    value={newNickname}
                    placeholder={nickname}
                    onChange={handleNicknameChange}
                    className="flex flex-row items-center text-4xl font-semibold text-black rounded-sm w-[400px] mb-4"></input>
                </label>
                <label>
                  <p>Introduce:</p>
                  <input
                    className="text-xl text-black rounded-sm"
                    type="text"
                    value={newIntroduce}
                    placeholder={introduce}
                    onChange={handleIntroduceChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="justify-center text-xl w-20 h-8 my-10 ml-[35%] bg-red-400 rounded-xl">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

export default ProfileEdit;
