'use strict'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'
import Jokes from './components/Jokes'
import NavBar from './components/Navbar'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Products from './components/Products'
import Product from './components/Product'
import {loadProducts} from 'APP/app/reducers/products'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import {fetchUsers} from './reducers/users'



const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onProductsEnter = () => {
  store.dispatch(loadProducts()) //fetchProducts vs. loadProducts; try to keep consistent --KHCL
}

// line 46 isn't doing anything that we want. onEnter takes a function and invokes it with nextstate.router.params. we want to something like onProductsEnter instead of just `fetchUsers`

// change the name ExampleApp component

render(

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={fetchUsers()}>
        <IndexRedirect to="/products" />
        <Route path="/foobar" component={NavBar} onEnter={onProductsEnter}>
          <Route path="/products" component={Products}/>
          <Route path="/products/:productId" component={Product}/>
          <Route path="/users" component={Users} />
          <Route path="/users/:userId" component={SingleUser} />
        </Route>
        <Route path="/"/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,

  document.getElementById('main')

)
