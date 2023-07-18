const ordersRouter = require('express').Router()
const Order = require('../models/order')

ordersRouter.get('/', async (request, response) => {
  const orders = await Order.find({}).populate('item')

  return response.json(orders)
})

ordersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    
    const publicId = `${body.location.slice(0, 3).toUpperCase()}${(Date.now()/Math.random()).toString().slice(0,6)}`

    const order = new Order({
      publicId,
      status: body.status,
      location: body.location,
      price: body.price,
      quantity: body.quantity,
      item: body.item
    })

    let savedOrder = await order.save()

    return response.status(201).json(savedOrder)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

ordersRouter.delete('/:id', async (request, response) => {
  try{
    await Order.deleteOne({publicId: request.params.id})
    
    return response.status(204).end()
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

ordersRouter.put('/:id', async (request, response) => {
  try {
    await Order.updateOne({publicId: request.params.id}, request.body.order)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

module.exports = ordersRouter