import { useDispatch } from "react-redux";
import type { UserType } from "../../types/types";
import { loginInUser } from "../../slice/userSlice";

interface userValidationProps{
    email:string;
    password:string;
}

export default function userValidation() {
   const dispatch=useDispatch()
    const users=JSON.parse(localStorage.getItem('users')||'[]')
   return (({email,password}:userValidationProps)=>{
      console.log(email,password)
      const user:UserType=users.find((activeUser:UserType)=>{
          console.log(activeUser.email===email && activeUser.password===password)
           return activeUser.email===email && activeUser.password===password
    })
    console.log(user)
    if(user){
      console.log('this is if part')
      console.log(user)
      dispatch(loginInUser(user))
      return true
    }
    else{
      console.log('this is else part')
      console.log(user)
       return false
    }
   }
   )}
