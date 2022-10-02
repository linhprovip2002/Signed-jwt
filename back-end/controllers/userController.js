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
 }


 module.exports = new userController;