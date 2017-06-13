import React from 'react'
import { Link } from 'react-router'
import {addFilter, removeFilter} from '../reducers/filter'
import store from '../store'
class Products extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler = (evt) =>{
      if(this.props.filtered.indexOf(evt.target.value)===-1||this.props.filtered.length===8)
              store.dispatch(addFilter(evt.target.value))
      else
              store.dispatch(removeFilter(evt.target.value))    
  }

  render() {

    let products = this.props.products.filter((prod)=> this.props.filtered.indexOf(prod.categories)!==-1)

    let stylePref = {
      width: '100px',
      height: '100px'
    }
    console.log('PROPS',this.props)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Sidebar</h1>
             <form action="">
                <input type="checkbox" name="" value="chocolate" onClick={(evt) => this.clickHandler(evt)} /> Chocolate <br/>
                <input type="checkbox" name="" value="gluten free" onClick={(evt) => this.clickHandler(evt)}/> Gluten Free <br/>
                <input type="checkbox" name="" value="Kettis pick!" onClick={(evt) => this.clickHandler(evt)}/> Ketti's Pick! <br/>
                <input type="checkbox" name="" value="kosher" onClick={(evt) => this.clickHandler(evt)}/> Kosher <br/>
                <input type="checkbox" name="" value="pickled" onClick={(evt) => this.clickHandler(evt)}/> Pickled <br/>
                <input type="checkbox" name="" value="spicy" onClick={(evt) => this.clickHandler(evt)}/> Spicy <br/>
                <input type="checkbox" name="" value="unhealthy" onClick={(evt) => this.clickHandler(evt)}/> Unhealthy <br/>
                <input type="checkbox" name="" value="vegan" onClick={(evt) => this.clickHandler(evt)}/> Vegan
             </form>
          </div>
          <div className="col-md-8">
          <h1>Products</h1>
          {
            products.length && products.map((product) => {
              return (
                <div key={product.id} className="col-md-4">
                <Link to={`/products/${product.id}`}>
                  <p>{product.name}</p>
                  <img style={stylePref} src={product.imageUrl}/>
                  <p>Price: {product.price}</p>
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
  state => ({products: state.products,
          filtered: state.filter}),
  {addFilter, removeFilter},
)(Products)
