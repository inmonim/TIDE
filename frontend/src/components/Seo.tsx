import type {FC} from 'react'
import Head from 'next/head'

export type SeoProps = {
  title: string
}

const Seo: FC<SeoProps> = props => {
  const {title} = props
  return (
    <Head>
      <title> {title} | TIDE </title>
      <meta name={title}  content={title} />
      <link rel="icon" href="/favicon.png" />
    </Head>
  )
}
export default Seo
