const { Schema, model } = require("mongoose");

const postSchema=Schema({
    "title" : String,
    "body" : String,
    "device" : String,
    "no_of_comments" : Number,
    "userId":String,
    "user":String
},{
    versionKey:false
})

const postModel=model("posts",postSchema)


module.exports={
    postModel
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