import React, { Component } from 'react'

import {} from 'APP/app/reducers/auth'

import {connect} from 'react-redux'

import {fetchUsers} from '../reducers/users'

import {Link} from 'react-router'

// only the  user names are "links" because formatting kept getting messed up when i wrapped

//each row (with email, role and name ) in Link tags.

const Users = ({users, fetchUsers}, props) => {
  console.log('!!!!!!!!!!!')
  console.log('usr', users)
  console.log('bla')
  console.log('???')
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

        {/* users.length: we don't need this ternary becasue it defaults to an array in our user reducer. if we were going to do something like this, recommend `&&` */}
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

                  <button className="glyphicon glyphicon-remove"></button>

                  <button className="glyphicon glyphicon-edit"></button>

                </tr>

              </tbody>)

          })

          : null}

      </table>

     </div>)

}

export default connect(

   ({ users }) => ({ users: users }),

  {fetchUsers},

)(Users)
