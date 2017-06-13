const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Order = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
	.post('/', (req,res,next) => {
		// let price = req.body.price
		// let product_id = req.body.productId
		// let order_id = req.body.orderId
		// let quantity = req.body.quantity
		//let newCartItem = {price: price, product_id: product_id, order_id: order_id, quantity: quantity}
	
		let newCartItem = {price: 3, product_id: 2, order_id: 2, quantity: 8}
		CartItem.create(newCartItem)
		.then(item => res.send(item))
		.catch(next)

	})
	.get('/all/:orderId', (req,res,next) => {
		let orderId = req.params.orderId
		CartItem.findAll({where: {
			order_id: orderId
		}})
		.then(items => res.send(items))
		.catch(next)
	})