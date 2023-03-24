import Head from 'next/head';
import {useRouter} from 'next/router';

function Artist() {
  const router = useRouter();

  const ArtistName = router.query.id;

  return (
    <div>
      <Head>
        <title>{router.query.name}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1 className="text-center text-white">{router.query.name}</h1>
      <p className="text-center text-white">{ArtistName}</p>
    </div>
  );
}
export default Artist;
