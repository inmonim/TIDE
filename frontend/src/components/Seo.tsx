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
    </Head>
  )
}
export default Seo
