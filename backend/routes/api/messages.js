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




module.exports = router;