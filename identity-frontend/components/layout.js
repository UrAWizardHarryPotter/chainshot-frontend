import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const name = 'Webport Address';
const tagline = '"One-click identity login for the Internet"';
export const siteTitle = 'Identity PoC';

export default function Layout({ children, home }) {
  return (
    <Container>
    <div className={styles.container}>
      <Head>
      <link
          async
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.0/dist/semantic.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A pooled identity proof of concept"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
            <h2 className={utilStyles.headingSm}>{tagline}</h2>
          </>
        ) : (
          <>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
    </Container>
  )
}