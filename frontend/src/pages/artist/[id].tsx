import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {artistAsync} from 'store/api/features/artistSlice';
import {musicAsync} from 'store/api/features/musicSlice';
import DVD from 'images/Logo/dvd.png';

function Artist() {
  const router = useRouter();

  const {id: ArtistId} = router.query;

  const dispatch = useAppDispatch();
  const [albumImgs, setAlbumImgs] = useState<string[]>([]);
  const {artistId, artistName, title, artistImgPath, is_group, songId} =
    useAppSelector(state => state.artist);

  const {albumImage} = useAppSelector(state => state.music);

  console.log(title, songId);

  const gotomusicpage = (songId: number) => {
    router.push(`/music/${songId}`);
  };

  // useEffect(() => {
  //   songId.forEach(song => {
  //     dispatch(musicAsync(song));
  //   });
  // }, [artistId]);

  console.log(albumImgs);

  useEffect(() => {
    if (typeof ArtistId === 'string') {
      dispatch(artistAsync(ArtistId));
    }
  }, [ArtistId]);

  return (
    <div>
      <Head>
        <title>{artistName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-[91vh] bg-gradient-to-t from-slate-700 to-slate-900">
        <div className="flex justify-center w-[88%] h-[380px] ml-[12%] my-6">
          <img className="rounded-md " src={artistImgPath} alt="" />
        </div>
        <div className="flex flex-col ml-[12%] h-full items-center">
          <div className="flex flex-row text-5xl justify-center w-[800px] text-white">
            {artistName}
          </div>
          <div className="my-3 text-2xl text-white">아티스트의 노래</div>
          <div className="flex flex-col items-center w-[450px] h-[300px] overflow-auto scrollbar-hide border-2 rounded-lg bg-gray-400">
            {title.map((title, index) => (
              <div
                className="flex items-center w-[400px] h-[60px] border-2 my-2 text-xl bg-gray-700 text-white rounded-xl hover:bg-gray-500 hover:cursor-pointer"
                key={index}
                onClick={() => gotomusicpage(songId[index])}>
                <img
                  className="w-12 ml-2 mr-6"
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
