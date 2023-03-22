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
        <div className={`flex flex-row items-center justify-center mt-7 w-[100%] pb-[calc(8vh+20px)]`}>
          {/* 글 에디터 영역 */}
          <div className={`w-full grid grid-cols-1`}>
              <QuillWrapper />
          </div>
        </div>

        {/* 음악 바인딩 영역 */}
        <div className={`grid grid-cols-2 justify-items-center`}>
            <div className={`w-[15vw] h-[15vw] min-w-[110px] min-h-[100px] bg-[#2B2D31] rounded-lg`}> </div>
            <div className={`w-[15vw] h-[15vw] min-w-[110px] min-h-[100px] bg-[#2B2D31] rounded-lg`}> </div>
        </div>
      </main>
    </>
  );
}
