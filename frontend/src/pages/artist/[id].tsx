import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {artistAsync} from 'store/api/features/artistSlice';
import {musicAsync} from 'store/api/features/musicSlice';
import DVD from 'images/Logo/dvd.png';
import {
  artistLikeAsync,
  artistLikeCheckAsync
} from 'store/api/features/artistLikeSlice';

function Artist() {
  const router = useRouter();
  const ArtistId = Number(router.query.id);

  const dispatch = useAppDispatch();
  const {
    artistId,
    artistName,
    title,
    artistImgPath,
    is_group,
    songId,
    likeCnt
  } = useAppSelector(state => state.artist);

  const {check} = useAppSelector(state => state.artistLike);

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleartistLike = () => {
    setIsLiked(prev => !prev);
    dispatch(artistLikeAsync(ArtistId));
  };

  console.log(check, 'cpzm체크');
  useEffect(() => {
    if (check) {
      setIsLiked(check);
    }
  }, [check]);
  // console.log(title, songId);

  const gotomusicpage = (songId: number) => {
    router.push(`/music/${songId}`);
  };

  useEffect(() => {
    if (ArtistId) {
      dispatch(artistAsync(ArtistId));
      // dispatch(artistLikeCheckAsync(ArtistId));
      dispatch(artistLikeCheckAsync(ArtistId));
    }
  }, [ArtistId]);

  return (
    <div>
      <Head>
        <title>{artistName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center min-h-[91vh] bg-gradient-to-t ml-[12%] from-slate-700 to-slate-900">
        <div className="flex flex-row items-center justify-center w-[380px] h-[380px] mt-14 mb-4">
          <div className="flex flex-col items-center justify-center ">
            <img
              className="flex rounded-md w-[360px] h-[360px]"
              src={artistImgPath}
              alt="artistImage"
            />
            <div
              className="flex justify-center my-4 mb-10 text-lg text-white border-2 w-[100px] p-1 rounded-xl hover:cursor-pointer hover:bg-gray-500"
              onClick={handleartistLike}>
              {isLiked ? '좋아요 취소' : '좋아요'}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center h-full">
          <div className="flex flex-row text-4xl justify-center w-[800px] text-white">
            {artistName}
          </div>
          <div className="my-2 text-xl text-white">아티스트의 노래</div>
          <div className="flex flex-col items-center w-[450px] h-[300px] overflow-auto scrollbar-hide border-2 rounded-lg bg-gray-400">
            {title.map((title, index) => (
              <div
                className="flex items-center w-[400px] h-[60px] border-2 my-2 text-xl bg-gray-700 text-white rounded-xl hover:bg-gray-500 hover:cursor-pointer"
                key={index}
                onClick={() => gotomusicpage(songId[index])}>
                <img
                  className="w-12 my-4 ml-2 mr-6"
                  src="/images/Logo/dvd.png"
                  alt=""
                />
                {title}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Artist;
