import React, { useEffect, useState } from 'react'
import useAuthServerless from "../hooks/useAuthServerless";
import { useRouter } from "next/router";
import ProfileWithServerlessFunction from "./ProfileWithServerlessFunction";
import { ModeType } from "../hooks/AuthServerlessHookType";

const AuthForm = ({ mode }: ModeType) => {
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
    }
  }

  useEffect(pushToSignin, [user, router])



  return (
    <div>
      <h2>    {mode.toUpperCase()} with serverless function  </h2>
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