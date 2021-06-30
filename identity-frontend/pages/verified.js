import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';
import React, { useState, useEffect, Component } from 'react';

export default function Verified(props) {
  const router = useRouter();

  return (
    <Layout home>
      <Head>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Connected!</p>
      </section>
    </Layout>
  )
}