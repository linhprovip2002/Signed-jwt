const jwt = require('jsonwebtoken');
const user = require('../model/user');
const dotenv= require('dotenv');
dotenv.config();


 class middleware

{ verifyToken(req,res,next)
    {
        const token = req.headers.token;
        if(token)
        { 
           const  acessToken = token.split(" ")[1];
           jwt.verify(acessToken,process.env.JWT_access_Key,(err,user)=>
           {
            if(err)
            {
              //console.log(acessToken);
              return res.status(403).json("token is not value");
            }
            else{
            req.user = user;
            //console.log(user.admin);
            next();}
           })
        }
        else
        {
          return  res.status(401).json("you're not authenticated middleware");
        }
    }
    verifyTokenAndAdmin(req,res,next)
  {
    if(req.user.id == req.params.id || req.user.admin)
      {   next();}
    else{
      return  res.status(401).json("you're not authenticated");
    }
       
  } }
 module.exports=new middleware;