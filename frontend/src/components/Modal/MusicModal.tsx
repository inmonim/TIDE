import { stat } from 'fs';
import React, {FC, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import { initContent, setContent } from 'store/api/features/diaryContentSlice';
import { recomMusicAsync, recominitStatus, setSong } from 'store/api/features/recomMusicSlice';
import { musicsearchAsync,searchinitStatus } from 'store/api/features/musicsearchSlice';
import { diaryMineAsync } from 'store/api/features/diaryMineSlice';

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
    if(type===1)
    {
      dispatch(searchinitStatus())
    }
    else if(type===2)
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
      console.log(song);
      dispatch(diaryMineAsync());
      getModalType(0);
  };

  const musicSearchRef = useRef<HTMLInputElement>(null);

  const {musicSearchResult
  } = useAppSelector(state => {
    return state.musicsearch;
  });

  return(
    <>
    {type===0? null:
    type===1?
    // 음악 검색
    <div>
      <div className={`left-[2%] right-[2%] md:left-[22%] md:right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}> 
      
      <div className={``}>
        <p className={`text-xl font-bold mb-3`}> 음악 검색</p>
        <input type="text" className={`w-full rounded-lg h-8 text-black p-2`} ref={musicSearchRef}></input>
        <button 
        onClick={()=>dispatch(musicsearchAsync(String(musicSearchRef.current?.value)))}
        className={` border bg-slate-600 pl-2 pr-2 rounded-xl absolute right-[2%] h-8 hover:bg-slate-400`}> 검색 </button>
      </div>

      <div className={`overflow-y-auto scrollbar-hide`}>
      {/* 추천1 */}
      {musicSearchResult?musicSearchResult.map((music,songId)=>(
        <>
          <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] overflow-hidden `}>
          <img src={music?.albumImgPath}></img>
          <div>
          <p className={`text-md md:text-lg whitespace-nowrap`}> {music?.title}</p>
            <p className={`text-[10px] md:text-sm whitespace-nowrap`}> album.{music?.artist} </p>

            <div className={`flex justify-start w-full gap-x-3 md:mt-0 mt-2`}>
              <button className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 듣기 </button>
              <button 
              onClick={()=> {
                music?onSetSong({
                albumImgPath: music.albumImgPath,
                artist: music.artist,
                songId:music.songId,
                title: music.title
                  ,albumTitle:''}):null}}
              className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 선택 </button>
            </div>
          </div>
        </div>
        </>
      )):null}
      </div>
      </div>
    </div>
    :
    // 음악 추천
    <>
    <div className={`left-[2%] right-[2%] md:left-[22%] md:right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}> 
      <p className={`text-xl font-bold mb-3`}> {type===1?'전체 ':'추천 '}음악 목록</p>

      {status==='completed'?
      <div className={`overflow-y-auto scrollbar-hide`}>
      {/* 추천1 */}
      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] overflow-hidden `}>
        <img src={song1?.albumImgPath}></img>
        <div>
        <p className={`text-md md:text-lg whitespace-nowrap`}> {song1?.title}</p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> album.{song1?.albumTitle} </p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> {song1?.artist}</p>


          <div className={`flex justify-start w-full gap-x-3 md:mt-0 mt-2`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 듣기 </button>
            <button 
            onClick={()=> song1?onSetSong(song1):null}
            className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 선택 </button>
          </div>
        </div>
      </div>

      {/* 추천2 */}

      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song2?.albumImgPath}></img>
        <div>
        <p className={`text-md md:text-lg whitespace-nowrap`}> {song2?.title}</p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> album.{song2?.albumTitle} </p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> {song2?.artist}</p>


          <div className={`flex justify-start gap-x-3`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 듣기 </button>
            <button 
            onClick={()=> song2?onSetSong(song2):null}
            className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 선택 </button>
          </div>
        </div>
      </div>


      {/* 추천3 */}
      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%]`}>
        <img src={song3?.albumImgPath}></img>
        <div>
          <p className={`text-md md:text-lg whitespace-nowrap`}> {song3?.title}</p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> album.{song3?.albumTitle} </p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}> {song3?.artist}</p>

          <div className={`flex justify-start gap-x-3`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 듣기 </button>
            <button 
            onClick={()=> song3?onSetSong(song3):null}
            className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 선택 </button>
          </div>
        </div>
      </div>


      {/* 추천4 */}

      <div className={`flex gap-2 bg-slate-700 w-[100%] h-[30%] p-[2%] `}>
        <img src={song4?.albumImgPath}></img>
        <div>
        <p className={`text-md md:text-lg whitespace-nowrap`}> {song4?.title}</p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}>  album.{song4?.albumTitle} </p>
          <p className={`text-[10px] md:text-sm whitespace-nowrap`}>  {song4?.artist}</p>

          <div className={`flex justify-start gap-x-3`}>
            <button className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 듣기 </button>
            <button 
            onClick={()=> song4?onSetSong(song4):null}
            className={`border rounded-lg bg-slate-500 p-1 w-12 text-[8px] md:text-sm`}> 선택 </button>
          </div>
        </div>
      </div>
      
      </div>
      : 
      <div className={`flex justify-center w-full h-full`}>
      <p>텍스트 감정분석 후 음악 추천 중...</p> 
        <div
          className="ml-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
      </div>
      </div>}
    </div>
    </>
    }
    </>
  );
}
export default MusicModal;