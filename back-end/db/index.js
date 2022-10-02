const mongoose = require('mongoose');
async function connect()
{
   try {
    await mongoose.connect('mongodb://localhost:27017/CN_Web_BanHangDienTu_dev');
    console.log('connect sucessfully');
   } catch (error) {
    console.log('connect fail');
   }
}
module.exports ={connect};