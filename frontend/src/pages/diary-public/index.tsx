import Link from 'next/link';
import Seo from '@/components/Seo';
import React, {useState, useEffect, useRef} from 'react';
import { useAppDispatch,useAppSelector ,wrapper} from 'store';
import styles from '@/styles/Diary.module.scss';
import { publicDiaryAsync } from 'store/api/features/publicDiarySlice';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diary/public`,)
    const data = await res.json()
    console.log(res)
    return {
      props: {
        data,
      },
    };
}
  
export default function Diary(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {data} = props
  const diarys = data
  console.log(diarys)
  return (
    <>
      <Seo title="Diary"/>
      <main className={`p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900  select-none`}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Diarys</h1>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-sky-400 "> 모든 일기장 </h2>
        <div className={styles.diarySection}>
          <div className={`${styles.diaryList} overflow-auto scrollbar-hide pt-2 pb-2`}>
            {diarys && diarys.length >0 ? diarys.map((p: { title: string; nickname: string; createDt: string; like: number; id:number; }) => (
              <Link href={`/diary/${p.id}`} className={` h-fit`}>
                <div className={`grid gap-x-1 rounded-xl hover:bg-sky-600 hover:border-sky-500 duration-300`}>
                <div className={`flex overflow-hidden mb-1 bg-slate-900 rounded-md w-[100%] h-[100px] p-[3%] items-center gap-x-2 bg-opacity-80 hover:bg-sky-600 duration-300`}>
                    <div className={``}>
                    <p className={`text-lg whitespace-nowrap`}> {`${p.title}`}</p>
                    <p className={`text-sm whitespace-nowrap`}> {`${p.nickname}`}</p>
                    <p className={`text-sm whitespace-nowrap`}> {`${p.createDt}`}</p>
                    <p> 💕 {`${p.like}`}</p>
                    </div>
                  <div>
                </div>
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
