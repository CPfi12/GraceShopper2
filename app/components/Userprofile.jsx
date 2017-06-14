import React, { Component } from 'react'
import {connect} from 'react-redux'
import {deleteUser, updateUser} from '../reducers/users'
import Userform from './Userform'
import _ from 'lodash'



const Userprofile = (props) => {
  console.log(props, 'props')
  //if (!props.user ) return null
  return (
  <Userform  id={props.user.id} name={props.user.name} email={props.user.email} orders={props.user.orders} reviews={props.user.reviews} payment={props.user.payment}
  role={props.user.role} auth={props.auth}/>)

  }
const mapState = ({ users, auth }, ownProps) => {
  console.log(users)
  return {
    user: _.find(users, user => user.id === auth.id),
    auth,

  }
}
const mapDispatch = { deleteUser, updateUser }
export default connect(mapState, mapDispatch)(Userprofile)
