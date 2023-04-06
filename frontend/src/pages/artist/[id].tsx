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
      <main className="flex flex-col items-center md:min-h-[91vh] w-screen h-screen bg-gradient-to-t md:ml-[12%] from-slate-700 to-slate-900">
        <div className="flex flex-row items-center justify-center w-full max-h-[50vh] md:w-[380px] md:h-[380px] mt-14 mb-4">
          <div className="flex flex-col items-center justify-center ">
            <img
              className="flex rounded-md w-[70vw] h-fit md:w-[360px] md:h-[360px]"
              src={artistImgPath}
              alt="artistImage"
            />
            <div
              className={`${isLiked ? `text-pink-300 border-pink-300` : ""} flex justify-center my-1 md:my-4 mb-1 md:mb-10 text-sm md:text-base text-white border-[0.1rem] w-fit p-1 px-2 md:px-4 rounded-xl hover:cursor-pointer hover:bg-gray-500`}
              onClick={handleartistLike}>
              {isLiked ? '좋아요 취소' : '좋아요'}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-row text-xl md:text-2xl justify-center md:w-[800px] text-white">
            {artistName}
          </div>
          <div className="my-1 text-base text-white md:text-lg">아티스트의 노래</div>
          <div className="flex flex-col items-center w-full min-h-[30vh] max-h-[30vh] md:w-[450px] md:h-[350px] overflow-auto scrollbar-hide border-2 rounded-lg bg-gray-400">
            {title.map((title, index) => (
              <div
                className="flex items-center w-full md:w-[400px] h-fit md:h-[60px] border-2 my-2 text-base md:text-xl bg-gray-700 text-white rounded-xl hover:bg-gray-500 hover:cursor-pointer"
                key={index}
                onClick={() => gotomusicpage(songId[index])}>
                <img
                  className="w-8 my-2 ml-2 mr-6 md:my-4 md:w-12"
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
