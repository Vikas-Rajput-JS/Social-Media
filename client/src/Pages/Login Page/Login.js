import React,{ useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router'
function Login() {
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const Navigate = useNavigate()

   
    useEffect(()=>{
      if(localStorage.getItem('token')){
        Navigate('/home')
      }else Navigate('/login')
  
    },[])
    const OnSubmit = async()=>{
        console.log(email)
        const PushData = await fetch('http://localhost:5500/api/auth/login',{
            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:email,password:password})
        })
        const res = await PushData.json();
        console.log(res)
        if(res.token){
setTimeout(() => {
    localStorage.setItem('token',res.token)
    Navigate('/home')
}, 2000);
        }
    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[30%] h-[55vh] bg-green-500 shadow-lg shadow-slate-600'>

<div className='flex flex-col justify-center h-36 items-center'>
    <label htmlFor="" className='w-[70%] flex text-sm mb-2'><h1 >Enter Email Address</h1></label>
    <input onChange={(e)=>{
        setemail(e.target.value)
    }} className='py-2 px-3 w-[70%] placeholder:text-center text-center shadow-lg placeholder:text-sm  ' placeholder='Enter Your Email' type="text" name="" id="" />
</div>
<div className='flex flex-col justify-center  items-center'>
    <label htmlFor="" className='w-[70%] flex text-sm mb-2'><h1 >Enter Password</h1></label>
    <input onChange={(e)=>{
        setpassword(e.target.value)
    }}  className='py-2 px-3 w-[70%] placeholder:text-center text-center shadow-lg placeholder:text-sm ' placeholder='Enter Your Password' type="password" name="" id="" />
</div>
<div className='flex flex-col justify-center h-36 items-center'>
    
    <input onClick={OnSubmit} className='py-2 px-3 w-[60%] bg-orange-400 placeholder:text-center text-center shadow-lg placeholder:text-sm ' placeholder='Enter Your Password' type="submit" name="" id="" />
<label htmlFor="" className='w-[50%] flex text-xs  mt-4 text-black'><h1 >Don't  Have Account ? <Link to={'/'} className='text-indigo-500'>Sign Up Here</Link></h1></label>
</div>
      </div>
    </div>
  )
}

export default Login
