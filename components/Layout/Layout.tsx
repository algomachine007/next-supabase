import Head from "next/head"
import React from 'react'

const Layout = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Harnesing Supabase with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>

        <div>
          <h1>
            Harnessing <span style={{ color: '#17b951' }}> Supabase</span>  with Next.js
          </h1>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout