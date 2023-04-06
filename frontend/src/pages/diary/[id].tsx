import {useRouter} from 'next/router';
import Seo from '@/components/Seo';
import parse from 'html-react-parser';
import {getCookie} from 'cookies-next';
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from 'store';
import {diaryDetailAsync} from 'store/api/features/diaryDetailSlice';
import React, {useEffect, useState} from 'react';
import {diaryDelAsync} from 'store/api/features/diaryDelSlice';
import Modal from '@/components/Modal';
import {v4 as uuidv4} from 'uuid';
import {diaryPublicUpdateAsync} from 'store/api/features/diaryPublicUpdateSlice';
import {getvideoId} from 'store/api/features/nowmusicSlice';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function DiaryDetail() {
  const router = useRouter();
  const id = Number(router.query.id);
  const dispatch = useAppDispatch();
  const myNick = getCookie('nickname');
  const publics = ['공개', '팔로워공개', '비공개'];
  // 다이어리 안에 내용물 데이터
  const {diary} = useAppSelector(state => {
    return state.diaryDetail;
  });

  // 다이어리 삭제 << 모달로 전달
  const deleteDiary = () => {
    setIsOpen(false);
    dispatch(diaryDelAsync(id));
    router.push('/profile');
  };
  // 모달 관련
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  // 공개 여부 변경 관련
  const onChangePublic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pub = event.target.value;
    const props = {id, pub};
    dispatch(diaryPublicUpdateAsync(props));
  };

  useEffect(() => {
    // 다이어리 만들기
    if (router.query.id) {
      dispatch(diaryDetailAsync(id));
    }
    // if(!isNaN(Number(router.query.id)) && diarys.find(e=>e.id===Number(router.query.id)))dispatch(diaryDetailAsync({id:Number(router.query.id)}))
  }, [router.query.id]);

  useEffect(() => {
    if (diary) {
      const musicUrl = diary.videoId;
      const albumImage = diary.albumImgPath;
      const musicTitle = diary.musicTitle;
      const artistName = diary.artist;
      console.log(artistName);
      dispatch(
        getvideoId({
          videoId: musicUrl,
          albumImgPath: albumImage,
          title: musicTitle,
          artist: artistName
        })
      );
    }
  }, [diary]);

  return (
    <>
      <Seo title={`Diary ${router.query.id}`} />
      <Modal
        isOpen={isOpen}
        deleteDiary={deleteDiary}
        closeModal={closeModal}
      />
      <main
        className={` flex-col items-center
      md:p-[4rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] lg12:h-screen lg12:pb-[240px] text-[#eeeeee] flex justify-center w-screen h-screen pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="w-full text-2xl font-bold break-words md:mx-4 md86:text-4xl md86:ml-0 md:hidden">
          <ArrowBackRoundedIcon
            className="mx-2 md:hidden hover:text-blue-300"
            fontSize="large"
            onClick={() => router.push('/mainpage')}
          />
          {diary.title}
        </div>
        <div className={`w-[70vw] select-none h-full`}>
          <div
            className={`flex flex-col md:w-full md:flex md:flex-row md:items-end `}>
            <div className="flex justify-between mt-2 md:w-full md:justify-between md:mt-4">
              <div className="hidden text-2xl font-bold break-words md:flex md:mx-4 md86:text-4xl md86:ml-0">
                <ArrowBackRoundedIcon
                  className="hidden mx-2 hover:text-blue-300 md:flex"
                  fontSize="large"
                  onClick={() => router.push('/mainpage')}
                />
                {diary.title}
              </div>
              <div onClick={() => {
                    router.push(`/user/${diary.nickname}`)
                  }} className="flex items-end text-lg cursor-pointer border-b-[0.1rem] hover:text-blue-300 md:w-fit md:hidden">
                {diary.nickname}
              </div>
              {myNick !== diary.nickname ? (
              <div onClick={() => {
                    router.push(`/user/${diary.nickname}`)
                  }} className="items-end hidden text-lg cursor-pointer md:border-b-[0.1rem] md:font-bold hover:text-blue-300 md:w-fit md:flex">
                {diary.nickname}
              </div>) : null}
              {myNick === diary.nickname ? (
                <div className="flex md:justify-end md:w-[20vw]">
                  <div onClick={() => {
                    router.push(`/user/${diary.nickname}`)
                  }} className="hidden text-lg cursor-pointer md:text-lg md:font-bold hover:text-blue-300 md:w-fit md:flex md:items-end md:mx-4 md:border-b-[0.1rem]">
                    {diary.nickname}
                  </div>
                  <select
                    // 키를 넣어주어야  defaultValue 값 반영됨
                    key={uuidv4()}
                    onChange={onChangePublic}
                    name="public"
                    defaultValue={diary.pub}
                    className={`border-[0.1rem] md:border-2 rounded-md bg-transparent text-sm md:text-base md:p-1 md:mx-1 outline-none focus:border-sky-600`}>
                    {publics.map((pubValue, index) => {
                      return (
                        <option
                          className={`bg-black`}
                          key={pubValue}
                          value={index}>{`${pubValue}`}</option>
                      );
                    })}
                  </select>
                  <button
                    type="button"
                    onClick={openModal}
                    className="mx-1 inline-flex justify-center min-w-[4.5rem] px-3 py-1 md:mx-4 text-sm md:items-center md:text-base text-white bg-red-900 border border-transparent rounded-md hover:bg-red-800 focus:outline-none">
                    {' '}
                    삭제{' '}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className={`w-full flex flex-col mt-6 `}>
            <div
              className={`w-full min-h-[25vh] max-h-[25vh] overflow-y-auto text-lg md86:text-xl md:p-4`}>
              {parse(diary.content)}
            </div>
            <div className="flex flex-col items-center w-full my-4 md:flex md:flex-row md:items-start">
              <div className="w-[40vw] h-fit md:w-48 md:h-fit overflow-hidden border-2 rounded-lg">
                <img
                  src={diary.albumImgPath}
                  className={`object-fill`}
                  alt="albumImage"
                />
              </div>
              <div className="flex flex-col md:ml-4">
                <div className="text-lg">{diary.musicTitle}</div>
                <div className="text-base">{diary.artist}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// export async function getStaticPaths() {

//   // const accessToken = getCookie('accessToken');
//   // const res = await axios({
//   //   method: 'get',
//   //   url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/public`,
//   //   headers: {
//   //     Authorization: `Bearer ${accessToken}`,
//   //   },
//   // });
//   // const diarys = await res.data;

//   const dispatch = useAppDispatch();
//   await dispatch(publicDiaryAsync()).unwrap();
//   const {diarys} = useAppSelector(state => {
//     return state.publicDiary;
//   });

//   const paths = diarys.map((diary:diaryInterFace) => ({ params: { id: diary.id} }));
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const id  = params?.id;
//   const dispatch = useAppDispatch();

//   try {
//     if(!isNaN(Number(id))) await dispatch(diaryDetailAsync({ id: Number(id)})).unwrap();
//     const {diary} = useAppSelector(state => {
//       return state.diaryDetail;
//     });
//     return {
//       props: {
//         diary
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return { notFound: true };
//   }
// };
