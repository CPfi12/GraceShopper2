import React from 'react'
import { Link } from 'react-router'
import { checkOut } from '../reducers/cartItems'
import {connect} from 'react-redux'


class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  
  handleCheckout = function(evt){
      evt.preventDefault()
      this.props.checkOut()
      this.handleCheckout = this.handleCheckout.bind(this)
  }

  render() {
    let cartItems = this.props.cart
    let user = this.props.user
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Your Cart:</h1>
             {
            cartItems.length && cartItems.map((product) => {
              return (
                <div key={product.id} className="col-md-4">
                <Link to={`/products/${product.id}`}>
                  <p>Price: {product.price}</p>
                </Link>
                </div>
                )
            })
          }
          </div>
          <div className="col-md-8">
          <h1>Total: ${
                        cartItems.length && cartItems.map((item) => item.price)
                        .reduce((a,b) => a+b)
                    } </h1>

        <form onSubmit={this.handleCheckout}>
            <button type="submit"> check out</button>
        </form>
      </div>
      </div>
      </div>

    )
  }
}



export default connect(
  state => ({cart: state.cartItems, user: state.auth}),
  {checkOut},
)(Cart)


/*



*/