import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import { diaryListCreateAsync, diaryListCreateinitStatus } from 'store/api/features/diaryListCreateSlice';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import { diaryListMineAsync } from 'store/api/features/diaryListMineSlice';
import { diaryListEditAsync, diaryListEditinitStatus} from 'store/api/features/diaryListEditSlice';
interface listInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

export type DiaryModalProps = {
  type:Number,
  getModalType:Function
  diaryListId: Number | undefined
};

interface diaryListAPIInterFace {
  diaryListTitle: string;
}

const DiaryListModal: FC<DiaryModalProps> = props => {
  const router = useRouter();
  const {type, getModalType, diaryListId} = props;

  const dispatch = useAppDispatch();

  const onListCreate = (diaryListTitle:diaryListAPIInterFace) => {
      if(diaryListTitle.diaryListTitle!=='') dispatch(diaryListCreateAsync(diaryListTitle));
      else {
        toast.error('제목을 입력해주세요.');
      }
  };

  // const {status} = useAppSelector(state => {
  //   return state.diaryListCreate;
  // });

  const create_status = useAppSelector(state => {
    return state.diaryListCreate;
  });

  const edit_status = useAppSelector(state => {
    return state.diaryListEdit;
  });

  const onListEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(diaryListId)
      if (!isNaN(Number(diaryListId)) && diaryListTitle!=='')
      dispatch(diaryListEditAsync({diaryListId:Number(diaryListId), diaryListTitle:diaryListTitle}))
      // if(edit_status!==undefined)console.log(edit_status.status)
  };


  useEffect(()=>{
      switch (create_status.status) {
        case 'completed':
          // toast.success('일기장 모음 생성 성공');
          dispatch(diaryListMineAsync());
          getModalType(0)
          // dispatch(diaryListCreateinitStatus())
          break;
        case 'failed':
          // toast.error('일기장 모음 생성 실패');
          // dispatch(diaryListCreateinitStatus())
          break;
      }
    
    switch (edit_status.status) {
      case 'completed':
        toast.success('이름 수정 성공');
        // 갱신해주는 디스패치 한 번 
        router.replace({
          pathname: `/diary/list/${router.query.id}`,
          query: {
            diaryListTitle: diaryListTitle,
            userId: router.query.userId,
            isPublic: router.query.isPublic
          }},          
            `/diary/list/${router.query.id}`
        );
        dispatch(diaryListEditinitStatus())
        console.log(edit_status.status)
        getModalType(0)
        break;
      case 'failed':
        toast.error('이름 수정 실패');
        dispatch(diaryListEditinitStatus())
        break;
      }

  },[create_status,edit_status])

  const [diaryListTitle, setDiarylListTitle] = useState<string>('');
  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDiarylListTitle(event.target.value);
    // console.log(diaryListTitle)
  };
  

  return(
    <>
    {type===0? null:
    <div className={`left-[5%] right-[5%] md:left-[25%] md:right-[25%] top-[40%] min-w-[200px] rounded-md bg-slate-500 ${type===1?``: ``} ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23]`}> 
      <p className={`text-xl font-bold`}> {type===1?'일기장 모음 생성 ':'일기장 모음 이름 수정 '} </p>
      
      {/*  감싸는 div */}

      <div className={`mt-4 h-[90%] grid gap-y-2 scrollbar-hide`}>

      {type===1? 
        <div className={`justify-center items-center flex flex-col h-20`}>
        <form className={`w-full `}>
          <label className={`select-none p-3 w-full flex justify-between whitespace-nowrap items-center `}> 
          <p> 제목 입력</p>
          <input 
          name="diaryListTitle"
          onChange={onChangeInput}
          type='text' id="title" className={`ml-3 w-[80%] rounded-md text-black p-1`}></input>
          </label>
        </form>
        <button 
        onClick={()=> onListCreate({diaryListTitle:diaryListTitle})}
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
      </form>
      <button 
      onClick={onListEdit}
      className={`border rounded-xl bg-slate-700 hover:bg-blue-900 duration-200 h-[40px] w-[100px] md:mt-2`}> 수정 </button>
      </div>
      :null
      }

      {/* {list ? list.map((p, index) => (
        <Link href={`/user/${p.nickname}`} className={` h-fit`} key={index}>
          <div className={`flex bg-slate-800 rounded-md w-[100%] h-[70px] p-[2%] items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}>
          
          <div className={`flex items-center`}>
            {
              p.profile_img_path? 
              <img src={p.profile_img_path} className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></img>
              :
              <div className={`w-10 h-10 rounded-[50%] bg-white mr-2`}></div>
            }
            <p> {p.nickname}</p>
          </div>

          <div>
            <button 
            onClick={()=>{type===1?onFollowDel({nickname:p.nickname}):onFollowerDel({nickname:p.nickname})}}
            className={`border rounded-3xl p-[6px] text-sm bg-slate-500 shadow text-shadow-md hover:bg-slate-800 duration-300`}> {type===1?`언팔로우`:`팔로워 삭제`}</button>
          </div>
          </div>      
        </Link>
        )):null}     */}

      </div>

    </div>
    }
    </>
  );
}
export default DiaryListModal;