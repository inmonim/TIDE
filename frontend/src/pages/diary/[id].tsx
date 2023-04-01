import Link from 'next/link';
import {useRouter} from 'next/router';
import Seo from '@/components/Seo';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import axios from 'axios';

interface diaryInterFace {
  id: number;
  nickname: string;
  title: string;
  content: string;
  creatDt: Date;
  pub: string;
  like: number;
}

interface DiaryProps {
  diary: diaryInterFace;
}

export default function DiaryDetail({diary}: DiaryProps) {
  const router = useRouter();
  return (
    <>
      <Seo title={`Diary ${router.query.id}`} />

      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0">
            {' '}
            Diary {router.query.id}
          </h1>
        </div>
      </main>
    </>
  );
}
