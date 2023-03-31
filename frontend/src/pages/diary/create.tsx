import Link from 'next/link';
import Seo from '@/components/Seo';
import MusicModal from '@/components/Modal/MusicModal';
import React, {useState} from 'react';
import styles from '@/styles/Diary.module.scss';
import QuillWrapper from '@/components/Quill/QuillWrapper';


export default function DiaryCreate() {
  const [musicModalType,setMusicModalType] = useState<Number>(0);

  return (
    <>
      <Seo title="Write" />

      <div className={styles.diaryNav}>
        <Link href="/diary">
          <button>
            {' '}
            <p className="text-2xl ml-0.5">📝</p>{' '}
          </button>
        </Link>
      </div>

      <div className={`${musicModalType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setMusicModalType(0)}} >
      </div>
      <MusicModal type={musicModalType}/>
      
      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Write</h1>
        </div>
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
                <div className={`w-[50px] h-[50px] bg-white`}></div>
              </div>

              <div className={` rounded-lg ${styles.musicSelect}`} onClick={()=> musicModalType!==2? setMusicModalType(2) : setMusicModalType(0)}>
                <p> 추천 음악</p>
                <div className={`w-[50px] h-[50px] bg-white`}></div>
              </div>
            </div>
            <div
              className={` rounded-lg  overflow-hidden ${styles.musicSelect}`}>
              <div className={`w-[8rem] h-[8rem] bg-white `}></div>
              <p className={`md86:mt-5 text-xl`}>
                {' '}
                음악 제목음악 제목음악 제목음악 제목{' '}
              </p>
              <p> 아티스트 이름아티스트 이름아티스트 이름 </p>
            </div>
          </div>
        </div>
      </main>


    </>
  );
}
