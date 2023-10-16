const JWT = require('jsonwebtoken')
const SECRET_KEY = "59358JDGKJD@#gfdfgAKSDJH";
const FetchUser = async(req,res,next)=>{
const token = req.header('Auth')
if(!token){
    res.status(501).json({error:"Please Login Using Valid Auth Token"})
}
try {
    

const data = JWT.verify(token,SECRET_KEY)
req.user = data.user;
next()
} catch (error) {
    console.log(error)
    res.status(501).json({error:"Please Login Using Valid Auth Token"})
}

}

module.exports=FetchUser;