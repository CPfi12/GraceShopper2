import React, { Component } from 'react'

import {} from 'APP/app/reducers/auth'

import {connect} from 'react-redux'

import {fetchUsers} from '../reducers/users'

import {Link} from 'react-router'

const UserDisplay = (props) => {


  if (!props.user) return <div />

  return (

      <div>

        <table className="table">

          <thead className="thead-inverse">

            <tr>

              <th>#</th>

              <th>First Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Payment</th>

              <th>Orders</th>

              <th>Reviews</th>

              <th></th>

            </tr>

          </thead>

              <tbody>

                <tr>

                  <th scope="row">1</th>

                    <td ></td>

                    <td >{props.user.name}</td>

                  <td>{props.user.email}</td>

                  <td>{props.user.role}</td>

                  <td>{props.user.email}</td>

                  <td>{props.user.role}</td>

                  <td>{props.user.role}</td>

                  <button className="glyphicon glyphicon-remove"></button>

                  <button onClick={()=> ClickHandler()} className="glyphicon glyphicon-edit"></button>

                </tr>

              </tbody>)

      </table>

     </div>)

}

const ClickHandler = () => {

  console.log("yaayy")

  return (

    <div>Pirrrr</div>

  )

}

const mapState = ({ users }, ownProps) => {

  const paramId = Number(ownProps.params.userId)

  return {

    user: _.find(users, user => user.id === paramId)

  }

}

export default connect(mapState, null)(UserDisplay)