import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';
import pohABI from '../pohABI.json';
import React, { useState, useEffect } from 'react';

export default function Verifying({props}) {
  const router = useRouter();


  async function pohHuman() {
    // connect to metamask
    await ethereum.request({ method: 'eth_requestAccounts' });

    // set up ethers provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log("signer address: " + address);

    // connect to proof of humanity
    let POH_CONTRACT_ADDRESS = '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb';
    // Parse poh ABI
    let POH_ABI = JSON.parse(pohABI.result);

    // Assign new PoH Web3 instance
    const pohContract = new ethers.Contract(POH_CONTRACT_ADDRESS, POH_ABI, provider);

    let result = await pohContract.functions.isRegistered(address);

    console.log(result[0]);
    return result[0];
  }

  useEffect(() => {
    pohHuman();
  });

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Connecting identity...</p>
      </section>
    </Layout>
  )
}