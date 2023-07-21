import { Action, ActionType, actionStatus } from "./loginActions";

const initialState = {
  isFetching: false,
  userData: {},
  error: []
}

type State = typeof initialState

const reducer = (state: State = initialState, action: Action) => {
  switch(action.type) {
    case ActionType.LOGIN: 
      switch(action.status) {
        case actionStatus.START:
          return {
            ...state,
            isFetching: true,
            error: [],
          }
        case actionStatus.SUCCESS: 
          return {
            isFetching: false,
            userData: action.payload,
            error: [],
          }
        case actionStatus.FAILURE: 
          return {
            ...state,
            isFetching: false,
            userData: action.payload ? action.payload[0].startsWith("AFFICHER") ? [] : state.userData : state.userData,
            error: action.payload,
          }
      }
    break;
    default:
      return state
  }
}

export default reducer
