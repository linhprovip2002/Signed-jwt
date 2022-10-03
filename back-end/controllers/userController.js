const { model } = require("mongoose");
const User = require("../model/user")
const bcrypt = require('bcrypt');

const user = require("../model/user");


 class userController
 {
     async getalluser(req,res,next)
     {
        try {
                const user = await  User.find();
                res.status(200).json(user)
                
        } catch (error) {
            res.status(500).json(error);
        }

     }
     async deleteUser(req,res,next)
     {
        try {
            const user = await User.findById(req.params.id);
           if(user) {
           res.status(200).json("delete sucessfully");
          
        }
        } catch (error) {
           res.status(500).json(error);
        }
     }
     async edituser(req,res)
     {
         try {
            
            var password = req.body.password;
            bcrypt.genSalt(10,function(err,salt)
            {  if(err) return res.status(500).json("fail salt");
               bcrypt.hash(password,salt,function(err,hash) {
                  if(err) return res.status(500).json("fail hash");
                  req.body.password = hash;
                  console.log(hash);
                  User.findByIdAndUpdate(req.params.id,{$set:req.body},function(err,user){
                  if(err) return res.status(401).json("don't mapping");
                  return res.status(200).json(user);
               })
            })
            })
            
         } catch (error) {
            res.status(500).josn(error)
         }
     }
 }


 module.exports = new userController;