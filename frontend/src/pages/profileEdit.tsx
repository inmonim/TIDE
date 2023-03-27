import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {profileEditAsync} from 'store/api/features/profileEditSlice';
import {profileAsync} from 'store/api/features/profileSlice';


function ProfileEdit() {
  const dispatch = useAppDispatch();

  const {nickname, profile_img_path, introduce} = useAppSelector(state => {
    // console.log(state.profile, 333);
    return state.profile;
  }
  );

  const [newNickname, setNewNickname] = useState(nickname);
  const [newIntroduce, setNewIntroduce] = useState(introduce);
  const [newProfileImgPath, setNewProfileImgPath] = useState(profile_img_path);


  useEffect(() => {
    dispatch(profileAsync());
  }, []);

  const handleNicknameChange = (event: any ) => {
    setNewNickname(event.target.value);
  };

  const handleIntroduceChange = (event: any ) => {
    setNewIntroduce(event.target.value);
  };

  const handleProfileImgPathChange = (event: any ) => {
    setNewProfileImgPath(event.target.value);
  };


  return (
    <>
      <Head>
        <title>ProfileEdit</title>
        <meta name="description" content="ProfileEdit" />
      </Head>
    </>

  );
}



export default ProfileEdit;