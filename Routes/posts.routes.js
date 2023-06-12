const express = require("express");
const { postModel } = require("../model/posts.model");
const { auth } = require("../middleware/auth.middleware");
const postRouter = express.Router();

postRouter.post("/add", auth, async (req, res) => {
  try {
    const note = new postModel(req.body);
    await note.save();
    res.json({ msg: "New note created", note: req.body });
  } catch (err) {
    res.json({ msg: "Error while creating note", error: err.message });
  }
});

postRouter.get("/", auth, async (req, res) => {
  const { userId, minComments, maxComments, device1, device2 } = req.query;

  try {
    let query = {};

    if (userId) query.userId = userId;
    if (minComments) query.no_of_comments = { $gte: minComments };
    if (maxComments) query.no_of_comments = { ...query.no_of_comments, $lte: maxComments };
    if (device1) query.device = device1;
    if (device2) query.device = { ...query.device, $in: [device1, device2] };

    let filteredPosts = await postModel.find(query).exec();

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 3;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json(paginatedPosts);
  } catch (err) {
    res.json({ error: err });
  }
});

postRouter.get("/top", auth, async (req, res) => {
  const { userId } = req.query;

  try {
    let query = {};

    if (userId) query.userId = userId;

    let filteredPosts = await postModel.find(query).sort({ no_of_comments: -1 }).exec();

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 3;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json(paginatedPosts);
  } catch (err) {
    res.json({ error: err });
  }
});

postRouter.patch("/update/:postID", auth, async (req, res) => {
  const userIDinUserDoc = req.body.userId;
  console.log(userIDinUserDoc);
  const { postID } = req.params;
  console.log(req.params);
  try {
    const post = await postModel.findOne({ _id: postID });
    console.log(post);
    const userIDinpostDoc = post.userId;
    console.log(userIDinpostDoc);
    if (userIDinUserDoc === userIDinpostDoc) {
      await postModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.json({ msg: `${post.title} has been updated` });
    } else {
      res.json({ msg: "Not Authorized!!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});


postRouter.delete("/delete/:postID",auth, async(req,res)=>{
    const userIDinUserDoc=req.body.userId;
    console.log(userIDinUserDoc)
const {postID} = req.params
console.log(req.params)
   try {
    const post= await postModel.findOne({_id:postID})
    console.log(post)
    const userIDinpostDoc=post.userId;
    console.log(userIDinpostDoc)
    if(userIDinUserDoc === userIDinpostDoc){
        //update  
        await postModel.findByIdAndDelete({_id:postID},req.body)
       res.json({msg:`${post.title} has been Deleted`})
    }else{
        res.json({msg:"Not Authorized!!"})
    }
   } catch (err) {
    res.json({error:err})
   }
})

module.exports={
    postRouter
}
