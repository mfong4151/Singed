const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const Message = mongoose.model('Message');

// create group
router.post('/creategroup', async(req, res) => {
    const {name, flavorProfile, genre, allergies, diet, userIds} = req.body;
    if(!userIds || !name){
        return res.status(400).send({error: "Please fill all of the fields"})
    }
    const newGroup = new Group({
        name,
        flavorProfile,
        genre,
        allergies,
        diet,
        userIds 
    })

    newGroup
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
        });

})

// get all groups
router.get('/', async (req, res) => {
    // const groups = await Group.find({
    //     userIds: { $elemMatch: { $eq: req.user._id }}
    // })
    const groups = await Group.find({})
    // need to figure out logic for only current user
    if(groups){
        return res.status(200).json(groups)
    } else {
        return res.status(404).json({error: 'No groups'})
    }
})

//get specific group
router.get('/:id', async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such group found'})
    }
    const group = await Group.findById(id)

    if(!group){
        return res.status(404).json({error: 'No such group found'})
    }
    res.status(200).json(group)
})

//delete group
router.delete('/deletegroup/:id', async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such group found'})
    }

    const group = await Group.findByIdAndDelete({_id: id})

    if(!group){
        return res.status(404).json({error: 'No such group found'})
    }

    res.status(200).json(group)
})

// update group, add/remove users
router.patch('/editgroup/:id', async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such group found'})
    }

    const group = await Group.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!group){
        return res.status(404).json({error: 'No such group found'})
    }

    res.status(200).json(group)
})

// get all messages for a group
router.get('/:id/messages', async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such group found'})
    }
    
    const groupMessages = await Message.find({
        messageLocation: id
    })

    if(groupMessages){
        return res.status(200).json(groupMessages)
    } else {
        return res.status(404).json({error: 'No messages for this group'})
    }
})

// create message 
router.post('/:id/createmessage', async(req, res) => {
    const { id } = req.params;
    const {content} = req.body;
    if(!content || !id){
        return res.status(400).json({error: "Missing group Id or content" })
    }
    const newMessage = new Message({
        sender: req.user._id,
        content: content,
        messageLocation: id
    });

    newMessage
        .save()
        .then((result) => {
            res.status(200).send(result);
          })
        .catch((err) => {
          res.status(400).send(err);
        });

})



module.exports = router;