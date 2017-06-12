

import axios from 'axios'

import store from '../store'

const initialState = {users: []}

/*************ACTIONS **********************/

const GET_USERS = 'GET_USERS'

const DEL_USERS = 'DEL_USERS'

const UPDATE = 'UPDATE'

/*************ACTION CREATORS **********************/

const getAllUsers = (users) => ({type: GET_USERS, users})

const removeUser = (id) => ({type: DEL_USERS, id })

const update = (id) => ({type:UPDATE, id })

/*************REDUCER **********************/

// [...newState.users, action.users]  did not work so returning action.users

const userReducer = (users=initialState, action) => {

  switch (action.type) {

  case GET_USERS:

    console.log('in reducer???')

    return action.users

  case DEL_USERS:

  console.log("DEL", action.users, action, "&%&%&")

    return users.filter(user => user.id !== action.id)

  case UPDATE:

    return users.map(user => (

       action.user.id === user.id ? action.user : user

      ))

  }

  return users

}

/************* DISPATCHER ************** *********/

// dispatch did not work.  only store.dispatch works

export const fetchUsers = () =>

  dispatch =>

    axios.get('/api/users')

      .then(response => {

        console.log('fetching users?????')

        const users = response.data

        store.dispatch(getAllUsers(users))

      })

      .catch(err => console.error)

export const deleteUser = (userId) =>

  dispatch =>

    axios.delete(`/api/users/${userId}`)

      .then(() => {

        console.log("hahahha")

        dispatch(removeUser(userId))

      })

      .catch(err => console.error)

      .catch(err => console.error) // delete meee

export const updateUser = (credentials, userId) =>

  dispatch =>

    axios.put(`/api/users/${userId}`, credentials)

      .then(() => {

        console.log("hahahha")

        dispatch(removeUser(userId))

      })

      .catch(err => console.error)

export default userReducer

