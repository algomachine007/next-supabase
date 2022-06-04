import React, { useEffect } from 'react'
import Link from "next/link"
import Layout from './../components/Layout/Layout'
import { useRouter } from 'next/router'
import { useAuth } from "../lib/auth"

const Profile = () => {
  //@ts-ignore
  const { user, signOut, view } = useAuth();

  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])


  return (
    <Layout>
      <h2>{user?.email}</h2>
      <div className="heading">Last Signed In:</div>
      <code className="highlight">N/A</code>
      {user ? <button onClick={signOut}> Sign out</button> : 'Ok'}
    </Layout>
  )
}

export default Profile