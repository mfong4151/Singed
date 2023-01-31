const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    flavorProfile: {
      type: Array,
      required: false
    },
    genre: {
      type: Array,
      required: false
    },
    allergies: {
      type: Array,
      required: false
    },
    diet: {
      type: Array,
      required: false
    },
    friendsList: {
      type: [Schema.Types.ObjectId],
      ref: 'User'
    },

    groupIds: {
      type: Array,
      required: false
    }
  }, {
    timestamps: true
  });


module.exports = mongoose.model('User', userSchema);