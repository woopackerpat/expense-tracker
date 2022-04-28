export const FETCH_TRANSACTION = 'FETCH_TRANSACTION'
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION'
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'


function transactionReducer(state, action) {
  switch (action.type) {
      case FETCH_TRANSACTION: {
          //dispatch({type: FETCH_TRANSACTION, value: {transaction: []}})
          return action.value.transactions
      }
      case DELETE_TRANSACTION: {
        //dispatch({type: DELETE_TRANSACTION, value: {id: '8fb68662-a4dc-4081-9322-3b5eaa473527'}})
        const idx = state.findIndex(el => el.id === action.value.id)
        if(idx !== -1) {
          const cloneState = [...state]
          cloneState.splice(idx, 1)
          return cloneState
        }
        return state;
      }
      // case CREATE_TRANSACTION: {
      //   dispatch({type: CREATE_TRANSACTION, value: {transaction: newTransaction})
      //   return [action.value, ...state]
        
      // }
    default:
      return state;
  }
}


export {transactionReducer}
