import React, { useState } from "react";
import Logo from "../PostSection/Dev-logo.jpg";
import { BsImageFill } from "react-icons/bs";
import {MdPlayCircleOutline} from 'react-icons/md'
import {TfiLocationPin} from 'react-icons/tfi'

import {BsCalendar2Date} from 'react-icons/bs'
import Cards from "./Cards";
function PostSec() {
  const[display,setdisplay] = useState('none')
  const[caption,setcaption] = useState('')
  const[blur,setblur] = useState('0px')
  const[img,setimg] = useState('')
  const[loading,setloading]=useState(false)

  function OpenFile(){
    let input = document.getElementById('file_input')
document.getElementById('file_input').click();

   
  }
  let input = document.getElementById('file_input')
let image;

const CreatePost = async()=>{
  window.scroll({ bottom: 0, left: 0,  behavior: 'smooth' });
         setloading(true)  
         localStorage.setItem('loading',true) 
        
  const like = await fetch('http://localhost:5500/api/auth/post/createpost',{
    method:"Post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      pic:"https://i.pinimg.com/originals/25/25/0a/25250a0b1df5d8dbd9d43c7e7d45268e.jpg",
    userId:"65029e104e088f7c659ee720",
    name:"Nikki Rajput",
    caption:caption
  
  
  })
  })
  const res = await like.json()
  console.log(res)
 setTimeout(() => {
  setloading(false)
  localStorage.setItem('loading',false) 
 }, 5000);
}


  return (
    <>
    
    <div onClick={()=>{
      setblur('')
      localStorage.removeItem('display')
      setdisplay('none')
    }}  className="w-[54%] h-[97vh]  overflow-auto scrollbar-hide  bg-transparent shadow-xl shadow-zinc-500 rounded-lg ml-2">
      <div className=" fixed w-[53%] z-20  bg-slate-100 h-[18vh] rounded-lg shadow-lg flex flex-col " style={{filter:`blur(${blur})`}}>
        <div className="w-full flex items-center justify-center h-20">
          <img className="bg-black rounded-full w-12" src={Logo} alt="" />
          <input onChange={(e)=>{
            setcaption(e.target.value)
          }}
            className="w-[80%] ml-8 rounded-lg py-2 bg-[#cecece5e] text-sm border-none focus:border-none placeholder:text-sm px-4 text-black "
            placeholder="What's Happening ?"
            type="text"
          />
          <input className="hidden" type="file" name="" id="file_input" onChange={(e)=>{
            const file = e.target.files[0]
            
          console.log(URL+file.name)
            console.log(file)
            localStorage.setItem('display','blur')
            setdisplay('')
            setimg(file.name)
            image = file.name;
            setblur('5px')

          }}  />
        </div>
        <div className="w-full flex justify-evenly items-center mb-3">
          <div className="flex w-16 justify-between items-center" onClick={OpenFile}>
            <BsImageFill className='cursor-pointer' size={20} color="green" />
            <h1 className="text-green-500 text-sm cursor-pointer">Photo</h1>
          </div>
          <div className="flex w-16 justify-between ml-8 items-center">
            <MdPlayCircleOutline className='cursor-pointer' size={20} color="purple" />
            <h1 className="text-purple-500 text-sm cursor-pointer">Video</h1>
          </div>
          <div className="flex w-20 justify-between ml-8 items-center">
            <TfiLocationPin className='cursor-pointer' size={20} color="red" />
            <h1 className="text-red-500 text-sm cursor-pointer">Location</h1>
          </div>
          <div className="flex w-24 justify-between ml-8 items-center">
            <BsCalendar2Date className='cursor-pointer' size={20} color="blue" />
            <h1 className="text-cyan-500 text-sm cursor-pointer">Sechdule</h1>
          </div>
          <button className="px-3 bg-yellow-300 mr-1 rounded-lg py-1" onClick={CreatePost}>Share</button>
        </div>
      </div>
        <Cards/>
        
      
      
    </div>
     
    {/* <div className="absolute top-[25vh] left-[30%]" style={{display:`${display}`}}>

    <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src='../../../../../../Pictures/desktop-wallpaper-lord-krishna-shree-krishna-krishna-radha-painting-krishna-thumbnail.jpg' alt="" />
    </div> */}
 
    </>
  );
}

export default PostSec;
