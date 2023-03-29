import Link from 'next/link';
import Seo from '@/components/Seo';
import styles from '@/styles/Diary.module.scss';
import { useEffect, useState } from 'react';


interface playlists {
  id: number;
  title: string;
  image: string;
}

interface Props {
  playlists: playlists[];
}


export default function Playlist() {

  const [playlists, setPlaylists] = useState<playlists[]>([]);


  useEffect(()=>{
    setPlaylists(
      [
        {id:1, title:'hi',image:`https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`} ,
        {id:2, title:'hello',image:`https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`} ,
        {id:3, title:'커즈아이',image:`https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`} ,
        {id:3, title:'롸익보이이이이이',image:`https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj`} ,

      ]
      )
  },[]);
  
  return(
    <>
    <Seo title="Playlist" />

    <div className={` text-center fixed bottom-[7rem] right-[1rem] w-[4rem] h-[4rem] rounded-[2rem] p-[1rem] duration-[0.2s] z-[3] bg-gradient-to-t from-cyan-300 to-blue-400 hover:from-cyan-100 hover:to-blue-300 transition-colors ${styles.diaryNav}`}>
        <Link href="/mainpage">
          <button>
            {' '}
            <p className="text-4xl text-[#eeeeee] leading-[0.8]"> + </p>{' '}
          </button>
        </Link>
      </div>

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%] ${styles.description}`}>
          <h1 className="text-5xl font-bold"> Playlist</h1>
        </div>

          {/* playlists */}
          <div className="flex flex-col justify-center mt-6 text-white">
            <h2 className="mb-4 text-2xl font-semibold">All</h2>
            <div className={`flex md:justify-between gap-2 flex-wrap justify-center`}>
            
            
            {/* 플리 한묶음 */}
            <Link href={`/playlist/${1}`}>
              <div className={`max-w-[calc(12.25rem)] justify-center text-center ${styles.btn}`}>
              <div className="max-w-[calc(12.25rem)] max-h-[calc(12.25rem)] grid grid-cols-2 gap-1 items-center bg-black rounded-lg overflow-hidden border border-black">
              {playlists.map((pl,id) => (
                  <div className="flex flex-col items-center" key={id}>
                  <img
                    className="w-24 h-24  drop-shadow-2xl min-w-[6rem]"
                    src={pl.image}
                    alt="Playlist 1"
                  />
                </div>
              ))}
              </div>

              <p className="flex-wrap mt-2 text-xl drop-shadow-2xl whitespace-nowrap"> Playlist1 </p>
              </div>
            </Link>


            </div>
          </div>
      </main>

    </>
  );

};