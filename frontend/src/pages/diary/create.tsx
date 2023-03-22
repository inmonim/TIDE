import Seo from '@/components/Seo';
import styles from '@/styles/Diary.module.scss';
import QuillWrapper from '@/components/Quill/QuillWrapper';

export default function DiaryCreate() {
  return (
    <>
      <Seo title="Write" />
      <main className={`p-[6rem] pr-[calc(200px)] ${styles.main}`}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Write</h1>
        </div>
        {/* 글 작성 영역 */}
        <div className={`flex items-center justify-center p-10 mt-5 `}>
          <div>
            <QuillWrapper />
          </div>
        </div>
      </main>
    </>
  );
}
