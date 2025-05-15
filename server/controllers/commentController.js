const Comment = require('../models/commentModel')

const getComments = async(req,res) => {

const comments = await Comment.find({booking: req.params.bid})
if(!comments){
    res.status(400)
    throw new  Error('Comment Not Found')
}

res.status(200).json(comments)

}

const addComment = async(req,res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Kindly Add Text!!')
    }


const newComment = await Comment.create({
  user: req.user._id,
  booking: req.params.bid,
    text: req.body.text,
 isAdmin: req.body.isAdmin
 })

 if(!newComment){
    res.status(400)
    throw new Error('No New Comment Added!!')
 }

 const comment = await Comment.findById(newComment._id).populate("user", '-password').populate('booking')
 
 res.status(201).json(comment)

}
module.exports = { getComments, addComment }