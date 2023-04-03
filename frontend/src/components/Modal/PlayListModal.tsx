import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { playListCreateAsync, playListCreateinitStatus } from 'store/api/features/playListCreateSlice';
import { playListEditAsync } from 'store/api/features/playListEditSlice';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';

// interface listInterFace {
//   nickname: string;
//   profile_img_path: string;
//   introduce: string;
// }

export type PlayListModalProps = {
  type:Number,
  getModalType:Function
  playlistId: Number | undefined
};

interface PlayListAPIInterFace {
  playlistId:Number;
  playlistTitle: string;
  isPublic:string;
}

const DiaryListModal: FC<PlayListModalProps> = props => {
  const router = useRouter();
  const {type, getModalType, playlistId} = props;

  const dispatch = useAppDispatch();
  
  const [playListAPI,setplayListAPI] = useState<PlayListAPIInterFace>({
    playlistId:0,
    playlistTitle: '',
    isPublic:''
  })

  useEffect(()=>{
    if(router.query)
      setplayListAPI({
        playlistId:Number(playlistId),
        playlistTitle: String(router.query.playlistTitle),
        isPublic:String(router.query.isPublic)
      })
  },[router.query,playlistId])

  const onListCreate = (playlistInfo:PlayListAPIInterFace) => {
      if(playlistInfo.playlistTitle!=='') {
        dispatch(playListCreateAsync({playListTitle:playListAPI.playlistTitle, isPublic:playListAPI.isPublic}));
      }
      else {
        toast.error('제목을 입력해주세요.');
      }
  };

  const create_status = useAppSelector(state => {
    return state.diaryListCreate;
  });

  const edit_status = useAppSelector(state => {
    return state.diaryListEdit;
  });

  const onListEdit =(playlistInfo:PlayListAPIInterFace)=> {
      console.log(playlistInfo.playlistTitle)
      if (!isNaN(Number(playlistInfo.playlistId)) && playlistInfo.playlistTitle!=='')
      dispatch(playListEditAsync(playlistInfo))
      // if(edit_status!==undefined)console.log(edit_status.status)
  };


  // useEffect(()=>{
  //     switch (create_status.status) {
  //       case 'completed':
  //         // toast.success('일기장 모음 생성 성공');
  //         dispatch(diaryListMineAsync());
  //         getModalType(0)
  //         // dispatch(diaryListCreateinitStatus())
  //         break;
  //       case 'failed':
  //         // toast.error('일기장 모음 생성 실패');
  //         // dispatch(diaryListCreateinitStatus())
  //         break;
  //     }
    
  //   switch (edit_status.status) {
  //     case 'completed':
  //       toast.success('이름 수정 성공');
  //       // 갱신해주는 디스패치 한 번 
  //       router.replace({
  //         pathname: `/diary/list/${router.query.id}`,
  //         query: {
  //           diaryListTitle: diaryListTitle,
  //           userId: router.query.userId,
  //           isPublic: router.query.isPublic
  //         }},          
  //           `/diary/list/${router.query.id}`
  //       );
  //       dispatch(diaryListEditinitStatus())
  //       console.log(edit_status.status)
  //       getModalType(0)
  //       break;
  //     case 'failed':
  //       toast.error('이름 수정 실패');
  //       dispatch(diaryListEditinitStatus())
  //       break;
  //     }

  // },[create_status,edit_status])

  const [playlistTitle, setplaylistTitle] = useState<string>('');
  const [isPublic, setIsPublic] = useState<string>('0');
  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setplaylistTitle(event.target.value);
    // 0이 공개 1이 비공개
    if(event.target.checked===false) setIsPublic('0')
    else setIsPublic('1')
    // console.log(isPublic)
  };
  

  return(
    <>
    {type===0? null:
    <div className={`left-[5%] right-[5%] md:left-[25%] md:right-[25%] top-[40%] min-w-[200px] rounded-md bg-slate-500 ${type===1?``: ``} ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23] h-52 min-w-[240px]`}> 
      <p className={`text-xl font-bold`}> {type===1?'플레이리스트 생성 ':'일기장 모음 이름 수정 '} </p>
      
      {/*  감싸는 div */}

      <div className={`mt-10 h-[90%] grid gap-y-2 scrollbar-hide`}>

      {type===1? 
        <div className={`justify-center items-center flex flex-col h-28`}>
        <form className={`w-full `}>
          <label className={`select-none p-3 w-full flex justify-between whitespace-nowrap items-center `}> 
          <p> 제목 입력</p>
          <input 
          name="diaryListTitle"
          onChange={onChangeInput}
          type='text' id="title" className={`ml-3 w-[80%] rounded-md text-black p-1`}></input>
          </label>
          <label className={` p-3 select-none w-full flex justify-start whitespace-nowrap items-center`}>

          <p> 공개 여부 </p>
          <div className={`flex  ml-16 gap-x-5 text-blue-300`}>
            <input
            onChange={onChangeInput}
            className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 checked:bg-neutral-700 checked:after:bg-neutral-700 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-blue-400 dark:checked:bg-primary dark:checked:after:bg-primary"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
             />
            <p className={`${isPublic==='0'?``:`text-black`}`}> {isPublic==='0'?'공개':'비공개'} </p>
          </div>

          </label>
        </form>
        <button 
        onClick={()=> onListCreate({playlistId:Number(playlistId), playlistTitle:playlistTitle, isPublic:isPublic})}
        className={`border rounded-xl bg-slate-700 hover:bg-blue-900 duration-200 h-[40px] w-[100px] md:mt-2`}> 생성 </button>
        </div>
      :
      type==2?
      <div className={`justify-center items-center flex flex-col h-20`}>
        <form className={`w-full `}>
          <label className={`select-none p-3 w-full flex justify-between whitespace-nowrap items-center `}> 
          <p> 제목 입력</p>
          <input 
          name="diaryListTitle"
          onChange={onChangeInput}
          type='text' id="title" className={`ml-3 w-[80%] rounded-md text-black p-1`}></input>
          </label>
          <label className={` p-3 select-none w-full flex justify-start whitespace-nowrap items-center`}>

          <p> 공개 여부 </p>
          <div className={`flex  ml-16 gap-x-5 text-blue-300`}>
            <input
            onChange={onChangeInput}
            className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 checked:bg-neutral-700 checked:after:bg-neutral-700 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-blue-400 dark:checked:bg-primary dark:checked:after:bg-primary"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
             />
            <p className={`${isPublic==='0'?``:`text-black`}`}> {isPublic==='0'?'공개':'비공개'} </p>
          </div>

          </label>
        </form>
      <button 
      onClick={()=> onListEdit({playlistId:Number(playlistId), playlistTitle:playlistTitle, isPublic:isPublic})}
      className={`border rounded-xl bg-slate-700 hover:bg-blue-900 duration-200 h-[40px] w-[100px] md:mt-2`}> 수정 </button>
      </div>
      :null
      }
      </div>

    </div>
    }
    </>
  );
}
export default DiaryListModal;