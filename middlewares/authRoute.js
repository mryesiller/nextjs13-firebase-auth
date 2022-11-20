"use client"

import { auth } from "../firebase/config"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"

const AuthRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)

  const Router = useRouter()

  if (user) {
    return <>{children}</>
  } else {
    Router.push("/")
    return <h1>LOADING</h1>
  }
}

export default AuthRoute
