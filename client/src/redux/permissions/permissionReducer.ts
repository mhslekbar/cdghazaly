import { PermissionAction, PermissionStatus } from "./permissionActions";

const initialState = {
  isFetching: false,
  permissions: [],
  error: []
}

type STATE = typeof initialState;

const reducer = (state: STATE = initialState, action: PermissionAction) => {
  switch(action.type.name) { // Start first switch 
    case "permission": 
      switch(action.status) {
        case PermissionStatus.START: 
          return {
            ...state, 
            isFetching: true,
            error: []
          }
        case PermissionStatus.SUCCESS: 
          return {
            ...state, 
            isFetching: false,
            permissions: action.payload,
            error: []
          }
        case PermissionStatus.FAILURE: 
          return {
            ...state, 
            isFetching: false,
            error: action.payload
          }
        default: return state
    } // end first switch
    default: return state
  }
}

export default reducer

