const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const route = require('../back-end/routes');
//connect to db
const db = require('./db/index');
//connect to db
db.connect();

const port = 3000 || process.env.PORT;
const app = express();  

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//route 
route(app);
//authentication


//authorization

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})