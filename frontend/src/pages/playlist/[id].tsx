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
// import HeartButton from '@/components/Like/HeartButton';

export type PlayListProps = {
  playlistTitle: string;
};

interface PlayListEditAPIInterface {
  playListId: number;
  playListListTitle: string;
  isPublic: string;
}

const PlayListDetail: FC<PlayListProps> = props => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {playlistTitle} = props;

  const [playListId, setplayListId] = useState<Number>(Number(router.query.id));
  const [playListListTitle, setplayListListTitle] = useState<string>('');
  const [isPublic, setisPublic] = useState<string>('');

  useEffect(() => {
    setplayListId(Number(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (playListId === Number(router.query.id))
      dispatch(playListDetailAsync({playListId: Number(playListId)}));
    dispatch(playListLikeCheckAsync({playListId: Number(playListId)}));
  }, [playListId]);

  const {isLike} = useAppSelector(state => {
    return state.playListLikeCheck;
  });

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
  };

  const playListLike = () => {
    if (!isNaN(Number(playListId)))
      dispatch(playListLikeAsync({playListId: playListId}));
  };

  return (
    <>
      <Seo title={`Playlist ${router.query.playlistTitle}`} />

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
          <div className={`flex justify-between items-center`}>
            <h1 className="text-lg md:text-5xl font-bold md:ml-[2rem] md86:ml-0">
              {' '}
              {router.query.playlistTitle}{' '}
            </h1>
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
          </div>
          <div>
            <p
              className={`text-2xl w-fit bg-slate-500 hover:filter hover:sepia `}
              onClick={playListLike}>
              {' '}
              {isLike ? `❤` : `🖤`}{' '}
            </p>
          </div>

          {playListSongs && playListSongs.length > 0
            ? playListSongs.map((song, songId) => (
                <div>
                  <p> {song.title}</p>
                </div>
              ))
            : null}
        </div>
      </main>
    </>
  );
};
export default PlayListDetail;
