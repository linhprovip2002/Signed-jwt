const { model } = require("mongoose");
const User = require("../model/user")
const bcrypt = require('bcrypt');
const user = require("../model/user");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const token = require('../until/token');
const cookie = require('cookie-parser')
dotenv.config();


let refeshtokens=[];//create array inclue refresh token.. represents the database
class authController {
    // register
    
    async registerUser(req,res,next)
    {
         try {
            const checkuser =await User.findOne({username:req.body.username});
            if(checkuser)
            { 
                 return res.status(500).json('user exits')
            }
            else{
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);
            //create user
            const  newUser = await new User({
                username: req.body.username,
                email : req.body.email,
                password: hashed
            })
            
            //save to database
            
            const user = await newUser.save();
            res.status(200).json(user)}
         } catch (error) {
            res.status(500).json(err);
         }
    }
    async loginUser(req,res,next)
    {
      try {
        
        const user = await User.findOne({username:req.body.username});
        //res.json(user);
        //res.json(req.body.password);
        if(!user)
        {
            return res.status(404).json("user not found");
        }
        else
        {
            const checkpass = await bcrypt.compare(req.body.password,user.password);
            //console.log(checkpass);
            if(!checkpass)
            {
                return res.status(404).json("password incorrect");
            }
            else
            {
             const accpectToken = token.GenerateAccpectToken(user);
             const refreshtoken =token.GenerateRefeshAccpectToken(user);
             res.cookie("refreshToken",refreshtoken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict",
             })
             //lấy tất cẩ trừ password
             const{password,...other}= user._doc;

             res.status(200).json({...other,accpectToken});
          
            }
        }
        
        
      } catch (error) {
          res.status(500).json(error)
        // console.log( process.env.JWT_access_Key)
       
      }
    }
    async requestRefreshToken(req,res)
    {
        //take refresh token from user
        const refeshtoken = req.cookies.refreshToken;
        //console.log(refeshtoken);
        if(!refeshtoken) return res.status(401).json("You're not authentication");
       
        if(refeshtokens.includes(refeshtoken)) //check
        {
            return res.status(403).json("refresh Token is not valid");
        }
        
        jwt.verify(refeshtoken,process.env.JWT_refresh_Key,(err,user)=>
        {
            if(err)
            {
                console.log(err);
            }
            refeshtokens = refeshtokens.filter((token)=> token !== refeshtoken);//replace  refresh token with new refresh token in array.
            
            //create new accessToken and refreshToken
            const newAccessToken = token.GenerateAccpectToken(user);  
            const newRefreshToken = token.GenerateRefeshAccpectToken(user);
            refeshtokens.push(newRefreshToken); //  put newRefreshToken in an array
            //console.log(refeshtokens);
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict",
             })
             res.status(200).json({accpectToken: newAccessToken})
        });
        
    }
    async userLogout(req,res)
    {
        res.clearCookie("refreshToken");
        refeshtokens = refeshtokens.filter(token =>token!==req.cookies.refreshToken);
        res.status(200).json('log out sucessfully')
    }


}

module.exports = new authController;