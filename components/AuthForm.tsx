import React, { useEffect, useState } from 'react'
import useAuthServerless from "../hooks/useAuthServerless";
import { useRouter } from "next/router";
import ProfileWithServerlessFunction from "./ProfileWithServerlessFunction";
import { ModeType } from "../hooks/AuthServerlessHookType";

const initialState = {
  email: '',
  password: '',
}

const AuthForm = ({ mode }: ModeType) => {

  const router = useRouter()

  const [inputValue, setInput] = useState(initialState);

  const updateInputState = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }

  const { email, password } = inputValue

  const input = {
    email,
    password,
  }

  const { user, session, signin, signout } = useAuthServerless({ mode, input });

  const redirector = () => {
    if (session === null && user) {
      router.push('/signin')
    }
  }

  useEffect(redirector, [user, router, session])

  return (
    <div>
      <h2> {mode.toUpperCase()} with serverless function  </h2>

      <form onSubmit={signin}>
        <label> Email </label>
        <input type="text" name='email' onChange={updateInputState} />

        <label> Password </label>
        <input type="password" name='password' onChange={updateInputState} />
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