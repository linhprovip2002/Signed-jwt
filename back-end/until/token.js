
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();

module.exports = 

{
   GenerateRefeshAccpectToken(user)
   {
      return jwt.sign( {
                  id : user.id,
                  admin: user.admin
               },process.env.JWT_refresh_Key,
               {
                  expiresIn:"30d"
               });
   },

   GenerateAccpectToken(user){
      return jwt.sign( {
         id : user.id,
         admin: user.admin
      },process.env.JWT_access_Key,
      {
         expiresIn:"20s"
      });
   }
}


