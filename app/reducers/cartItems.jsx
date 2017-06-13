import axios from 'axios'

const initialState = {currentOrder: {}, cart: [], total: 0}


const reducer = (state=initialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
  case ADD_CARTITEM:
    return nextState.cart = [...state.cart, action.cartItem]
  case GET_CART:
    return nextState.cart = [...action.cartItems]
  case CART_TOTAL:
    return nextState.total = action.total  
  default:
    return state
  }
}

const ADD_CARTITEM = 'ADD_CARTITEM'

export const newCartItem = (cartItem) => ({
  type: ADD_CARTITEM, cartItem
})

const GET_CART = 'GET_CART'

export const getCart = (cartItems) => ({
  type: GET_CART, cartItems
})

const CART_TOTAL = 'CART_TOTAL'

export const cartTotal = (total) => ({
  type: CART_TOTAL, total
})


export const addToCart = () => 
    dispatch => {
      let userId = 1 //will be SENT as this.props.auth.userId eventually
      axios.post('/api/cartitem/')
      .then(item => {
        dispatch(newCartItem(item.data))
        .catch(console.err)
      })

  }

export const loadCartItems = () => 
    dispatch => {
      let orderId = 2
      axios.get(`/api/cartitem/all/${orderId}`)
        .then((items) => {
          dispatch(getCart(items.data)) 
          return items.data})
        .catch(console.err)}



export const checkOut = () => {


}

export default reducer


