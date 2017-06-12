import React from 'react'
import { Link } from 'react-router'

// change extension to .jsx here

class Products extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('in products?????')
    let products = this.props.products
    console.log(products)
    let stylePref = {
      width: '100px',
      height: '100px'
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Sidebar</h1>
             <form action="">
                <input type="checkbox" name="vehicle" value="Bike"/> Chocolate <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Gluten Free <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Ketti's Pick! <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Kosher <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Pickled <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Spicy <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Unhealthy <br/>
                <input type="checkbox" name="vehicle" value="Bike"/> Vegan
             </form>
          </div>
          <div className="col-md-8">
          <h1>Products</h1>
          { {/* don't need the products.length --KHCL */}
            products.length && products.map((product) => {
              return (
                <div key={product.id} className="col-md-4">
                <Link to={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <img style={stylePref} src={product.imageUrl}/>
                  <p>Price: ${product.price}</p>
                </Link>
                </div>
                )
            })
          }
      </div>
      </div>
      </div>

    )
  }
}

import {connect} from 'react-redux'

export default connect(
  state => ({products: state.products}),
  {},
)(Products)
