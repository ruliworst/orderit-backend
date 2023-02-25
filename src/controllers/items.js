const itemsRouter = require('express').Router()
const Item = require('../models/item')

itemsRouter.get('/', async (request, response) => {
  const items = await Item.find({})

  return response.json(items)
})

itemsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const item = new Item({
      name: body.name,
      quantity: body.quantity,
      price: body.price
    })

    let savedItem = await item.save()

    return response.status(201).json(savedItem)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

itemsRouter.get('/:id', async (request, response) => {
  try{
    const item = await Item.findById(request.params.id)
    
    return response.json(item)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

module.exports = itemsRouter