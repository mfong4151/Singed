const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
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

    // Spicy(flavors)	1-10 numerical value
		// Bitter(flavors)	1-10 numerical value
		// Salty(flavors)	1-10 numerical value
		// Sour(flavors)	1-10 numerical value
		// Sweet(flavors)	1-10 numerical value
    flavorProfile: {
      type: Array,
      required: false
    },

    // Asian 1-10 numerical value
    // European	1-10 numerical value
    // American	1-10 numerical value
    // Hispanic	1-10 numerical value
    genre: {
      type: Array,
      required: false
    },

    // Shellfish true/false
    // Nuts	true/false
    // Fish 	true/false
    allergies: {
      type: Array,
      required: false
    },

    // Vegan/Vegetarian	true/false
    // Gluten	true/false
    // Milk	true/false
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
