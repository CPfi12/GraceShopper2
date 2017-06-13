//const router = require('express').Router()
const db = require('APP/db')
const Product = db.model('products')
const CartItem = db.model('cartItem')
const Orders = db.model('order')
const Promise = require('bluebird')

module.exports = require('express').Router()
 .get('/',
 (req, res, next) =>
  Orders.findAll({})
    .then((orders) => {
      if (!orders.length) {
        let error = new Error()
        error.status = 404
        throw error
      }
      res.send(orders)
    })
   .catch(next))
 .get('/:orderId',
    (req, res, next) => {
      Orders.findAll({
        where: {
          id: req.params.orderId
        }
      })
 .then((orders) => {
   if (!orders.length) {
     var error = new Error()
     error.status = 404
     throw error
   }
   res.send(orders)
 })
 .catch(next)
    })
 .get('/users/:userId',
  (req, res, next) =>
  Orders.findAll({
    where: {
      user_id: req.params.userId
    }
  })
 .then((orders) => {
   if (!orders.length) {
     var error = new Error()
     error.status = 404
     throw error
   }
   res.send(orders)
 })
 .catch(next))
 .get('/:status',
  (req, res, next) =>
   Orders.findAll({
     where: {
       status: req.params.status
     }
   })
 .then(orders => {
   if (!orders.length) {
     var error = new Error()
     error.status = 404
     throw error
   }
 })
 .catch(next))
  .put('/:status',
  (req, res, next) =>
   Orders.update({
     status: req.params.status
   })
 .then(orders => {
   if (!orders.length) {
     var error = new Error()
     error.status = 404
     throw error
   }
 })
 .catch(next))
 .get('/current/:userId',  // there can only be one 'pending' order per user
  (req, res, next) => {
    console.log('----------------- before orders find or create -----------------------------')
    Orders.findOrCreate({where: {
      user_id: req.params.userId,
      status: 'pending'
    }})
    .then(order => {
      console.log("****** ORDER: ", order)
      res.send(order[0])
    })
  .catch(next)
  })


