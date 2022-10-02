const user = require("../model/user");
const authRoute  =      require("./auth");
const userRoute = require("./user");


function route(app)
{
    app.use('/auth',authRoute);
    app.use('/user',userRoute)
}

module.exports = route;