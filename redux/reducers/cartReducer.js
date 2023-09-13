import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_ALL_FROM_CART,
  DELETE_FROM_CART,
} from '../actions/cartActions'

const initState = []

const cartReducer = (state = initState, action) => {
  const cartItems = state
  const product = action.payload

  if (action.type === ADD_TO_CART) {
    const cartItem = cartItems.find((item) => item.id === product.id)

    if (!cartItem) {
      return [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]
    } else {
      return cartItems.map((item) =>
        item.selectedProductId === cartItem.selectedProductId
          ? {
              ...item,
              quantity: item.quantity + 1,
              selectedProductColor: product.selectedProductColor,
            }
          : item
      )
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          (cartItem) => cartItem.selectedProductId !== product.selectedProductId
        )
      return remainingItems(cartItems, product)
    } else {
      return cartItems.map((item) =>
        item.selectedProductId === product.selectedProductId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems) =>
      cartItems.filter((cartItem) => cartItem.selectedProductId !== product)
    return remainingItems(cartItems, product)
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter((item) => {
      return false
    })
  }

  return state
}

export default cartReducer
