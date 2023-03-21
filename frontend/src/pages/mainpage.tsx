import Head from 'next/head';
import styles from '../styles/Mainpage.module.css';
import MusicBar from '@/components/MusicBar';

function Mainpage() {
  return (
    <div>
      <Head>
        <title>TIDE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MusicBar />
      </div>
      <div className="bg-red-500 ml-[230px] min-h-[97vh]">
        <div className="flex flex-col text-white">
          <div className="py-3 my-1 text-5xl font-bold text-center">
            Featuring
          </div>
          <div className="flex flex-col m-6 text-white bg-green-600">
            <h2 className="mb-4 text-3xl font-semibold">Featured Playlists</h2>
            <div className="bg-blue-600 w-[280px] h-[280px] flex flex-col justify-center items-center">
              <img
                className="rounded-lg w-52 h-52"
                src="https://lh3.googleusercontent.com/6wTZg-bWv7Yax1_7G0QlqukOwDJHetzicZj84GHzI93-Axt0Nv638NoG7cC6RnbGSTn0-gZkwVxvnExs=w544-h544-l90-rj"
                alt="Playlist 1"
              />
              <p className="mt-2 text-xl">User's Pick</p>
            </div>
          </div>
          {/* <div className="">
            <img src="playlist2.jpg" alt="Playlist 2" />
            <h3>Pop Classics</h3>
          </div> */}
          {/* <div className="">
            <img src="playlist3.jpg" alt="Playlist 3" />
            <h3>New Releases</h3>
          </div> */}
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2023 MyMusic</p>
      </footer>
    </div>
  );
}

export default Mainpage;
