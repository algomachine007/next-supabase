import React from 'react'
import ProfileWithServerlessFunction from "../components/ProfileWithServerlessFunction";
import useAuthServerless from "../hooks/useAuthServerless";

import Layout from './../components/Layout/Layout'

const ProfileForServerlessAuth = () => {

  return (
    <Layout>
      <ProfileWithServerlessFunction user={user} />
    </Layout>
  )
}

export default ProfileForServerlessAuth