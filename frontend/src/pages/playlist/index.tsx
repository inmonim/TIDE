import Link from 'next/link';
import Seo from '@/components/Seo';
import styles from '@/styles/Diary.module.scss';
import { useEffect, useState } from 'react';
import PlayListModal from '@/components/Modal/PlayListModal';
import { useAppDispatch, useAppSelector } from 'store';
import { playListMineAsync } from 'store/api/features/playListMineSlice';


interface playListInterface {
  id:number,
  playlistTitle: string,
  likeCnt: number
  isPublic:string,
}

export default function Playlist() {

  const [playlistType, setPlaylistType] = useState<Number>(0);

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(playListMineAsync());
  },[]);
  
  const {myplaylist} = useAppSelector(state => {
    return state.playListMine;
  });

  const getModalType = (type:Number) =>{
    setPlaylistType(type)
  }
  
  return(
    <>
    <Seo title="Playlist" />

    <div 
    onClick={()=>setPlaylistType(1)}
    className={` text-center fixed bottom-[7rem] right-[1rem] w-[4rem] h-[4rem] rounded-[2rem] p-[1rem] duration-[0.2s] z-[3] bg-gradient-to-t from-cyan-300 to-blue-400 hover:from-cyan-100 hover:to-blue-300 transition-colors ${styles.diaryNav}`}>
          <button>
            <p className="text-4xl text-[#eeeeee] leading-[0.8] pt-1"> + </p>{' '}
          </button>
      </div>

      <div className={`${playlistType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setPlaylistType(0)}} >
      </div>
      <PlayListModal type={playlistType} getModalType={getModalType} playListId={undefined}/>


      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%] ${styles.description} flex justify-between`}>
          <h1 className="text-5xl font-bold"> Playlist</h1>
        </div>

          {/* playlists */}
          <div className="flex flex-col justify-center mt-6 text-white">
            <h2 className="mb-4 text-2xl font-semibold">All</h2>
            <div className={`flex md:justify-start gap-2 flex-wrap justify-center`}>
            
            
            {/* 플리 한묶음 */}
            {myplaylist.map((pl,id) => (
            <Link href={`/playlist/${id}`}>

              <div className={`max-w-[calc(12.25rem)] justify-center text-center ${styles.btn}`}>
              <div className="p-2 min-w-[calc(12.25rem)] min-h-[calc(12.25rem)] grid gap-1 items-center bg-black bg-opacity-60 rounded-lg overflow-hidden border border-black">
                <div className="flex flex-col items-center" key={id}>
                {/* <img
                  className="w-24 h-24  drop-shadow-2xl min-w-[6rem]"
                  src={pl.image}
                  alt="Playlist 1"
                /> */}
               <p className="flex-wrap mt-2 text-xl drop-shadow-2xl whitespace-nowrap"> {pl.playlistTitle} </p>
               <p className="flex-wrap mt-2 text-xl drop-shadow-2xl whitespace-nowrap"> 💕{pl.likeCnt} </p>
                </div>
              </div>
              </div>
                </Link>
            ))}


            </div>
          </div>
      </main>

    </>
  );

};