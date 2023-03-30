import Head from 'next/head';
import {useRouter} from 'next/router';

function Artist() {
  const router = useRouter();

  const ArtistId = router.query.id;

  const ArtistInfo = {
    '1': {
      name: 'BTS',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BTS_Wings_Tour_in_Seoul.jpg/220px-BTS_Wings_Tour_in_Seoul.jpg'
    },
    '2': {
      name: 'BLACKPINK',
      image:
        'https://images.samsung.com/is/image/samsung/ph-feature-galaxy-a80-blackpink-176630227?$ORIGIN_JPG$'
    }
  };

  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        {/* <h1 className="text-center text-white">{router.query.id}</h1> */}
        <p className="text-center text-white">{ArtistId}===</p>
      </main>
    </div>
  );
}
export default Artist;
