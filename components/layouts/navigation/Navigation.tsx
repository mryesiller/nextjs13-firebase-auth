"use client"

import React from "react"
import { auth } from "../../../firebase/config"
import { useAuthState } from "react-firebase-hooks/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"

function NavigationBar() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const handleLogout = async () => {
    await auth.signOut().then(() => {
      /* @ts-ignore */
      router.push("/")
    })
  }

  return (
    <header className="p-5">
      <nav className="flex justify-between">
        <Link href="/dashboard" className="text-2xl font-bold">
          TodoApp
        </Link>
        <ul className="flex">
          {user ? (
            <>
              <li className="mr-5">
                <h2>{user.email}</h2>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="mr-5">
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavigationBar
