import React, {FC, useEffect, useState} from 'react';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 dispatch, selector hook
import {followDelAsync} from 'store/api/features/followDelSlice';
import {followerDelAsync} from 'store/api/features/followerDelSlice';
import {getCookie} from 'cookies-next';
import {
  playListSongAddAsync,
  playListSongAddinitStatus
} from 'store/api/features/playListSongAddSlice';
import {toast} from 'react-toastify';

interface listInterFace {
  id: number;
  playlistTitle: string;
  likeCnt: number;
  isPublic: string;
}

export type playListModalProps = {
  type: Number;
  songId: number;
  isMe: boolean;
  list: listInterFace[];
  getMyPlaylistModal: Function;
};

interface followAPIInterFace {
  nickname: string;
}

const MusicModal: FC<playListModalProps> = props => {
  const {type, isMe, list, songId, getMyPlaylistModal} = props;
  console.log(songId, 'songId');
  const [playlistId, setPlaylistId] = useState<number>(0);
  // const [musicId, setMusicId] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handlePlaylistAdd = (playlistId: number) => {
    dispatch(playListSongAddAsync({playlistId, songId}));
    getMyPlaylistModal(0);
  };

  const songAddStatus = useAppSelector(state => {
    return state.playListSongAdd;
  });

  useEffect(() => {
    switch (songAddStatus.status) {
      case 'completed':
        toast.success('노래를 추가했습니다.');
        dispatch(playListSongAddinitStatus());
        break;
      case 'failed':
        toast.error('노래를 추가할 수 없습니다.');
        dispatch(playListSongAddinitStatus());
        // dispatch(diaryListCreateinitStatus())
        break;
    }
  }, [songAddStatus]);

  return (
    <>
      {type === 0 ? null : (
        <div
          className={`left-[22%] right-[22%] top-[20%] min-w-[200px] rounded-md bg-slate-500 h-[60%] ml-[0vw]  bg-opacity-80 fixed p-[2%] text-white z-[23] overflow-hidden
    
    `}>
          <p className={`text-xl font-bold`}>내 플레이리스트 목록</p>

          {/*  감싸는 div */}

          <div
            className={`mt-4 h-[90%] overflow-auto grid scrollbar-hide grid-rows-[repeat(auto-fill,minmax(70px,1fr))] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-black`}>
            {list
              ? list.map((p, index) => (
                  <div
                    key={index}
                    onClick={() => handlePlaylistAdd(p.id)}
                    className={`flex bg-slate-800 rounded-md w-[100%] h-[70px] p-[2%] pl-4 items-center gap-x-2 bg-opacity-80 justify-between hover:bg-blue-500 duration-300`}
                    data-playlist-id={p.id}>
                    <div className={`flex items-center`}>
                      <p> {p.playlistTitle}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};
export default MusicModal;
