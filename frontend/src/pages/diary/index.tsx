import Link from 'next/link';
import Seo from '@/components/Seo';
import React, {useState, useEffect, useRef} from 'react';
import styles from '@/styles/Diary.module.scss';

export default function Diary() {
  const titleArr = [
    '핑크빈의 일기',
    '배고프다마',
    '오늘 점심 파스타?',
    'Today 점심 is 알밥',
    '사람이라면 인간적으로 밥드셔야죠 밥밥밥밥밥밥밥밥밥',
    '살짝 배고팠어 난',
    '뉴진스의 그냥보이요',
    '노진스의 없는보이요'
  ];

  // 윈도우 사이즈 CSR로 체크
  interface WindowSize {
    width: number | undefined;
    height: number | undefined;
  }

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0
  });

  const [prevWidth, setPrevWidth] = useState<number | undefined>(undefined);

  // 일기장 div 선택자. transfrom: tranlateY(-400~) 으로 캐러셀 수동 이동
  const caroselDivRef = useRef<HTMLDivElement>(null);
  // 일기장 캐러셀 현재 넘버
  const caroselPage = useRef<number>(1);
  // 일기장 전체 길이
  const [diaryMax, setDiaryMax] = useState<number | undefined>(titleArr.length);
  let [diaryCur, setDiaryCur] = useState<number | undefined>(1);

  function handleResize() {
    setPrevWidth(windowSize.width);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    if (windowSize.width && windowSize.width <= 1265) {
      setDiaryMax(titleArr.length);
      caroselPage.current = diaryCur ? diaryCur : 1;
      setDiaryCur(caroselPage.current);
    } else if (windowSize.width && windowSize.width <= 1780) {
      setDiaryMax(Math.ceil(titleArr.length / 2));
      caroselPage.current = diaryCur ? Math.ceil(diaryCur / 2) : 1;
      setDiaryCur(2 * (caroselPage.current - 1) + 1);
    } else {
      setDiaryMax(Math.ceil(titleArr.length / 3));
      caroselPage.current = diaryCur ? Math.ceil(diaryCur / 3) : 1;
      setDiaryCur(3 * (caroselPage.current - 1) + 1);
    }

    if (caroselDivRef.current) {
      if (windowSize.width && windowSize.width <= 730) {
        caroselDivRef.current.style.transform = `translateY(-${
          500 * (caroselPage.current - 1)
        }px)`;
      } else {
        caroselDivRef.current.style.transform = `translateY(-${
          436 * (caroselPage.current - 1)
        }px)`;
      }
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, diaryMax, diaryCur]);

  // 캐러셀 이전버튼
  const handleCaroselPrev = () => {
    if (caroselPage.current > 1) {
      caroselPage.current -= 1;
      if (windowSize.width && windowSize.width <= 1265) {
        if (diaryCur) setDiaryCur(diaryCur - 1);
      } else if (windowSize.width && windowSize.width <= 1780) {
        if (diaryCur) setDiaryCur(diaryCur - 2);
      } else {
        if (diaryCur) setDiaryCur(diaryCur - 3);
      }
      if (caroselDivRef.current) {
        if (windowSize.width && windowSize.width <= 730) {
          caroselDivRef.current.style.transform = `translateY(-${
            500 * (caroselPage.current - 1)
          }px)`;
        } else {
          caroselDivRef.current.style.transform = `translateY(-${
            436 * (caroselPage.current - 1)
          }px)`;
        }
      }
      console.log(caroselPage.current);
    }
  };

  // 캐러셀 다음버튼
  const handleCaroselNext = () => {
    if (diaryMax && caroselPage.current < diaryMax) {
      caroselPage.current += 1;
      if (windowSize.width && windowSize.width <= 1265) {
        if (diaryCur) setDiaryCur(diaryCur + 1);
        setDiaryMax(titleArr.length);
      } else if (windowSize.width && windowSize.width <= 1780) {
        if (diaryCur) setDiaryCur(diaryCur + 2);
        setDiaryMax(Math.ceil(titleArr.length / 2));
      } else {
        if (diaryCur) setDiaryCur(diaryCur + 3);
        setDiaryMax(Math.ceil(titleArr.length / 3));
      }
      if (caroselDivRef.current) {
        if (windowSize.width && windowSize.width <= 730) {
          caroselDivRef.current.style.transform = `translateY(-${
            500 * (caroselPage.current - 1)
          }px)`;
        } else {
          caroselDivRef.current.style.transform = `translateY(-${
            436 * (caroselPage.current - 1)
          }px)`;
        }
      }
    }
    console.log(caroselPage.current);
  };

  return (
    <>
      <Seo title="Diary" />

      <div className={styles.diaryNav}>
        <Link href="/diary/create">
          <button>
            {' '}
            <p className="text-2xl ml-0.5">📝</p>{' '}
          </button>
        </Link>
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
          <button className={styles.btleft} onClick={handleCaroselPrev}>
            {' '}
            ◀{' '}
          </button>
          <button className={styles.btright} onClick={handleCaroselNext}>
            {' '}
            ▶{' '}
          </button>
        </div>
        <div className={styles.diarySection}>
          <div className={styles.caroselWrapper} ref={caroselDivRef}>
            {titleArr.map((title, index) => (
              <div className={styles.caroselItem} key={index}>
                <div className={styles.caroselDiary}>
                  <h3 className="text-2xl font-bold">
                    {' '}
                    {index + 1} : {title}
                  </h3>
                  <p> 2023.03.31</p>
                  <br />
                  <p>
                    {' '}
                    일기 내용 Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Excepturi numquam odio quam animi a fuga,
                    illo atque qui quia libero delectus fugiat temporibus
                    consequatur nam provident facilis cumque nobis distinctio
                    debitis tempora praesentium? Minus vero ipsum optio nisi
                    quaerat, laboriosam itaque illo ullam magni dolor recusandae
                    obcaecati ducimus ex porro blanditiis accusantium tenetur
                    cum suscipit? Assumenda rerum placeat sunt cum totam, quia
                    eveniet obcaecati dicta ipsa iure, aspernatur molestias
                    blanditiis et pariatur tempora id voluptatum nihil, sapiente
                    cumque qui at non nulla. Repudiandae sit iste numquam alias
                    natus ducimus veniam officia iure ratione, reprehenderit
                    earum eaque laboriosam nihil rerum quibusdam. Dolores
                    delectus facilis aut unde amet! Sint aliquid iure quam
                    voluptatum dolor pariatur, aspernatur facilis ipsum laborum
                    aut tenetur officia, ut doloremque odio nihil maxime minima
                    eos vel iste, a nesciunt excepturi voluptate molestias.
                    Maxime delectus obcaecati accusantium. Optio placeat beatae
                    omnis quisquam minus molestiae autem, voluptate cumque
                    consectetur saepe temporibus amet commodi voluptas suscipit.
                    Suscipit corporis, deleniti voluptatem sed commodi, fugiat
                    illo facilis veniam perferendis amet cum unde placeat,
                    recusandae distinctio tenetur error quaerat exercitationem
                    quos earum quod est iure. Neque debitis, quos porro nisi,
                    veniam obcaecati ipsum dicta corrupti maiores dolorum
                    consequuntur nam sunt perferendis modi iste placeat quaerat
                    voluptate sint. Officia dolorem autem laborum similique
                    amet, pariatur ab. Est nam sit nihil aperiam quasi non,
                    voluptate molestias impedit. Odit hic reprehenderit soluta,
                    ex molestias accusantium quasi nostrum perferendis inventore
                    assumenda, aspernatur blanditiis officiis ipsum animi.
                    Corporis voluptatibus doloremque nisi dolores, inventore
                    quod ex tempore maiores non, deserunt suscipit, perspiciatis
                    veritatis? Ad aliquam quo molestiae exercitationem atque,
                    quos pariatur repellendus aut numquam aliquid, rem facere
                    explicabo earum tenetur necessitatibus quisquam esse
                    doloribus. Unde labore laudantium, tenetur quam placeat
                    quidem, nesciunt repudiandae consectetur amet laboriosam
                    esse ut ipsa id quasi delectus quae! Ab, esse a? Sint error
                    ad fugiat!
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
            ))}
          </div>
        </div>

        <div className={styles.caroselDotDiv}></div>

        <h2 className="mt-6 text-2xl font-bold text-sky-400 "> 일기장 모음 </h2>
        <div className={styles.diarySection}>
          <div className={styles.diaryList}>
            {' '}
            <p> hi </p>
          </div>
        </div>
      </main>
    </>
  );
}
