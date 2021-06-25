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

  async function poh() {
    // connect to metamask
    await ethereum.request({ method: 'eth_requestAccounts' });

    // set up ethers provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer address: " + address);

    // connect to proof of humanity
    let POH_CONTRACT_ADDRESS = '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb';
    // STILL NEED TO DO THIS
    let POH_ABI;

    // Assign new PoH Web3 instance
    const pohContract = new ethers.Contract(POH_CONTRACT_ADDRESS, POH_ABI, provider);

    let result = await pohContract.functions.isRegistered(address).call();

    console.log(result);

}

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Which protocol do you want to connect?</p>
        <button type="button" onClick={() => poh()}>Proof of Humanity</button>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <button type="button" onClick={() => poh()}>BrightID</button>
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