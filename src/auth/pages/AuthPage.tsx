import { useState } from "react"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"

export default function AuthPage() {
  const [isTologin,setIsToLogin]=useState(true)
  return (
    <>
   {isTologin?(
    <div className="flex w-full h-full " >
      <div className=" flex-1/4 bg-gray-600 rotate-45  ">

      </div>
      <div className="flex-1/2">
        <LoginPage/>
      </div>
      <div className="flex-1/4 bg-gray-600 rotate-45 ">

      </div>
    </div>
   ):(
    <SignupPage/>

   )}

    </>
  )
}

