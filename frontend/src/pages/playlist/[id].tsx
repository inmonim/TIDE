import Link from 'next/link';
import {useRouter} from 'next/router';
import Seo from '@/components/Seo';
import {useAppDispatch, useAppSelector} from 'store';
import {playListDetailAsync} from 'store/api/features/playListDetailSlice';
import {FC, useEffect, useState} from 'react';
import PlayListModal from '@/components/Modal/PlayListModal';
import {playListDelAsync} from 'store/api/features/playListDelSlice';
import {playListLikeAsync} from 'store/api/features/playListLikeSlice';
import {playListLikeCheckAsync} from 'store/api/features/playListLikeCheckSlice';
import Image from 'next/image';
import runButton from 'public/buttons/PlayTrack.png'
import shuffleButton from 'public/buttons/Shuffle.png'
import { playListMusicDelAsync } from 'store/api/features/playListMusicDelSlice';
import { playListAllDetailAsync, playListAllDetailinitStatus } from 'store/api/features/playListAllDetailSlice';
import { getCookie } from 'cookies-next';
import { getPlayList, getPlayListRandom } from 'store/api/features/nowmusicSlice';

export type PlayListProps = {
  playlistTitle: string;
  isPublic: string;
  likeCnt: string;
};

interface PlayListEditAPIInterface {
  playListId: number;
  playListListTitle: string;
  isPublic: string;
}

const PlayListDetail: FC<PlayListProps> = props => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {playlistTitle, isPublic, likeCnt} = router.query;

  // 본인이면 프로필로 리다이렉트
  // useEffect(() => {
  //   setNick({nickname: `${router.query.nickname}`});
  //   if(getCookie('nickname') === router.query.nickname)
  //   {
  //     router.push({
  //       pathname: `/profile`,
  //     });
  //   }
  // }, [router.query]);

  const [playListId, setplayListId] = useState<Number>(Number(router.query.id));

  useEffect(() => {
    dispatch(playListAllDetailAsync({playListId:Number(router.query.id)}))
    setplayListId(Number(router.query.id));
    // dispatch(userPlayListAsync();
  }, [router.query]);

  useEffect(() => {
    if (playListId === Number(router.query.id))
      dispatch(playListDetailAsync({playListId: Number(playListId)}));
    dispatch(playListLikeCheckAsync({playListId: Number(playListId)}));
  }, [playListId]);

  const {isLike} = useAppSelector(state => {
    return state.playListLikeCheck;
  });

  const [like,setlike] = useState<boolean>(false);

  const {plDetail} = useAppSelector(state => {
    return state.playlistAllDetail;
  });

  // const [isPublic, setisPublic] = useState<string>('0');


  const {playListSongs} = useAppSelector(state => {
    return state.playListDetail;
  });

  const [playlistType, setPlaylistType] = useState<Number>(0);
  const getModalType = (type: Number) => {
    setPlaylistType(type);
  };

  const playListDel = () => {
    console.log(playListId);
    if (!isNaN(Number(playListId)))
      dispatch(playListDelAsync({playListId: playListId}));
    router.replace({
      pathname: `/playlist`
    });
  };

  const playListLike = () => {
    if (!isNaN(Number(playListId)))
    {
      dispatch(playListLikeAsync({playListId: playListId}));
      dispatch(playListLikeCheckAsync({playListId: playListId}));
      setlike(isLike)
    }
    dispatch(playListAllDetailAsync({playListId:plDetail.playlistId}))
  };

  const musicDel = (songId:Number) => {
    dispatch(playListMusicDelAsync({songId:songId, playlistId:playListId}))
    if (playListId === Number(router.query.id))
      dispatch(playListDetailAsync({playListId: Number(playListId)}));
  };

  const handleClick =
  (songIds: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/music/${songIds}`);
  };

  return (
    <>
      <Seo title={`${plDetail.playlistTitle}`} />

      <div
        className={`${
          playlistType === 0
            ? 'w-0 h-0'
            : 'bg-slate-900 w-[100%] opacity-90 h-[100%] fixed z-[3]'
        }`}
        onClick={() => {
          setPlaylistType(0);
        }}></div>
      <PlayListModal
        type={playlistType}
        getModalType={getModalType}
        playlistId={Number(playListId)}
      />

      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className={`text-[0.85rem] w-[100%] z-[2] select-none h-[100%]`}>
          <div className={`md:flex justify-between items-center`}>
            <div className={``}>
            <h1 className="mb-1 text-xl font-bold md:text-5xl md86:ml-0">
              {plDetail.playlistTitle}
            </h1>
              <div className={`flex gap-x-2 mb-2`}>
                <p>{plDetail.nickname}</p>
                <p
                  className={`text-lg w-fit hover:filter hover:sepia `}
                  onClick={()=>
                    {                    
                      if(getCookie('nickname') !== plDetail.nickname)playListLike()
                    }
                  }>
                  {like || (getCookie('nickname') === plDetail.nickname) ? `💕` : `🖤`} 
                </p>
                <p className={`text-lg`}> {plDetail.likecnt} 
                </p>
              </div>
            
            {/* 재생관련영역 */}
            <div className={'flex'}>
              <Image 
              onClick={()=>dispatch(getPlayList({playListSongs}))}
              src={runButton} alt={'재생'} className={`border p-1 w-8 h-8 hover:drop-shadow-sm`}/>
              <Image 
               onClick={()=>dispatch(getPlayListRandom({playListSongs}))}
              src={shuffleButton} alt={'셔플'} className={`border p-1 w-8 h-8`}/>
            </div>

            </div>

            <div> 
            <p className={`w-full border p-2 rounded-lg text-center ${plDetail.isPublic==='0'? `bg-blue-700`:`bg-red-700`} mb-2`}> {plDetail.isPublic==='0'? `공개`:`비공개`} </p>
            
            {
               (getCookie('nickname') === plDetail.nickname)?
               <div className={`grid gap-2 grid-cols-2`}>
               <button
                 onClick={() => setPlaylistType(2)}
                 className={`text-md border pl-2 pr-2 rounded-lg h-8 bg-gray-800 hover:bg-gray-600 duration-200`}>
                 {' '}
                 수정{' '}
               </button>
               <button
                 onClick={playListDel}
                 className={`text-md border pl-2 pr-2 rounded-lg h-8 bg-gray-800 hover:bg-gray-600 duration-200`}>
                 {' '}
                 삭제{' '}
               </button>
             </div>
               :
               null

            }
            </div>


          </div>
          {playListSongs && playListSongs.length > 0
            ? playListSongs.map((song, songId) => (
                <div 
                onClick={handleClick(song.songId)}
                className={` duration-200 mt-2 flex justify-between items-center border-t border-b p-2 hover:bg-sky-600 hover:bg-opacity-60`}>
                  <div className='flex items-center'> 
                  <img src={song.albumImgPath} className={`w-20 h-20 rounded-[50%] mr-2`}/>
                  <div>
                  <p> {song.title}</p>
                  <p> {song.artist}</p>
                  </div>
                  </div>
        
                  {
               (getCookie('nickname') === plDetail.nickname)?
               <button 
               onClick={()=>musicDel(song.songId)}
               className={`w-6 h-6 border rounded-[50%] bg-red-900 hover:bg-red-400`}> X </button>
               :
                    null
               }
                </div>
              ))
            : null}
        </div>
      </main>
    </>
  );
};
export default PlayListDetail;
