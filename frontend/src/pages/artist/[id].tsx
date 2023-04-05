import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from 'store';
import {artistAsync} from 'store/api/features/artistSlice';

function Artist() {
  const router = useRouter();

  const {id: ArtistId} = router.query;

  const dispatch = useAppDispatch();

  const {artistId, artistName, artistImgPath, is_group} = useAppSelector(
    state => state.artist
  );

  console.log(artistName, artistImgPath);

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
      <main className="flex flex-col min-h-[91vh]">
        <div
          className="w-[88%] h-[500px] ml-[12%] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${artistImgPath})`,
            backgroundPosition: 'center',
            opacity: 0.7
          }}></div>
        <div className="w-[88%] h-[400px] ml-[12%] bg-gradient-to-t from-slate-700 to-slate-900">
          <div className="flex flex-row justify-center text-5xl text-center text-white ">
            {artistName}
          </div>
        </div>
      </main>
    </div>
  );
}
export default Artist;
