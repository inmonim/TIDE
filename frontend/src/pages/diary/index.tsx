import Link from 'next/link';
import Seo from '@/components/Seo';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import styles from '@/styles/Diary.module.scss';
import { diaryMineAsync } from 'store/api/features/diaryMineSlice';
import { diaryListMineAsync } from 'store/api/features/diaryListMineSlice';
import {useAppDispatch, useAppSelector} from 'store'; 
import DiaryListModal from '@/components/Modal/DiaryListModal'
import { query } from 'express';

interface diaryInterFace {
  id:number;
  nickname: string;
  title: string;
  content: string;
  createDt: string;
  pub:string;
  like:number;
  albumImgPath:string;
  artist:string[];
  musicTitle: string;
  songId:number;
}


export default function Diary() {

  const [DiaryListType, setDiaryListType] = useState<Number>(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(diaryMineAsync());
    dispatch(diaryListMineAsync());
    handleResize();
  }, []);
  const {diarys} = useAppSelector(state => {
    return state.diaryMine;
  });


  const {diarylists} = useAppSelector(state => {
    return state.diaryListMine;
  });

  const monthRef = useRef<HTMLInputElement>(null)
  const [mdiarys, setMdiarys] = useState<diaryInterFace[]>(diarys)

  useEffect(()=>{
    if(monthRef.current?.value !== '')
    {
      setMdiarys(diarys.filter((d)=>d.createDt.includes(String(monthRef.current?.value))))
      console.log(mdiarys,monthRef.current?.value )
    }
    else {
      setMdiarys(diarys) 
    }
  },[monthRef.current,diarys])


  // 윈도우 사이즈 CSR로 체크
  interface WindowSize {
    width: number | undefined;
    height: number | undefined;
  }

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  });

  const [prevWidth, setPrevWidth] = useState<number | undefined>(undefined);

  // 일기장 div 선택자. transfrom: tranlateY(-400~) 으로 캐러셀 수동 이동
  const caroselDivRef = useRef<HTMLDivElement>(null);
  // 일기장 캐러셀 현재 넘버
  const caroselPage = useRef<number>(1);
  // 일기장 전체 길이
  const [diaryMax, setDiaryMax] = useState<number | undefined>(mdiarys.length);
  let [diaryCur, setDiaryCur] = useState<number | undefined>(1);

  function handleResize() {
    setPrevWidth(windowSize.width);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    if (windowSize.width && windowSize.width <= 1600) {
      setDiaryMax(mdiarys.length);
      caroselPage.current = diaryCur ? diaryCur : 1;
      setDiaryCur(caroselPage.current);
    } else {
      setDiaryMax(Math.ceil(mdiarys.length / 2));
      caroselPage.current = diaryCur ? Math.ceil(diaryCur / 2) : 1;
      setDiaryCur(2 * (caroselPage.current - 1) + 1);
    }

    if (caroselDivRef.current) {
      if (windowSize.width && windowSize.width <= 860) {
        caroselDivRef.current.style.transform = `translateY(-${
          501 * (caroselPage.current - 1)
        }px)`;
      } else {
        caroselDivRef.current.style.transform = `translateY(-${
          418 * (caroselPage.current - 1)
        }px)`;
      }
    }
  }

  useEffect(() => {
    if(mdiarys.length>0){
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [windowSize.width, diaryMax, diaryCur]);

  // 캐러셀 이전버튼
  const handleCaroselPrev = () => {
    if (caroselPage.current > 1) {
      caroselPage.current -= 1;
      if (windowSize.width && windowSize.width <= 1600) {
        if (diaryCur) setDiaryCur(diaryCur - 1);
      } else {
        if (diaryCur) setDiaryCur(diaryCur - 2);
      }

      if (caroselDivRef.current) {
        if (windowSize.width && windowSize.width <= 860) {
          caroselDivRef.current.style.transform = `translateY(-${
            501 * (caroselPage.current - 1)
          }px)`;
        } else {
          caroselDivRef.current.style.transform = `translateY(-${
            418 * (caroselPage.current - 1)
          }px)`;
        }
      }
      // console.log(caroselPage.current);
    }
  };

  // 캐러셀 다음버튼
  const handleCaroselNext = () => {
    if (diaryMax && caroselPage.current < diaryMax) {
      caroselPage.current += 1;
      if (windowSize.width && windowSize.width <= 1600) {
        if (diaryCur) setDiaryCur(diaryCur + 1);
        setDiaryMax(diarys.length);
      } else {
        if (diaryCur) setDiaryCur(diaryCur + 2);
        setDiaryMax(Math.ceil(diarys.length / 2));
      }
      if (caroselDivRef.current) {
        if (windowSize.width && windowSize.width <= 860) {
          caroselDivRef.current.style.transform = `translateY(-${
            501 * (caroselPage.current - 1)
          }px)`;
        } else {
          caroselDivRef.current.style.transform = `translateY(-${
            418 * (caroselPage.current - 1)
          }px)`;
        }
      }
    }
    // console.log(caroselPage.current);
  };

  const getModalType = (type:Number) => {
    setDiaryListType(type)
  }

  useEffect(()=>{
    setDiaryMax(mdiarys.length);
    caroselPage.current = 1;
    setDiaryCur(caroselPage.current);


    // if (windowSize.width && windowSize.width <= 1600) {
    //   if (diaryCur) setDiaryCur(diaryCur + 1);
    //   setDiaryMax(mdiarys.length);
    // } else {
    //   if (diaryCur) setDiaryCur(diaryCur + 2);
    //   setDiaryMax(Math.ceil(mdiarys.length / 2));
    // }

    // handleResize();
    if (caroselDivRef.current && mdiarys.length===0) {
      if (windowSize.width && windowSize.width <= 860) {
        caroselDivRef.current.style.transform = `translateY(-${
          0
        }px)`;
      } else {
        caroselDivRef.current.style.transform = `translateY(-${
          418 * (caroselPage.current - 1)
        }px)`;
      }
    }
    // console.log(mdiarys,monthRef.current?.value);
  },[mdiarys])

  // useEffect(()=>{
  //   let today = new Date();
  //   let year = today.getFullYear();
  //   let month = ('0' + (today.getMonth() + 1)).slice(-2);
  //   let dateString = year + '-' + month;
  //   if(monthRef.current) monthRef.current.value = dateString;
  //   setMdiarys(diarys.filter((d)=>d.createDt.includes(String(monthRef.current?.value))))
  // },[monthRef.current])


  
  // useEffect(()=>{
  //   let today = new Date();
  //   let year = today.getFullYear();
  //   let month = ('0' + (today.getMonth() + 1)).slice(-2);
  //   let dateString = year + '-' + month;
  //   if(monthRef.current) monthRef.current.value = dateString;
  //   setMdiarys(diarys.filter((d)=>d.createDt.includes(String(monthRef.current?.value))))
  //   console.log('그래해라해라')
  // },[])



  return (
    <>
      <Seo title="Diary" />

      <div className={styles.diaryNav}>
        <Link href="/diary/create">
          <button>
            <p className="text-2xl ml-0.5">📝</p>{' '}
          </button>
        </Link>
      </div>


      <div className={`${DiaryListType===0?'w-0 h-0':'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'}`} onClick={()=>{setDiaryListType(0)}} >
      </div>
      <DiaryListModal type={DiaryListType} getModalType={getModalType} diaryListId={undefined} title={undefined}/>

      <main className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>

        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Diary</h1>
        </div>

        <div className={styles.diarySectionTitle}>
          <h2 className="text-2xl font-bold text-sky-400 whitespace-nowrap"> 일기장 </h2>
          <input type="month" 
          ref={monthRef} 
          // onClick={()=>console.log("2023-04-05".includes(String(monthRef.current?.value)))}
          onChange={()=>{
            setMdiarys(diarys.filter((d)=>d.createDt.includes(String(monthRef.current?.value))))
          }}
          ></input>
        </div>

        <div className={styles.btDiv}>
          <button className={styles.btleft} onClick={handleCaroselPrev}>
            {' '}
            ◀{' '}
          </button>
          <button className={styles.btright} onClick={handleCaroselNext}>
            {' '}
            ▶{' '}
          </button>
        </div>
        <div className={styles.diarySection}>
          <div className={`${styles.caroselWrapper} ${(mdiarys&&mdiarys.length>1)?`grid-cols-2 md86:mt-4`:`grid-cols-1`}`} ref={caroselDivRef}>
            {mdiarys && mdiarys.length >0 ? mdiarys.map((diary, id) => (
              <Link href={`/diary/${diary.id}`}>
              <div className={styles.caroselItem} key={diary.id}>
                <div className={`${styles.caroselDiary} min-w-[230px] max-w-[230px] p-[24px]`}>
                  <h3 className="text-2xl font-bold">
                    {diary.title}
                  </h3>
                  <p> {diary.createDt}</p>
                  <p> {diary.nickname}</p>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: diary.content }} />
                </div>
                <div className={`${styles.caroselMusic} min-w-[230px] max-w-[230px] min-h-[380px]`}>
                  <div 
                  style={{
                    background: `url(${diary.albumImgPath})`,
                    backgroundSize: `contain`
                  }}
                  className={`bg-[url('https://image.bugsm.co.kr/album/images/130/40780/4078016.jpg')] bg-no-repeat bg-cover animate-[spin_5s_linear_infinite] pause hover:running ${styles.cdBG}`}>
                  </div>
                  <div>
                  <h3 className="text-2xl font-bold"> {diary.musicTitle}</h3>
                  <p> {diary.artist}</p>
                  </div>
{/* 
                  <div className={styles.musicBar}></div>

                  <div className={styles.musicUIBar}></div> */}
                </div>
              </div>
              </Link>
            )):<div className={`w-full h-full bg-black flex items-center justify-center bg-opacity-30`}><p> 작성된 일기가 없습니다.</p></div>}
          </div>
        </div>

        <div className={styles.caroselDotDiv}></div>

        {/* <div className={`flex justify-between items-center mt-6`}>
        <h2 className="text-2xl font-bold text-sky-400 whitespace-nowrap "> 일기장 모음 </h2>
        <button 
        onClick={()=> setDiaryListType(1)}
        className={`border rounded-[50%] w-[25px] h-[25px] justify-center text-center items-center bg-slate-700 hover:bg-slate-500 duration-200`}> 
        <p className={`text-lg font-bold p-0`}> + </p> 
        </button>
        </div>
        <div className={styles.diarySection}>
          <div className={`grid ${(diarylists&&diarylists.length>1)?`lg:grid-cols-6 md:grid-cols-4 grid-cols-2`:`grid-cols-1`} p-2 gap-2`}>
            {diarylists && diarylists.length >0 ?diarylists.map((diaryList,id)=>(
              <Link 
              href={{
                pathname: `/diary/list/${diaryList.id}`,
                query: {
                  diaryListTitle: diaryList.diaryListTitle,
                  userId:diaryList.userId,
                  isPublic:diaryList.isPublic
                },
              }}
              as={`/diary/list/${diaryList.id}`}
              >
              <div className={`h-[calc(10vw+40px)] p-2 flex items-center border rounded-xl justify-center flex-col overflow-hidden
               bg-blue-900 hover:bg-blue-500 bg-opacity-70 duration-200 select-none
              `}>
                <p>{diaryList.id}</p>
                <p className={`whitespace-nowrap`}>{diaryList.diaryListTitle}</p>
              </div>
              </Link>
            )):
            <div className={`w-full h-full min-h-[300px] bg-black flex items-center justify-center bg-opacity-30`}>
              <p> 작성된 일기장 모음이 없습니다.</p>
            </div>
            }
            </div>
        </div> */}


      </main>
    </>
  );
}
