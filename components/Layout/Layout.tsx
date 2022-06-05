import Head from "next/head"
import React from 'react'

const Layout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2" >
      <Head>
        <title>Harnesing Supabase with Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>

        <div>
          <h1>
            Harnesing <span style={{ color: '#17b951' }}> Supabase</span>  with Next.js
          </h1>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout