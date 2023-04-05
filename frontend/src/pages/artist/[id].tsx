import Head from 'next/head';
import {useRouter} from 'next/router';

function Artist() {
  const router = useRouter();

  const ArtistId = router.query.id;

  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {/* <h1 className="text-center text-white">{router.query.id}</h1> */}
        <p className="text-center text-white">{ArtistId}</p>
      </main>
    </div>
  );
}
export default Artist;
