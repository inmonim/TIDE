import React, {FC} from 'react';

export type MusicModalProps = {
  type:Number
};

const MusicModal: FC<MusicModalProps> = props => {
  const {type} = props;
  return(
    <>
    {type===0? null:
    <div className={`left-[22%] right-[22%] top-[20%] min-w-[200px] bg-slate-400 h-[60%] ml-[0vw] opacity-100 fixed p-[2%] grid text-white z-[23]`}> 
      <p className={`text-xl font-bold`}> {type===1?'전체 ':'추천 '}음악 목록</p>
      
      {/* 음악 감싸는 div */}
      <div className={`grid bg-red-400 w-[100%] h-[30%] p-[2%]`}>
        <p> 헤이~</p>
      </div>

    </div>
    }
    </>
  );
}
export default MusicModal;