import React, { Component } from 'react'
import {} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {getOrders} from '../reducers/orders'

export const Orders = ({getOrders}, props) =>{
    return (<div>{console.log(props, "props"}
    Orders are here !!</div>)

}


export default connect(
  state => ({}),
  {getOrders},
)(Orders)

// export const Login = ({ login, thirdPartyLogin }) => (
//   <div>
//     <form onSubmit={evt => {
//       evt.preventDefault()
//       login(evt.target.username.value, evt.target.password.value)
//     } }>
//       <input name="username" />
//       <input name="password" type="password" />
//       <input type="submit" value="Login" />
//     </form>
//     <br/>
//     <button onClick={evt => { thirdPartyLogin('google')}}>log in with google</button>
//         <button onClick={evt => { thirdPartyLogin('github')}}>log in with github</button>
//             <button onClick={evt => { thirdPartyLogin('facebook')}}>log in with facebook</button>
//   </div>
// )

