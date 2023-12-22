import { Outlet,Link } from "react-router-dom"
import { useUser,UserProvider } from "../../userContext"
import { useEffect, useState } from "react"

import './Start.css'
const Start =()=>{
    //userContext
    const {user,setUser}=useUser();
   // layout classname
   const[startClass,setStartClass]=useState('start')

    //handle log in /log out
    const handleClick=()=>{
        setUser((prev)=>({
            ...user,
            isLogged:!prev.isLogged
        }))
        
    }
    
    //useEffect
    useEffect(()=>console.log(user.isLogged),[user]);
    useEffect(()=>setStartClass(()=>user.isLogged?'layout':'start'),[user]);
    useEffect(()=>console.log(startClass),[user]);
    
    //Side bar routes
    const routesArr=['Dashboard','Stock','Addbill']
    return(
        <UserProvider>
        <div className={startClass}>
        
       
        
       
        
        <div className={user.isLogged?'sidebar':'no-sidebar'}>
        <div className={user.isLogged?'sidebar-header':'start-header'}><h1>con-sale</h1></div>
        {user.isLogged?<button className='logout-btn' onClick={handleClick}>log out</button>:<button className='login-btn' onClick={handleClick}>log in</button>}
        
        {user.isLogged?<ul className='sidebar-list'>{routesArr.map((x)=><li><Link to={`${x}`}>{x}</Link></li>)}</ul>:<br/>}<Outlet />
        
        </div>
        {user.isLogged?<div className = 'route-viewport'> content </div>:<div></div>}
        </div>
        </UserProvider>
        
    )
}
export default Start