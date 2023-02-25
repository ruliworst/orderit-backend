const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {type: String},
  quantity: {type: Number},
  price: {type: Number}
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item