import Head from 'next/head';
import styles from '../styles/Mainpage.module.css';

function Mainpage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyMusic - Your ultimate music destination</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>MyMusic</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Genres</a>
            </li>
            <li>
              <a href="#">Artists</a>
            </li>
            <li>
              <a href="#">Playlists</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
        <div className={styles.search}>
          <input type="text" placeholder="Search for music..." />
          <button>Search</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.featured}>
          <h2>Featured Playlists</h2>
          <div className={styles.playlist}>
            <img src="playlist1.jpg" alt="Playlist 1" />
            <h3>Top Hits 2023</h3>
          </div>
          <div className={styles.playlist}>
            <img src="playlist2.jpg" alt="Playlist 2" />
            <h3>Pop Classics</h3>
          </div>
          <div className={styles.playlist}>
            <img src="playlist3.jpg" alt="Playlist 3" />
            <h3>New Releases</h3>
          </div>
        </div>
        <div className={styles.topArtists}>
          <h2>Top Artists</h2>
          <div className={styles.artist}>
            <img src="artist1.jpg" alt="Artist 1" />
            <h3>Ariana Grande</h3>
          </div>
          <div className={styles.artist}>
            <img src="artist2.jpg" alt="Artist 2" />
            <h3>Ed Sheeran</h3>
          </div>
          <div className={styles.artist}>
            <img src="artist3.jpg" alt="Artist 3" />
            <h3>Drake</h3>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2023 MyMusic</p>
      </footer>
    </div>
  );
}

export default Mainpage;
