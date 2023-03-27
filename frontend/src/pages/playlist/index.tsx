import Link from 'next/link';
import Seo from '@/components/Seo';
import styles from '@/styles/Diary.module.scss';

export default function Playlist() {

  return(
    <>
    <Seo title="Playlist" />

    <div className={` text-center fixed bottom-[7rem] right-[1rem] w-[4rem] h-[4rem] rounded-[2rem] p-[1rem] duration-[0.2s] z-[3] bg-gradient-to-t from-cyan-300 to-blue-400 hover:from-cyan-100 hover:to-blue-300 transition-colors`}>
        <Link href="/diary/create">
          <button>
            {' '}
            <p className="text-4xl text-[#eeeeee] leading-[0.8]"> + </p>{' '}
          </button>
        </Link>
      </div>

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Playlist</h1>
        </div>
      </main>

    </>
  );

};