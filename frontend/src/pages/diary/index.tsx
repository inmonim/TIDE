import Seo from '@/components/Seo'
import styles from '@/styles/Diary.module.scss'

export default function Diary() {
  return (
    <>
      <Seo title="Diary" />

      <div className={styles.diaryNav}>
        <button>
          {' '}
          <p className="text-2xl ml-0.5">📝</p>{' '}
        </button>
      </div>

      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Diary</h1>
        </div>

        <div className={styles.diarySectionTitle}>
          <h2 className="text-2xl font-bold text-sky-400 "> 일기장 </h2>
          <input type="month"></input>
        </div>

        <div className={styles.btDiv}>
          <button className={styles.btleft}> ◀ </button>
          <button className={styles.btright}> ▶ </button>
        </div>
        <div className={styles.diarySection}>
          <div className={styles.caroselWrapper}>
            <div className={styles.caroselItem}>
              <div className={styles.caroselDiary}>
                <h3 className="text-2xl font-bold"> 일기 제목</h3>
                <p> 2023.03.31</p>
                <br />
                <p>
                  {' '}
                  일기 내용 Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Excepturi numquam odio quam animi a fuga, illo atque qui
                  quia libero delectus fugiat temporibus consequatur nam
                  provident facilis cumque nobis distinctio debitis tempora
                  praesentium? Minus vero ipsum optio nisi quaerat, laboriosam
                  itaque illo ullam magni dolor recusandae obcaecati ducimus ex
                  porro blanditiis accusantium tenetur cum suscipit? Assumenda
                  rerum placeat sunt cum totam, quia eveniet obcaecati dicta
                  ipsa iure, aspernatur molestias blanditiis et pariatur tempora
                  id voluptatum nihil, sapiente cumque qui at non nulla.
                  Repudiandae sit iste numquam alias natus ducimus veniam
                  officia iure ratione, reprehenderit earum eaque laboriosam
                  nihil rerum quibusdam. Dolores delectus facilis aut unde amet!
                  Sint aliquid iure quam voluptatum dolor pariatur, aspernatur
                  facilis ipsum laborum aut tenetur officia, ut doloremque odio
                  nihil maxime minima eos vel iste, a nesciunt excepturi
                  voluptate molestias. Maxime delectus obcaecati accusantium.
                  Optio placeat beatae omnis quisquam minus molestiae autem,
                  voluptate cumque consectetur saepe temporibus amet commodi
                  voluptas suscipit. Suscipit corporis, deleniti voluptatem sed
                  commodi, fugiat illo facilis veniam perferendis amet cum unde
                  placeat, recusandae distinctio tenetur error quaerat
                  exercitationem quos earum quod est iure. Neque debitis, quos
                  porro nisi, veniam obcaecati ipsum dicta corrupti maiores
                  dolorum consequuntur nam sunt perferendis modi iste placeat
                  quaerat voluptate sint. Officia dolorem autem laborum
                  similique amet, pariatur ab. Est nam sit nihil aperiam quasi
                  non, voluptate molestias impedit. Odit hic reprehenderit
                  soluta, ex molestias accusantium quasi nostrum perferendis
                  inventore assumenda, aspernatur blanditiis officiis ipsum
                  animi. Corporis voluptatibus doloremque nisi dolores,
                  inventore quod ex tempore maiores non, deserunt suscipit,
                  perspiciatis veritatis? Ad aliquam quo molestiae
                  exercitationem atque, quos pariatur repellendus aut numquam
                  aliquid, rem facere explicabo earum tenetur necessitatibus
                  quisquam esse doloribus. Unde labore laudantium, tenetur quam
                  placeat quidem, nesciunt repudiandae consectetur amet
                  laboriosam esse ut ipsa id quasi delectus quae! Ab, esse a?
                  Sint error ad fugiat!
                </p>
              </div>
              <div className={styles.caroselMusic}>
                <div className={styles.cdBG}></div>
                <h3 className="text-2xl font-bold"> 음악 제목</h3>
                <p> 아티스트 이름</p>

                <div className={styles.musicBar}></div>

                <div className={styles.musicUIBar}></div>
              </div>
            </div>

            <div className={styles.caroselItem}>
              <div className={styles.caroselDiary}>
                <h3 className="text-2xl font-bold"> 일기 제목</h3>
                <p> 2023.03.31</p>
                <br />
                <p> 일기 내용</p>
              </div>
              <div className={styles.caroselMusic}>
                <div className={styles.cdBG}></div>
                <h3 className="text-2xl font-bold"> 음악 제목</h3>
                <p> 아티스트 이름</p>
                <div className={styles.musicBar}></div>

                <div className={styles.musicUIBar}></div>
              </div>
            </div>

            <div className={styles.caroselItem}>
              <div className={styles.caroselDiary}>
                <h3 className="text-2xl font-bold"> 일기 제목</h3>
                <p> 2023.03.31</p>
                <br />
                <p> 일기 내용</p>
              </div>
              <div className={styles.caroselMusic}>
                <div className={styles.cdBG}></div>
                <h3 className="text-2xl font-bold"> 음악 제목</h3>
                <p> 아티스트 이름</p>
                <div className={styles.musicBar}></div>

                <div className={styles.musicUIBar}></div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-sky-400 "> 일기장 모음 </h2>
        <div className={styles.diarySection}>
          <div className={styles.diaryList}>
            {' '}
            <p> hi </p>
          </div>
        </div>
      </main>
    </>
  )
}
