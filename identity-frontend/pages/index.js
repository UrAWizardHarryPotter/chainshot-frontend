import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';
import pohABI from '../pohABI.json';

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
        <p>Which protocol do you want to connect?</p>
        <button type="button" onClick={() => router.push('/verifying')}>
          Proof of Humanity
        </button>
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