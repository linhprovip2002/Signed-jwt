const mongoose = require('mongoose');




const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username:{
    type:String,
    require:true,
    maxlength:255,
    unique:true,
  },
  email:{
    type:String,
    require:true,
    maxlength:255,
    unique:true,
  },
  password:
  {
    type:String,
    require:true,
    minlength:6,
  },
  admin:
  {
    type:Boolean,
    default:false,
  }
   
},{timestamps:true});

module.exports =  mongoose.model('user',User)