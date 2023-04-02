import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import { GetStaticPaths, GetStaticProps } from 'next';
import {getCookie} from 'cookies-next';
// import { publicDiaryAsync } from 'store/api/features/publicDiarySlice';
import {useAppDispatch, useAppSelector} from 'store';
import { diaryDetailAsync } from 'store/api/features/diaryDetailSlice';
import { useEffect } from 'react';

interface diaryInterFace {
  id:number,
  nickname: string;
  title: string,
  content: string,
  creatDt: string,
  pub:string,
  like:number
}


export default function DiaryDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {diarys} = useAppSelector(state => {
    return state.publicDiary;
  });

  useEffect(() => {
    // if(!isNaN(Number(router.query.id))) dispatch(diaryDetailAsync({id:Number(router.query.id)}))
    if(!isNaN(Number(router.query.id)) && diarys.find(e=>e.id===Number(router.query.id)))dispatch(diaryDetailAsync({id:Number(router.query.id)}))
  }, [router.query]);

  const {diary} = useAppSelector(state => {
    return state.diaryDetail;
  });
  return (
    <>
      <Seo title={`Diary ${router.query.id}`} />

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Diary {router.query.id}</h1>
        </div>
        <div className={`w-full h-[60%] mt-10 select-none`}>
          {diarys.find(e=>e.id===Number(router.query.id))?diary.nickname:<p>해당하는 일기가 없습니다.</p>}
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
