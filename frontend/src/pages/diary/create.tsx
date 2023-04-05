import Link from 'next/link';
import Seo from '@/components/Seo';
import MusicModal from '@/components/Modal/MusicModal';
import React, {useRef, useState} from 'react';
import styles from '@/styles/Diary.module.scss';
import QuillWrapper from '@/components/Quill/QuillWrapper';
import { recomMusicAsync, setSong } from 'store/api/features/recomMusicSlice';
import {useAppDispatch, useAppSelector} from 'store';
import { diaryCreateAsync, diaryCreateinitStatus } from 'store/api/features/diaryCreateSlice';
import Image from 'next/image';
import Search from 'public/buttons/Search.png'
import recom from 'public/icons/networking.png'
import { useRouter } from 'next/router';
import { diaryMineAsync } from 'store/api/features/diaryMineSlice';

export default function DiaryCreate() {
  const router = useRouter();
  const [musicModalType,setMusicModalType] = useState<Number>(0);
  const dispatch = useAppDispatch();

  const getMusic = (content:string) =>{
    dispatch(recomMusicAsync({content:content}))
  }

  const {status,
    selectSong
  } = useAppSelector(state => {
    return state.recomMusic;
  });

  const {
    HTMLcontent
  } = useAppSelector(state => {
    return state.diaryContent;
  });


  const getModalType = (type:Number)=>{
    setMusicModalType(type)
  }

  const diaryTitleRef = useRef<HTMLInputElement>(null);
  // const [diaryTitle, setDiaryTitle] = useState<string>('');
  const [diaryPub, setDiaryPub] = useState<string>('0');

  const onDiaryCreate = () =>{
    if(selectSong && HTMLcontent && diaryTitleRef.current?.value!=='')
    {
      console.log('셋송송아이디' , selectSong.songId)
      dispatch(diaryCreateAsync(
        {
          title: String(diaryTitleRef.current?.value), 
          content: HTMLcontent, 
          pub: diaryPub, 
          songId: selectSong.songId,
        }
      ))
    }
    // console.log(selectSong && HTMLcontent && diaryTitleRef.current?.value!=='')
    // console.log(diaryTitleRef.current?.value, HTMLcontent,diaryPub,selectSong?.songId)
    dispatch(setSong(undefined))
    dispatch(diaryMineAsync());
    router.push({
      pathname: `/diary`,
    });
  }

  return (
    <>
      <Seo title="Write" />

      <div className={styles.diaryNav}>
         <button onClick={onDiaryCreate}>
            {' '}
            <p className="text-2xl ml-0.5">📑</p>{' '}
          </button>
      </div>

      <div className={`${musicModalType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setMusicModalType(0)}} >
      </div>
      <MusicModal type={musicModalType} getModalType={getModalType}/>
      
      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Write</h1>
        </div>
          
          <form className={`mt-5 w-ful`}>
            <label className='flex'>
              <p className={`mr-2 text-lg whitespace-nowrap`}> 일기 제목</p>
              <input 
              ref={diaryTitleRef}
              type="text" className={`rounded-lg w-full min-w-[180px] text-black`}/>
            </label>
          </form>

        <div className={`${styles.writeDiv} mb-[240px] mt-7 pb-[100px]`}>
          {/* 글 작성 영역 */}
          <div
            className={`flex flex-row items-center justify-center w-[100%]  min-w-[260px] min-h-[250px] mb-[50px] mb86:mb-0`}>
            {/* 글 에디터 영역 */}
            <div className={`w-full grid grid-cols-1 h-[100%]`}>
              <QuillWrapper/>
            </div>
          </div>

          {/* 음악 바인딩 영역 */}
          <div
            className={`grid grid-cols-2 justify-items-center mt-[20px] md86:mt-0 ${styles.musicBindDiv}`}>
            <div
              className={`w-full h-full grid gap-2 items-center md86:border-b-2 md86:pb-3 md86:mb-4`}>
              <div className={`rounded-lg ${styles.musicSelect}`} onClick={()=> musicModalType!==1? setMusicModalType(1) : setMusicModalType(0)}>
                <p> 음악 찾기</p>
                <Image className={`w-[30px] h-[30px]`} src={Search} alt="Search"/>
              </div>

              <div className={` rounded-lg ${styles.musicSelect}`} onClick={()=> musicModalType!==2? setMusicModalType(2) : setMusicModalType(0)}>
                <p> 추천 음악</p>
                <Image className={`w-[40px] h-[40px]`} src={recom} alt="recom"/>
              </div>
            </div>
            <div
              onClick={()=>{dispatch(setSong(undefined))}}
              className={` rounded-lg  overflow-hidden ${styles.musicSelect}`}>
              {selectSong?
               <img className={`w-[8rem] h-[8rem] bg-white `}
              src={selectSong?.albumImgPath}
              ></img> :null}
              
              <p className={`md86:mt-5 text-xl`}>
                {' '}
                {selectSong?.title}{' '}
              </p>
              <p> {selectSong?selectSong.artist: `음악을 선택해주세요.`} </p>
            </div>
          </div>
        </div>
      </main>


    </>
  );
}
