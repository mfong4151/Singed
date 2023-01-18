const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user found'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'No such user found'})
    }

    res.status(200).json(user)
}

const updateUserAllergiesDiet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user found'})
    }

    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        return res.status(404).json({error: 'No such user found'})
    }

    res.status(200).json(user)
}

module.exports = {
    updateUserAllergiesDiet,
    getUser
}