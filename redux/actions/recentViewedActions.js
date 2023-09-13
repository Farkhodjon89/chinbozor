export const ADD_TO_RECENT_VIEWED = 'ADD_TO_RECENT_VIEWED'

export const addToRecentViewedlist = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_RECENT_VIEWED, payload: item })
  }
}
