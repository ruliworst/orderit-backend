const ordersRouter = require('express').Router()
const Order = require('../models/order')

ordersRouter.get('/', async (request, response) => {
  const orders = await Order.find({})

  return response.json(orders)
})

ordersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const order = new Order({
      location: body.location,
      price: body.price,
      quantity: body.quantity
    })

    let savedOrder = await order.save()

    return response.status(201).json(savedOrder)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

ordersRouter.delete('/:id', async (request, response) => {
  try{
    await Order.findByIdAndRemove(request.params.id)
    
    return response.status(204).end()
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})


module.exports = ordersRouter