import Head from "next/head"
import React from 'react'

const Layout = ({ children }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Next.js with Supabase Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: 'flex', justifyContent: 'center' }}>

        <div>
          <h1>
            Next.js with <span>Supabase</span>
          </h1>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout