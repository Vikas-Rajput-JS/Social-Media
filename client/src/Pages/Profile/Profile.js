import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Logo from "../Profile/Dev-logo.jpg";
function Profile() {
  const[follow,setfollow]=useState(true)
  const[UserData,setData]=useState([])
  const[AllUser,setUser]=useState([])
  const[text,settext]=useState('All Users')
  const[section,setsection]=useState('home')
  const[FollowingCount,setFolwingCount]=useState('')
  const[FollowerCount,SetFollowerCount]=useState('')
  const token = localStorage.getItem('token')
  const[Followers,setFollowers]=useState([])

  const[length,setlength]=useState(0)
  const FetchData = async()=>{
    






    const data = await fetch('http://localhost:5500/api/auth/getuserdetails',{
      headers:{"Content-Type":"application/json","Auth":token},
      method:"Post"
    })
    const res = await data.json()
    if(!res.user){
      setlength(0)
    }
    setData(res.user)

 
    
    
    if(section==='Following'){

    setfollow(false)
    const data2 = await fetch('http://localhost:5500/api/auth/following',{
      headers:{"Content-Type":"application/json","Auth":token},
      method:"Post",
      body:JSON.stringify({userId:UserData._id})
    })
    const res2 = await data2.json();
    console.log(res2)
setFolwingCount(res2.length)
  setUser(res2)

  
  if(!res2){
    setUser([])
    setlength(0)
  }
  
   
    setFollowers(res2)
  }
if(section==='home'){
 
  const data2 = await fetch('http://localhost:5500/api/auth/alluser ',{
    headers:{"Content-Type":"application/json","Auth":token},
    method:"Post",      

  })
  const res2 = await data2.json();
  // console.log(res2)
  let FilterData = res2.filter((item)=>{ return item._id !== UserData._id })
setfollow(false)
setUser(FilterData)

if(!res2){
  setUser([])
}


  setFollowers(res2.findfollowers)
}

if(section==='Followers'){
 setfollow(true)
  const data2 = await fetch('http://localhost:5500/api/auth/follower ',{
    headers:{"Content-Type":"application/json"},
    method:"Post",
    body:JSON.stringify({userId:UserData._id})
  })
  const res2 = await data2.json();

  SetFollowerCount(res2.length)
  setFollowers(res2)
  console.log(res2)
 
setUser(res2)
if(!res2){
  setUser([])
}


  setFollowers(res2.findfollowers)
}
  }
  
  useEffect(()=>{
 let FilterData = AllUser.filter((item)=> item._id !== UserData._id )
 setUser(FilterData)

    FetchData()
  },[section,UserData])
  


//   var imagekit = new ImageKit({
//     publicKey : "your_public_api_key",
//     urlEndpoint : "https://ik.imagekit.io/your_imagekit_id",
//     authenticationEndpoint : "https://www.yourserver.com/auth"
// });

// // Upload function internally uses the ImageKit.io javascript SDK
// function upload(data) {
//     var file = document.getElementById("file1");
//     imagekit.upload({
//         file : file.files[0],
//         fileName : "abc.jpg",
//         tags : ["tag1"]
//     }, function(err, result) {
//         console.log(arguments);
//         console.log(imagekit.url({
//             src: result.url,
//             transformation : [{ height: 300, width: 400}]
//         }));
//     })
// }




  return (
    <div className="w-[23%] h-[98vh] ml-3 shadow-gray-500 items-center flex flex-col justify-start shadow-2xl rounded-2xl">
      <div className="flex justify-around mt-2 w-full">
        <img className="bg-black rounded-full w-12" src={Logo} alt="" />
        <div className="flex bg-[#cecece94] w-[70%] rounded-xl py-1">
          <input
            className="w-44 rounded-lg py-2 bg-[#cecece2c] text-sm border-none focus:border-none placeholder:text-sm px-4 text-black "
            placeholder="#Explore"
            type="text"
          />
          <CiSearch
            size={40}
            className="ml-1 cursor-pointer  bg-yellow-300 rounded-xl"
          />
        </div>
      </div>
      <div className="w-[97%] mt-4 h-[45vh] rounded-xl bg-transparent shadow-lg shadow-slate-400">
        <div className="w-full h-[10vh]">
          <img
            className="w-full h-[17vh] rounded-xl"
            src="https://us.123rf.com/450wm/haiderali886/haiderali8862306/haiderali886230601002/207194761-blue-flag-atop-mountain-summit-majestic-heights-and-achievement.jpg?ver=6"
            alt=""
          />
        </div>
        <div className="w-full flex justify-center flex-col items-center text-black">
          <img
            className="rounded-full w-16 shadow-2xl shadow-black"
            src={Logo}
            alt=""
          />
          <h1 className="mt-4 text-black">{UserData.name}</h1>
          <h1 className="mt-2 text-black">{UserData.bio}</h1>
        </div>
        {/* <div className="w-[92%] bg-black h-[1px] ml-3 mt-1"></div> */}
        <div className="w-full h-16 flex justify-around items-center mb-3">
          <div>
            <h1 className="mt-4  text-black">{FollowerCount}</h1>
            <h1 className=" text-black text-xs cursor-pointer " onClick={()=>{setsection('Followers')
          console.log(section)
          settext('Who is following Me')}}>Followers</h1>
          </div>
          <div className="w-[1px] h-[50px] mt-2 bg-black  "></div>
          <div>
            <h1 className="mt-4  text-black">{FollowingCount}</h1>
            <h1 className=" text-black text-xs cursor-pointer " onClick={()=>{setsection('Following')
          console.log(section)
          settext('Who I Followed')}}>Following</h1>
          </div>
          <div className="w-[1px] h-[50px] mt-2 bg-black  "></div>
          <div>
            <h1 className="mt-4  text-black">5</h1>
            <h1 className=" text-black text-xs ">Posts</h1>
          </div>
        </div>
        {/* <div className="w-[92%] bg-black h-[1px] ml-3 mt-2"></div> */}
      </div>
      <div className="w-full h-auto overflow-auto scrollbar-hide mt-5 flex flex-col items-start ">
        <h1 className="ml-4">{text}</h1>
        {AllUser.map((item, id) => {
          return (
            <div className="w-[97%] ml-1 rounded-xl  mb-2 h-14 bg-transparent mt-5 flex items-center justify-between ">
              <img
                className="rounded-full w-10 shadow-2xl shadow-black ml-2"
                src={Logo}
                alt=""
              />
              <div>
                <h1 className="">{!follow? item.name:item.username}</h1>
                <h1 className="text-xs">@{!follow? item.name:item.username}</h1>
              </div>
              <button className="px-3 bg-yellow-300 mr-1 rounded-lg py-1" onClick={async(e)=>{
   if(section==='Following'){
    console.log(section)
    setfollow(true)
    const Update = await fetch(`http://localhost:5500/api/auth/unfollow/${item._id}`,{
      method:"Post",
      headers:{"Content-Type":"application/json"}
     
    
    })
    const res = await Update.json();
    console.log(res)
  }

  if(section==='Followers' || section==='home'){

 
    const Update = await fetch('http://localhost:5500/api/auth/startfollow',{
      method:"Post",
      headers:{"Content-Type":"application/json","Auth":token},
      body:JSON.stringify({userId:UserData._id,followId:item._id,name:item.name,username:UserData.name})
    
    })
    const res = await Update.json();
    console.log(res)


  }

  }
  
  
  
  
  }>

                 
                Follow
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
