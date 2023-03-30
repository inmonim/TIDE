import Head from 'next/head';
import {useRouter} from 'next/router';

function Musicpage() {
  const router = useRouter();

  const MusicName = router.query.id;

  return (
    <div>
      <Head>
        <title>Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`
      p-[4rem] pt-[2rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] pb-[240px] text-[#eeeeee] flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
        <div className="">
          <h1>Music</h1>
        </div>
      </main>
    </div>
  );
}

export default Musicpage;
