'use strict'
var db = require('./index.js')
const Sequelize = require('sequelize');

module.exports = (db) => db.define('products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    inStock: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    inventory: {
        type: Sequelize.INTEGER,
        defaultValue: 100
    },
    categories: {
        type: Sequelize.ENUM('gluten free', 'vegan', 'Kettis pick!', 'unhealthy', 'chocolate', 'spicy', 'kosher', 'pickled'),
        defaultValue: 'unhealthy'
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://www.clker.com/cliparts/J/t/k/l/1/I/granola-bar-transparent-b-g-hi.png'
    },
})

module.exports.associations = (Product, {CartItem, Review, Order}) => {
    //Product.belongsToMany(Order, {through: CartItem})
    Product.hasMany(Review)
}
