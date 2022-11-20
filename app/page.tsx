"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../firebase/config"
import firebaseErrors from "../firebase/errorCodes"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"

export default function Login() {
  const Router = useRouter()

  const [currentError, setCurrentError] = useState("")
  const [loginScreen, setLoginScreen] = useState(true)

  const loginHandler = useCallback(
    async (event: any) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        Router.push("/dashboard")
      } catch (error: any) {
        /* @ts-ignore */
        setCurrentError(firebaseErrors[error.code])
      }
    },
    [Router]
  )

  const registerHandler = useCallback(
    async (event: any) => {
      event.preventDefault()
      const { email, password, confirmPassword } = event.target.elements
      try {
        if (password !== confirmPassword) {
          return alert("Passwords do not match")
        }
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        Router.push("/dashboard")
      } catch (error: any) {
        setCurrentError(error.message)
      }
    },
    [Router]
  )

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={loginScreen ? loginHandler : registerHandler}
        >
          <h1 className="text-center text-gray-700 text-sm font-bold mb-4 ">
            {loginScreen ? "Login" : "Register"}
          </h1>
          {currentError && (
            <p className="text-red-500 text-xs italic">{currentError}</p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
            />
          </div>
          {!loginScreen ? (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loginScreen ? "Login" : "Register"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
              onClick={() => setLoginScreen(!loginScreen)}
            >
              Not Registered yet ?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 FarmerDeck. All rights reserved.
        </p>
      </div>
    </div>
  )
}
