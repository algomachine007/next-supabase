import { useState } from "react"

import axios from "axios"
import { AuthServerlessHookProps, AuthServerlessHookReturnType } from "./AuthServerlessHookType"

type User = {
  id: string,
  aud: string,
  role: string,
  email: string,
  app_metadata: {
    provider: string,
    providers: string[]
  },
}

const useAuthServerless = ({ mode, input }: NonNullable<AuthServerlessHookProps>): AuthServerlessHookReturnType => {
  const [user, setUser] = useState(null)

  const [authState, setAuthState] = useState({
    isLoading: false,
    isError: false,
    error: null,
    user: null,
    session: null,
  })

  const { email, password } = input

  const path: NonNullable<string> = mode


  const signin = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
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