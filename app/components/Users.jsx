import React, { Component } from 'react'
import {} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

import {fetchUsers, deleteUser} from '../reducers/users'
import {Link} from 'react-router'
// only the  user names are "links" because formatting kept getting messed up when i wrapped
//each row (with email, role and name ) in Link tags.


const Users = ({users, fetchUsers}, props) => {

  if (users.role === 'user') {
    return <div>!</div>
  }
  return (
      <div>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          {users.length ? users.map((user, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index+1}</th>
                  <Link to={`/users/${user.id}`}>
                    <td ></td>
                    <td >{user.name}</td>
                  </Link>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <button  onClick={()=> ClickHandler
                      (user.id)}className="glyphicon glyphicon-remove"></button>
                  <button className="glyphicon glyphicon-edit"></button>
                </tr>
              </tbody>)
          })
          : null}
      </table>
     </div>)
}
const ClickHandler = (userId)  => {
    //console.log(userId, 'UserId', deleteUser)
    console.log("DSDS")
    deleteUser(userId)
    console.log("invoked")
  }
export default connect(
   ({ users }) => ({ users: users }),
  {fetchUsers},
)(Users)
