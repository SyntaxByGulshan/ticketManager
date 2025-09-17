
import type { UserType } from '../../types/types'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../slice/userSlice';
interface userRegisterProps{
   userName:string;
  email:string;
  password:string;

}
export default function userRegister() {
    const users:UserType[]=JSON.parse(localStorage.getItem('users')||"[]")
    const dispatch=useDispatch()
    const totalusers=users.length
    function chekemail(email:string):boolean{
      const findUser = users.find((u:UserType)=>{
            return (u.email===email)
        })
        if(findUser){
          return true
        }
        else{
          return false
        }
    }
  return (
    ({userName,email,password}:userRegisterProps)=>{
         
         const isAvailabe=chekemail(email)
          if(!isAvailabe){
            const newUser:UserType={
            userName:userName,
            email:email,
            password:password,
            userId:`${1000+totalusers}`,
            authLeval:'user'
         }
         dispatch(signUpUser(newUser))
       return true  
          }
          else{
            return false
          }
        
    }
  )
}
