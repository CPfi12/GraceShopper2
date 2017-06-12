import axios from 'axios'
const initialState = []
const reducer = (state=initialState, action) => {
  switch (action.type) {
  case GET_PRODUCTS:
    return action.products
  }
  return state
}

const GET_PRODUCTS = 'GET_PRODUCTS'

export const getAllProducts = products => ({
  type: GET_PRODUCTS, products
})

export const loadProducts = () =>
    dispatch =>
      axios.get('/api/products')
        .then((products) => dispatch(getAllProducts(products.data)))
        .catch(console.err)

export default reducer
