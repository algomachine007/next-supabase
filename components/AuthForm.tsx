import React, { useEffect, useState } from 'react'
import useAuthServerless from "../hooks/useAuthServerless";
import { useRouter } from "next/router";
import ProfileWithServerlessFunction from "./ProfileWithServerlessFunction";

const AuthForm = ({ mode }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const input = {
    email,
    password,
  }

  const { user, signin, signout } = useAuthServerless({ mode, input });
  console.log('USER', user);

  const pushToSignin = () => {
    //@ts-ignore
    if (user?.data?.activeSession === null && user?.data?.user) {
      router.push('/signin')
    } else {
      //@ts-ignore
      // if (user?.data?.activeSession) {
      //   //@ts-ignore
      //   router.push('/profileForServerlessAuth')
      // }
    }
  }

  useEffect(pushToSignin, [user])



  return (
    <div>{mode.toUpperCase()} with serverless function

      <form onSubmit={signin}>
        <input type="text" onChange={e => setEmail(e.target.value)} />
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <button type='submit'>{mode.toUpperCase()}</button>
      </form>

      <button onClick={signout}> {mode === 'signin' && <p>Signout</p>}</button>


      <div>
        {user && mode === 'signin' && <ProfileWithServerlessFunction user={user} />}
      </div>
    </div>
  )
}

export default AuthForm