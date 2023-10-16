import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {Link} from 'react-router-dom'

function Signup() {
    const Navigate = useNavigate()
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[confpass,setconfpass]=useState('')


  useEffect(()=>{
    if(localStorage.getItem('token')){
  Navigate('/home')
    }

  })
 


    const OnSubmit = async()=>{
        console.log(email)
        const PushData = await fetch('http://localhost:5500/api/auth/signup',{
            method:"Post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:name,email:email,password:password})
        })
        const res = await PushData.json();
        console.log(res)
        if(res.AuthToken){
setTimeout(() => {
    Navigate('/login')
}, 2000);
        }
    }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[30%] h-auto bg-green-500 shadow-lg shadow-slate-600'>

<div className='flex flex-col justify-center h-36 items-center'>
    <label htmlFor="" className='w-[70%] flex text-xs mb-2 text-purple-500'><h1 >Enter Full Name</h1></label>
    <input onChange={(e)=>{
 setname(e.target.value)
    }} className='py-2 px-3 text-sm w-[70%] placeholder:text-center text-center shadow-lg placeholder:text-sm  ' placeholder='Enter Your Name' type="text" name="" id="" />
    {/* <label htmlFor="" className='w-[70%] flex text-xs  mt-2 text-red-500'><h1 >Enter Password</h1></label> */}
</div>
<div className='flex flex-col justify-center  items-center'>
    <label htmlFor="" className='w-[70%] flex text-xs mb-2 text-purple-500'><h1 >Enter Email Address</h1></label>
    <input onChange={(e)=>{
 setemail(e.target.value)
 console.log(email)
    }} className='py-2 px-3 w-[70%] text-sm placeholder:text-center text-center shadow-lg placeholder:text-sm  ' placeholder='Enter Your Email' type="text" name="" id="" />
    {/* <label htmlFor="" className='w-[70%] flex text-xs  mt-2 text-red-500'><h1 >Enter Password</h1></label> */}
</div>
<div className='flex flex-col justify-center h-36  items-center'>
    <label htmlFor="" className='w-[70%] flex text-xs mb-2 text-purple-500'><h1 >Enter Password</h1></label>
    <input onChange={(e)=>{
 setpassword(e.target.value)
 console.log(password)
    }} className='py-2 px-3 w-[70%] text-sm placeholder:text-center text-center shadow-lg placeholder:text-sm ' placeholder='Enter Your Password' type="password" name="" id="" />
    {/* <label htmlFor="" className='w-[70%] flex text-xs  mt-2 text-red-500'><h1 >Enter Password</h1></label> */}
</div>
<div className='flex flex-col justify-center   items-center'>
    <label htmlFor="" className='w-[70%] flex text-xs mb-2 text-purple-500'><h1 >Confirm Password</h1></label>
    <input onChange={(e)=>{
 setconfpass(e.target.value)
    }} className='py-2 px-3 w-[70%] text-sm placeholder:text-center text-center shadow-lg placeholder:text-sm ' placeholder='Confirm Password' type="password" name="" id="" />
    {/* <label htmlFor="" className='w-[70%] flex text-xs  mt-2 text-red-500'><h1 >Enter Password</h1></label> */}
</div>
<div className='flex flex-col justify-center h-28 items-center'>
    
    <input onClick={OnSubmit} className='py-2 px-3 w-[60%] bg-orange-400 placeholder:text-center text-center shadow-lg placeholder:text-sm ' placeholder='Enter Your Password' type="submit" name="" id="" />
  <label htmlFor="" className='w-[50%] flex text-xs  mt-4 text-black'><h1 >Already Have Account ? <Link to={'/login'} className='text-indigo-500'>Log In Here</Link></h1></label>
  
</div>
      </div>
    </div>
  )
}

export default Signup
