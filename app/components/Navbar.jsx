import React, { Component } from 'react'
import { Link } from 'react-router'


import {connect} from 'react-redux'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    
      let cart = this.props.cart
      return (
      <div>
      <nav className="navbar navbar-toggleable-xl navbar-light bg-faded">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home</Link></li>

            <li><Link to='/cart'>Cart ({cart.length})</Link></li>
             {this.props.authUser && this.props.authUser.role==='admin' ?
             <li><Link to='/allOrders'>All Orders</Link></li>
             : null}
              {this.props.authUser && this.props.authUser.role==='admin' ?
              <li><Link to='admin/users'>All Users</Link></li>
             : null}

            <li><Link to='/currentUserOrders'>My Orders</Link></li>
             {this.props.authUser ?  <li><Link to={`users/${this.props.authUser.id}`}>My Profile</Link></li> : null}


          </ul>
        </div>
      </nav>
      {this.props.children}
      </div>
      )
    }
}


const mapStateToProps = (state) => {
  return {authUser: state.auth, cart: state.cartItems}
}
export default connect(mapStateToProps,null)(NavBar)

