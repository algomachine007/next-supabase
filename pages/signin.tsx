import axios from "axios";
import React, { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    await axios.post("http://localhost:3000/api/signin", data).then(res => {
      console.log('RESPONSE SIGNIN', res)

      //@ts-ignore
      setUser(res)
    }
    ).catch(err => {
      console.log(err)
    }
    )
  }

  console.log(user)
  return (
    <div>Signin with serverless function

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setEmail(e.target.value)} />
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignIn