const express=require("express");
const bcryptjs = require("bcryptjs");
const { userRouter } = require('./Routes/user.routes');
const { connection } = require("./db");
const { postRouter } = require("./Routes/posts.routes");
const cors=require("cors")
app.use(cors())
require('dotenv').config()
const app=express();
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)



  
app.listen(process.env.port ,async() => {
    try {
      await connection;
      console.log(`listening at port ${process.env.port}`);
      console.log("connected to db");
    } catch (err) {
      console.log(err);
      console.log("something went wrong!!");
    }
  });
  
