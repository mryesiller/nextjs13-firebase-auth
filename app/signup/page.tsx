"use client"

import { useState, useContext } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Login() {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password).then(
      /* @ts-ignore */
      router.push("/dashboard")
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {/* @ts-ignore */}
      {error && <p>{error}</p>}
    </div>
  )
}
