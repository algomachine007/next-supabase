import Head from "next/head"
import React from 'react'
import styles from './layout.module.css'


const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Harnesing Supabase with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>

        <div>
          <h1>
            Harnessing <span className={styles.spanColor}> Supabase</span>  with Next.js
          </h1>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout