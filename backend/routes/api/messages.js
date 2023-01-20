const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model('Message');

router.delete('/deletemessage/:id', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such message found'})
    }

    const message = await Message.findByIdAndDelete({_id: id})

    if(!message){
        return res.status(404).json({error: 'No such message found'})
    }

    res.status(200).json(message)
})

router.post('/createmessage', async (req, res) => {
    const {sender, username, content, messageLocation} = req.body;
    if(!content || !messageLocation){
        return res.status(400).json({error: "Missing group Id or content" })
    }
    // const newMessage = new Message({
    //     sender: sender,
    //     username: username,
    //     content: content,
    //     messageLocation: messageLocation
    // });

    // newMessage
    //     .save()
    //     .then((result) => {
    //         res.status(200).send(result);
    //       })
    //     .catch((err) => {
    //       res.status(400).send(err);
    //     });

    var newMessage = {
        sender: sender, 
        username: username,
        content: content, 
        messageLocation: messageLocation
    }

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name");
        message = await message.populate("messageLocation");
        res.json(message);
    } catch (err) {
        res.status(400);
        throw new Error ("Server could not process request")
    }

})




module.exports = router;