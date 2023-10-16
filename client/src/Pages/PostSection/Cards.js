import React, { useEffect, useState } from 'react'
import {AiOutlineHeart} from 'react-icons/ai'
import {FaRegCommentDots,FaHeart,FaShare} from 'react-icons/fa'
import Logo from "../PostSection/Dev-logo.jpg";
function Cards() {
  const[blur,setblur] = useState('')
  const[Post,setPost]=useState([])
  const[likebtn,setlike] = useState(false)
  const[loading,setloading]=useState(false)
  const key = localStorage.getItem('display')
  useEffect(()=>{
    if(localStorage.getItem('display')){
      setblur('5px')
    }else{
      setblur('')
    }


    const getdata =async()=>{
 
      const posts = await fetch('http://localhost:5500/api/auth/post/getpost',{
        headers:{"Content-Type":"aplication/json"},
        method:"POST",
        body:JSON.stringify({userId:["65029e104e088f7c659ee720","65029dfc4e088f7c659ee71c","65029e459004a3a9bdcc8976"]})
      })
      const res = await posts.json()
      setPost(res)
      console.log(res,"=============")
    
    }
getdata()

  },[key,Post])

const Liked = async(e)=>{
  window.scrollBy(50)
  const like = await fetch('http://localhost:5500/api/auth/post/like',{
    method:"Post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({_id:e._id}),
  })
  const res = await like.json()
  console.log(res)
  console.log(e._id)
}


  
  return (
    
    <div style={{filter:`blur(${blur})`}} className='w-full flex flex-col mt-[16vh] '>
      {
        Post.map((item,id)=>{
          return(

       
    <div className='w-full bg-white h-[74vh]  shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
      <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>{item.name}</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src={item.pic} alt="" />
      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3  items-center'>

        <FaHeart size={25} cursor={'pointer'}  color={item.islike?"red" :"black"} onClick={
         
          async()=>{
            
        
  const like = await fetch('http://localhost:5500/api/auth/post/like',{
    method:"Post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({_id:item._id}),
  })
  const res = await like.json()
  console.log(res)
 
}} />
        <FaRegCommentDots onClick={()=>{
               window.scroll({ bottom: 0, left: 0,  behavior: 'smooth' });
        }} cursor={'pointer'} size={25}/>
        <FaShare cursor={'pointer'} size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>{item.caption}</h1>
      </div>
    </div>
       )
      })
    }
    {/* <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/1591712225260.webp" alt="" />

      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div>
    <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/1590514757306.webp" alt="" />
      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div>
    <div className='w-full bg-white h-[74vh] shadow-lg  flex flex-col  items-center  rounded-xl mt-5'>
    <div className='w-full flex mt-1 items-center  '>
      <img
                className="rounded-full  w-10 shadow-2xl  shadow-black ml-6"
                src={Logo}
                alt=""
              />
              <h1 className='ml-2'>Vikas Rajput</h1>
      </div>
      <img className='w-[97%] h-[50vh] mt-2 rounded-xl' src="https://dlcdnrog.asus.com/rog/media/168080574510.webp" alt="" />
      <div className='w-full flex justify-start items-start'>
        <div className='w-[15%] flex  justify-around mt-3 ml-3 items-center'>

        <FaHeart className='cursor-pointer' size={25} color='red'/>
        <FaRegCommentDots className='cursor-pointer' size={25}/>
        <FaShare className='cursor-pointer' size={23}/>
        </div>
      </div>
      <div className='w-full flex flex-col mt-2 justify-start items-start'>

        <h1 className='text-sm text-zinc-400 ml-3 '>345 Likes</h1>
        <h1 className='text-sm text-zinc-400 ml-3 mt-1 '>Welcome To Developer's Zone</h1>
      </div>
    </div> */}
    </div>
  )
}

export default Cards
 