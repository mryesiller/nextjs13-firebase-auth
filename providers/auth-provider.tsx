"use client"

import { createContext, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase/config"
import { useRouter } from "next/navigation"

type Props = {
  currentUser: any
  currentLoading: any
  currentError: any
  createUser: any
  loginUser: any
  logout: any
}

export const AuthContext = createContext({
  currentUser: null,
  currentError: null,
  currentLoading: false,
  createUser: () => {},
  loginUser: () => {},
  logout: () => {},
})

export default function Authprovider({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentUser, setCurrentUser] = useState()
  const [currentError, setCurrentError] = useState()
  const [currentLoading, setCurrentLoading] = useState()
  const router = useRouter()

  const createUser = (email: any, password: any) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginUser = async (email: any, password: any) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)

    router.push("/login")
  }

  const contextValue: Props = {
    currentUser,
    currentError,
    currentLoading,
    createUser,
    loginUser,
    logout,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
