const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const dishSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    imageUrl: {
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
      required: true
    },

    // Asian 1-10 numerical value
    // European	1-10 numerical value
    // American	1-10 numerical value
    // Hispanic	1-10 numerical value
    genre: {
      type: Array,
      required: true
    },

    // Shellfish true/false
    // Nuts	true/false
    // Fish 	true/false
    allergies: {
      type: Array,
      required: true
    },

    // Vegan/Vegetarian	true/false
    // Gluten	true/false
    // Milk	true/false
    diet: {
      type: Array,
      required: true
    },

    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true
    }
  }, {
    timestamps: true
  });


module.exports = mongoose.model('Dish', dishSchema);
