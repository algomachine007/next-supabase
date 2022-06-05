import axios from "axios";
import React, { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    await axios.post("http://localhost:3000/api/signup", data).then(res => {
      console.log('RESPONSE SIGNUP', res)
    }
    ).catch(err => {
      console.log(err)
    }
    )
  }
  return (
    <div>Signup with serverless function

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setEmail(e.target.value)} />
        <input type="password" onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SignUp