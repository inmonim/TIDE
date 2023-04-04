import { stat } from 'fs';
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import { initContent, setContent } from 'store/api/features/diaryContentSlice';
import { recomMusicAsync, recominitStatus } from 'store/api/features/recomMusicSlice';

export type MusicModalProps = {
  type:Number
};

interface song{
  albumImgPath: string,
  albumTitle: string,
  artist: string[],
  songId:Number,
  title: string
}

const MusicModal: FC<MusicModalProps> = props => {
  const {type} = props;
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
    song_model1CosineTop,
    song_model1T3Top,
    song_model2CosineTop,
    song_model2T3Top
  } = useAppSelector(state => {
    return state.recomMusic;
  });

  const [recStatus, setrecStatus] = useState<string>(status)
  const [song1, setsong1] = useState<song>();
  const [song2, setsong2] = useState<song>();
  const [song3, setsong3] = useState<song>();
  const [song4, setsong4] = useState<song>();

  useEffect(()=>{
    setrecStatus(status)
    if(recStatus==='completed ')
    {    
      setsong1(song_model1CosineTop)
      setsong2(song_model1T3Top)
      setsong3(song_model2CosineTop)
      setsong4(song_model2T3Top)
    }
    console.log('get' ,status, song_model1CosineTop,song_model1T3Top,song_model2CosineTop,song_model2T3Top)
    console.log('re',recStatus, song1,song2,song3,song4)
  },[status])
  
  return(
    <>
    {type===0? null:
    type===1?null:
    <>
    <div className={`left-[22%] right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}> 
      <p className={`text-xl font-bold`}> {type===1?'전체 ':'추천 '}음악 목록</p>
      {status==='completed'?
      <>
      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song_model1CosineTop?.albumImgPath}></img>
        <div>
          <p className={`text-xl`}> {song_model1CosineTop?.title}</p>
          <p> album.{song_model1CosineTop?.albumTitle} </p>
          <p> {song_model1CosineTop?.artist}</p>

          <div className={`flex justify-between`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 듣기 </button>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12`}> 선택 </button>
          </div>
        </div>
      </div>
      
      </>
      : <p>loading...</p> }
    </div>
    </>}
    </>
  );
}
export default MusicModal;