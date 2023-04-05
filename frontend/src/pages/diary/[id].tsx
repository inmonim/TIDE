import Link from 'next/link';
import {useRouter} from 'next/router';
import Seo from '@/components/Seo';
import parse from 'html-react-parser';
import {getCookie} from 'cookies-next';
// import { publicDiaryAsync } from 'store/api/features/publicDiarySlice';
import {useAppDispatch, useAppSelector} from 'store';
import {diaryDetailAsync} from 'store/api/features/diaryDetailSlice';
import {useEffect, useState} from 'react';
import { diaryDelAsync } from 'store/api/features/diaryDelSlice';
import Modal from '@/components/Modal';

export default function DiaryDetail() {
  const router = useRouter();
  const id = Number(router.query.id);
  const dispatch = useAppDispatch();
  // 다이어리 안에 내용물 데이터
  const {diary} = useAppSelector(state => {
    return state.diaryDetail;
  });
  const deleteDiary = () => {
    dispatch(diaryDelAsync(id));
    router.push('/profile');
  }
  // 모달 관련
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  
  useEffect(() => {
    // 다이어리 만들기
    if (router.query.id) {
      dispatch(diaryDetailAsync(id));
    }
    // if(!isNaN(Number(router.query.id)) && diarys.find(e=>e.id===Number(router.query.id)))dispatch(diaryDetailAsync({id:Number(router.query.id)}))
  }, [router.query.id]);

  return (
    <>
      <Seo title={`Diary ${router.query.id}`} />
      <Modal isOpen={isOpen} closeModal={closeModal}/>
      <main
        className={`
      p-[4rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex justify-center min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`w-2/3 select-none h-full`}>
          <div className={`flex items-end`}>
            <h1 className="text-4xl font-bold ml-[2rem] md86:ml-0">
              {' '}
              {diary.title}
            </h1>
            <div onClick={openModal} className='px-4 mx-2 bg-blue-600 rounded-lg cursor-pointer text-md hover:bg-blue-500'> 삭제 </div>
          </div>
          <div className={`w-full h-full flex justify-center mt-10 `}>
            <div
              className={`w-[90%] h-[60%] overflow-y-auto text-base md:text-xl`}>
              {parse(diary.content)}
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
