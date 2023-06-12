const { Schema, model } = require("mongoose");

const userSchema=Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean

},{
    versionKey:false
})

const userModel=model("user",userSchema)







module.exports={
    userModel
}


/*
name ==> String
email ==> String
gender ==> String
password ==> String
age ==> Number
city ==> String
is_married ==> boolean
*/


/*
name ==> user name for registration
email ==> email of the user
pass ==> desired password
city ==> user's location
age ==> user's age
*/