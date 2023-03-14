import Seo from '@/components/Seo'
import styles from '@/styles/Diary.module.scss'

export default function DiaryCreate() {
  return (
    <>
      <Seo title="Write" />
      <main className={styles.main}>
        <div className={styles.description}>
          <h1 className="text-5xl font-bold"> Write</h1>
        </div>
      </main>
    </>
  )
}
