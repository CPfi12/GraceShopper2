import React from 'react'
import { Link } from 'react-router'
import { addToCart } from '../reducers/cartItems'
import { connect } from 'react-redux'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
  }


  handleSubmitItem = function(event){
    event.preventDefault()
    this.props.addToCart()
  }


  onReviewSubmit(event) {
    event.preventDefault()
    let reviewInfo = {
      username: event.target.name.value,
      content: event.target.content.value
    }
    this.props.addReview(reviewInfo)
  }

  render() {
    let product = this.props.product
    let stylePref = {
      width: '100px',
      height: '100px'
    }
    return ( 
            <div>
                <h1>Product</h1>
                <form onSubmit={this.handleSubmitItem}>
                  <p>{product.name}</p>
                  <img style={stylePref} src={product.imageUrl}/>
                  <p>Price: {product.price}</p>
                  <p> Quantity: <input type="text" name="quantity"/> </p>
                  <button type="submit">Add Product to Cart</button>
                </form>
        <div className="row col-lg-4">
            <form action={`/api/reviews`} method="post" onSubmit={this.onReviewSubmit}>
            <div className="form-group">
              <label htmlFor="name">User Name:</label>
              <input size="20" className="form-control" type="text" id="name" name="username"/>
            </div>
            <div className="form-group">
              <label htmlFor="textContent">Your Review:</label>
              <input className="form-control" type="text" id="textContent"style={{width: '30em', height: '5em'}} />
            </div>
              <button className="btn btn-default" type="submit">Add New Review</button>
            </form>
          </div>
            </div>

    )
  }
}


const filterProducts = (products, productId) => {
  let productArr = products.filter((product) => product.id===(+productId))
  return productArr[0]
}

export default connect(
  (state, ownProps) => ({product: filterProducts(state.products, ownProps.routeParams.productId)}),
  {addToCart},
)(Product)
