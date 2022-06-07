import { useState } from "react"

import axios from "axios"
import { AuthServerlessHookProps, AuthServerlessHookReturnType } from "./AuthServerlessHookType"
import { Session, User } from "@supabase/gotrue-js/src/lib/types"
import { AuthChangeEvent } from "@supabase/supabase-js";
import toaster from "../helpers/toaster";

const useAuthServerless = ({ mode, input }: AuthServerlessHookProps): AuthServerlessHookReturnType => {

  const [authState, setAuthState] = useState({
    error: null,
    user: null,
    session: null,
  })

  const { email, password } = input

  const path: NonNullable<string> = mode

  const signin = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const data = {
      email,
      password,
    }
    await axios.post(`${process.env.NEXT_PUBLIC_URL
      }${path}`, data).then(res => {

        const { user: authenticatedUser, activeSession, error: authError } = res.data

        setAuthState({
          error: authError,
          user: authenticatedUser,
          session: activeSession,
        })
        toaster()
      }
      ).catch(err => {
        setAuthState({
          ...authState,
          error: err,
        })
      }
      )
  }

  const signout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_URL}signout`).then(res => {
      const { user: authenticatedUser } = res.data
      setAuthState({
        ...authState,
        user: authenticatedUser,
      })
    }
    ).catch(err => {
      console.log(err)
    }
    )
  }

  const { user, error, session } = authState

  return { user, error, session, signin, signout }

}

export default useAuthServerless