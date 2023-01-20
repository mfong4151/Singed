const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        messageLocation: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Group'
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('Message', messageSchema)