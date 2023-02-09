const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  publicId: {type: String, index: true, required: true, unique: true, maxLength: 9},
  location: {type: String, required: true},
  price: {type: Number, required: true, default: 0},
  quantity: {type: Number, required: true}
})

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order