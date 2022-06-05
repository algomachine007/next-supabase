import axios from "axios"

import { useState } from "react"


const useAuthServerless = ({ mode, input }: any) => {
  const [user, setUser] = useState(null)

  const { email, password } = input

  const path = mode

  const signin = async (e: any) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    await axios.post(`${process.env.NEXT_PUBLIC_URL
      }${path}`, data).then(res => {
        //@ts-ignore
        setUser(res)
      }
      ).catch(err => {
        console.log(err)
      }
      )
  }

  const signout = async () => {

    await axios.post(`${process.env.NEXT_PUBLIC_URL}signout`).then(res => {

      //@ts-ignore
      setUser(null)
    }
    ).catch(err => {
      console.log(err)
    }
    )
  }

  return { user, signin, signout }

}

export default useAuthServerless