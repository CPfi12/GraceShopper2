'use strict'

const db = require('APP/db')
    , {User, Thing, Favorite, Promise, Product, Payment, Order, CartItem, Review} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    products: products(),
    orders: orders(),
    payment: payment(),
    review: review(),
    cartItem: cartItem(),
  }

  // seeded.favorites = favorites(seeded)

  //Promise.props:
  //Like .all but for object properties or Maps entries instead of iterated values.
  // Returns a promise that is fulfilled when all the properties of the object or the Map's values are fulfilled.
  return Promise.props(seeded)
}

const users = seed(User, {
 one: {name: 'Claire', email: 'claire@gmail.com', role: 'admin', password: 'password123'},
 two: {name: 'Ketti', email: 'ketti@gmail.com', role: 'user', password: '321password'},
})

const products = seed(Product, {
  one: {name: 'Granola Foobar', price: 2.25, category: 'vegan'},
  two:  {name: 'Almond Foobar', price: 2.75, category: 'unhealthy'},
  three:  {name: 'Cinnamon Foobar', price: 3.00, category: 'kosher'}
})

const orders = seed(Order, {
  one: {status:'pending', Name: 'Linus', Street: '123 Grace Hopper Lane', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
  two: {status:'pending', Name: 'Liz', Street: '246 Grace Hopper Lane', Apartment: '8G',
  State:'Alaska', City:'Hopperville', zipCode: 10021}
})

const payment = seed(Payment, {
  one: {CCV: 123, vendor: 'Discover', ExpirationDate: 2020, Number: '1111111111111', Name: 'Linus', Street: '123 Grace Hopper Boulevard', Apartment: '5B',
  State:'Alaska', City:'Hopperville', zipCode: 10021},
  two: {CCV: 123, vendor: 'Discover', ExpirationDate: 2090, Number: '2222222222222', Name: 'Ana', Street: '246 Luisa Lane', Apartment: 'ES6',
  State:'New York', City:'New York', zipCode: 10017},
})

const review = seed(Review, {
    good: {content: 'this foobar rules!', stars: 4},
    bad: {content: 'this foobar SUCKS', stars: 1},
})

const cartItem = seed(CartItem, {
    one: {name: 'Cinnamon Foobar', Price: '3.00', product_id: 1, order_id: 1, quantity: 5},
    two: {name: 'Almond Foobar', Price: '2.75', product_id: 2, order_id: 2, quantity: 9},
})

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users})
