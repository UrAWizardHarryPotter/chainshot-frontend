import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';

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

  async function main() {
    // connect to metamask
    await ethereum.request({ method: 'eth_requestAccounts' });

    // set up ethers provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);


    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer address: " + address);
    router.push('api/idprotocols');

}

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <button type="button" onClick={() => main()}>Connect wallet address</button>
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