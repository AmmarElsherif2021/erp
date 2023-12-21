import { Outlet,Link } from "react-router-dom"
import { useUser,UserProvider } from "../../userContext"
import { useEffect } from "react"
const Start =()=>{
    const {user,setUser}=useUser()
    const handleClick=()=>{
        setUser((prev)=>({
            ...user,
            isLogged:!prev.isLogged
        }))
    }
    
    //useEffect
    useEffect(()=>console.log(user.isLogged),[user])
    return(
        <UserProvider>
        <div>
        <h1>Start</h1>
        <button onClick={handleClick}>toggle user</button> 
        <Link to={user.isLogged?'Dashboard':'Login'}>Start</Link>
        <Outlet/>
        
      
        </div>
        </UserProvider>
        
    )
}
export default Start