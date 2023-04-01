import Link from 'next/link';
import Seo from '@/components/Seo';
import React, {useState, useEffect, useRef} from 'react';
import { useAppDispatch,useAppSelector } from 'store';
import styles from '@/styles/Diary.module.scss';
import { publicDiaryAsync } from 'store/api/features/publicDiarySlice';

export default function Diary() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(publicDiaryAsync());
  }, []);

  const {diarys} = useAppSelector(state => {
    return state.publicDiary;
  });

  return (
    <>
      <Seo title="Diary" />

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900  select-none`}>

        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Diarys</h1>
        </div>


        <div className={styles.caroselDotDiv}></div>

        <h2 className="mt-6 text-2xl font-bold text-sky-400 "> 모든 일기장 </h2>
        <div className={styles.diarySection}>
          <div className={styles.diaryList}>
              {diarys && diarys.length >0 ? diarys.map((p, id) => (
                <Link href={`/diary/${id}`} className={` h-fit`}>
                    <div className={`flex bg-slate-700 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
                      {`${p.title}`}
                    <div>
                  </div>
                  </div>      
                </Link>
            )):
            <div className={`w-full bg-slate-900 bg-opacity-60 text-center h-full items-center flex flex-row justify-center `}>
              <p> 아직 작성된 일기가 없습니다. </p>
            </div>
        }  
          </div>
        </div>
      </main>
    </>
  );
}
