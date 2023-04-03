import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import { GetStaticPaths, GetStaticProps } from 'next';
import {getCookie} from 'cookies-next';
// import { publicDiaryAsync } from 'store/api/features/publicDiarySlice';
import {useAppDispatch, useAppSelector} from 'store';
import { diaryDetailAsync } from 'store/api/features/diaryDetailSlice';
import { FC, useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import { diaryListDelAsync } from 'store/api/features/diaryListDelSlice';
import { diaryListEditAsync } from 'store/api/features/diaryListEditSlice';
import { toast } from 'react-toastify';
import DiaryListModal from '@/components/Modal/DiaryListModal';
import { diaryListDelinitStatus } from 'store/api/features/diaryListDelSlice';

interface diaryInterFace {
  id:number,
  nickname: string;
  title: string,
  content: string,
  creatDt: string,
  pub:string,
  like:number
}

export type DiaryListProps = {
  id:number,
  userId: number;
  diaryListTitle: string,
  isPublic:string
};

const DiaryListDetail: FC<DiaryListProps> = () => {
  const router = useRouter();
  console.log(router.query)
  const dispatch = useAppDispatch();

  const [diaryListId, setDiaryListId] = useState<Number>(Number(router.query.id));

  useEffect(()=>{
    setDiaryListId(Number(router.query.id))
    // console.log(diaryListId)
  },[router.query])
  
  const {status} = useAppSelector(state => {
    return state.diaryListDel;
  });

  const DiaryListDel = () => {
    console.log(diaryListId)
    if (!isNaN(Number(diaryListId)))
    dispatch(diaryListDelAsync({diaryListId:diaryListId}))
  };


  const [DiaryListType, setDiaryListType] = useState<Number>(0);
  const getModalType = (type:Number) => {
    setDiaryListType(type)
  }
  useEffect(()=>{
    switch (status) {
      case 'completed':
        toast.success('일기장 모음 삭제 성공');
        router.push({
          pathname: `/diary`
        });
        break;
      case 'failed':
        toast.error('일기장 모음 삭제 실패');
        break;
      }
    dispatch(diaryListDelinitStatus())
  },[status])

  return (
    <>
      <Seo title={`Diary List ${router.query.id}`} />

      <div className={`${DiaryListType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setDiaryListType(0)}} >
      </div>
      <DiaryListModal type={DiaryListType} getModalType={getModalType} diaryListId={Number(diaryListId)}/>

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%] flex justify-between items-center`}>
          
          <div className={``}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> {router.query.diaryListTitle} </h1>
          <p className={'ml-[2rem] md86:ml-0 text-lg'}> {router.query.userId} </p>
          </div>
 
          <div className={``}>
          <button className={`border pl-1 pr-1 rounded-lg bg-slate-700 hover:bg-slate-400 duration-200 mr-3`}
          onClick={()=>setDiaryListType(2)}
          > 수정 </button>
          <button 
          onClick={DiaryListDel}
          className={`border pl-1 pr-1 rounded-lg bg-slate-700 hover:bg-slate-400 duration-200`}> 삭제 </button>
          </div>

        </div>
        <div className={`w-full h-[60%] mt-10 select-none`}>
          {/* {diarys.find(e=>e.id===Number(router.query.id))?diary.nickname:<p>해당하는 일기가 없습니다.</p>} */}
        </div>
      </main>
    </>
  );
}

export default DiaryListDetail;