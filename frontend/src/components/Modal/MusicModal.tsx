import { stat } from 'fs';
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import { initContent, setContent } from 'store/api/features/diaryContentSlice';
import { recomMusicAsync, recominitStatus, setSong } from 'store/api/features/recomMusicSlice';

export type MusicModalProps = {
  type:Number
  getModalType:Function
};

interface song{
  albumImgPath: string,
  albumTitle: string,
  artist: string[],
  songId:Number,
  title: string
}

const MusicModal: FC<MusicModalProps> = props => {
  const {type, getModalType} = props;
  const dispatch = useAppDispatch();
  const {content} = useAppSelector(state => {
    return state.diaryContent;
  });

  useEffect(()=>{
    if(type===2)
    {
      dispatch(recomMusicAsync({content:content}))
    }
  },[type])

  const {status,
    songModel1CosineTop,
    songModel1T3Top,
    songModel2CosineTop,
    songModel2T3Top
  } = useAppSelector(state => {
    return state.recomMusic;
  });

  const [recStatus, setrecStatus] = useState<string>(status)
  const [song1, setsong1] = useState<song>();
  const [song2, setsong2] = useState<song>();
  const [song3, setsong3] = useState<song>();
  const [song4, setsong4] = useState<song>();

  useEffect(()=>{
    // setrecStatus(status)
    if(status==='completed')
    {    
      setsong1(songModel1CosineTop)
      setsong2(songModel1T3Top)
      setsong3(songModel2CosineTop)
      setsong4(songModel2T3Top)
    }
    // console.log('get' ,status, songModel1CosineTop,songModel1T3Top,songModel2CosineTop,songModel2T3Top)
    // console.log('re',recStatus, song1,song2,song3,song4)
  },[status])

  const onSetSong = (song:song) => {
      dispatch(setSong(song));
      console.log(song)
      getModalType(0);
  };
  
  return(
    <>
    {type===0? null:
    type===1?null:
    <>
    <div className={`left-[22%] right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}> 
      <p className={`text-xl font-bold`}> {type===1?'전체 ':'추천 '}음악 목록</p>

      {status==='completed'?
      <div className={`overflow-auto scrollbar-hide`}>
      {/* 추천1 */}
      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song1?.albumImgPath}></img>
        <div>
          <p className={`text-xl`}> {song1?.title}</p>
          <p> album.{song1?.albumTitle} </p>
          <p> {song1?.artist}</p>

          <div className={`flex justify-between w-full`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 듣기 </button>
            <button 
            onClick={()=> song1?onSetSong(song1):null}
            className={`border rounded-lg bg-slate-500 p-1 w-12`}> 선택 </button>
          </div>
        </div>
      </div>

      {/* 추천2 */}

      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song2?.albumImgPath}></img>
        <div>
          <p className={`text-xl`}> {song2?.title}</p>
          <p> album.{song2?.albumTitle} </p>
          <p> {song2?.artist}</p>

          <div className={`flex justify-between`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 듣기 </button>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 선택 </button>
          </div>
        </div>
      </div>


      {/* 추천3 */}
      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%]`}>
        <img src={song3?.albumImgPath}></img>
        <div>
          <p className={`text-lg`}> {song3?.title}</p>
          <p className={`text-sm`}> album.{song3?.albumTitle} </p>
          <p className={`text-sm`}> {song3?.artist}</p>

          <div className={`flex justify-between`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 듣기 </button>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 선택 </button>
          </div>
        </div>
      </div>


      {/* 추천4 */}

      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song4?.albumImgPath}></img>
        <div>
          <p className={`text-xl`}> {song4?.title}</p>
          <p> album.{song4?.albumTitle} </p>
          <p> {song4?.artist}</p>

          <div className={`flex justify-between`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 듣기 </button>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 선택 </button>
          </div>
        </div>
      </div>
      
      </div>
      : 
      <div className={`flex justify-center w-full h-full`}>
      <p>텍스트 감정분석 후 음악 추천 중...</p> 
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
      </div>}
    </div>
    </>
    }
    </>
  );
}
export default MusicModal;