import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getSortedPostsData } from '../lib/idprotocols'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const router = useRouter();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <button type="button" onClick={() => router.push('/api/hello')}>Connect wallet address</button>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      </section>
    </Layout>
  )
}

        // <ul className={utilStyles.list}>
        //   {allPostsData.map(({ id, title }) => (
        //     <li className={utilStyles.listItem} key={id}>
        //       <Link href={`/idprotocols/${id}`}>
        //         <a>{title}</a>
        //       </Link>
        //       <br />
        //     </li>
        //   ))}
        // </ul>