import cartReducer from './cartReducer'
import wishlistReducer from './wishlistReducer'
import recentViewedReducer from './recentViewedReducer'
import modalReducer from './modalReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  recentViewedData: recentViewedReducer,
  modalState: modalReducer
})

export default rootReducer
