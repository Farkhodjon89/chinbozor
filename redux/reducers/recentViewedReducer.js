import {
  ADD_TO_RECENT_VIEWED
} from '../actions/recentViewedActions'
import { moveArrayElement } from '../../utils'

const initState = []

const recentViewedReducer = (state = initState, action) => {
  const resentViewedItems = state
  const product = action.payload

  if (action.type === ADD_TO_RECENT_VIEWED) {
    const resentViewedItemIndex = resentViewedItems.findIndex(
      (item) => item.id === product.id
    )
    if (resentViewedItemIndex === -1) {
      return [...resentViewedItems, product]
    } else {
      moveArrayElement(resentViewedItems, resentViewedItemIndex, 0)
      return resentViewedItems
    }
  }

  return resentViewedItems
}

export default recentViewedReducer
