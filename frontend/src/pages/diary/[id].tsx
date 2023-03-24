import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import styles from '@/styles/Diary.module.scss';

export default function DiaryDetail() {
  const router = useRouter();
  return (
    <>
      <Seo title={`Diary ${router.query.id}`} />

      <main
        className={`p-[2rem] md86:p-[4rem] md86:pt-[2rem]  lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] ${styles.main}`}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold ml-[2rem] md86:ml-0"> Diary {router.query.id}</h1>
        </div>
      </main>
    </>
  );
}
