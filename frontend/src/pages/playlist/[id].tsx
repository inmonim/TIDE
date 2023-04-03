import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import { useAppDispatch, useAppSelector } from 'store';
import { playListDetailAsync } from 'store/api/features/playListDetailSlice';
import { useEffect, useState } from 'react';


export default function DiaryDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [playListId, setplayListId] = useState<Number>(Number(router.query.id));

  useEffect(()=>{
    if (playListId === Number(router.query.id))
      dispatch(playListDetailAsync({playListId:Number(playListId)}))
  },[playListId]);

  return (
    <>
      <Seo title={`Playlist ${router.query.id}`} />

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Playlist {router.query.id}</h1>
        </div>
      </main>
    </>
  );
}
