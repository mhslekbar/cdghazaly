import { Dispatch } from "redux";
import { Action, ActionType, actionStatus } from "./loginActions";
import { publicRequest } from "../../requestMethods";

export const loginApi = (data: object) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({type: ActionType.LOGIN, status: actionStatus.START})
    const response = await publicRequest.post("auth/login", data)
    const resData = response.data.success
    if(resData) {
      dispatch({type: ActionType.LOGIN, status: actionStatus.SUCCESS, payload: resData})
      return true
    }
  } catch(error: any) {
    const errorData = error.response?.data
    if(errorData && error.response?.status === 300) {
      const formErrors = errorData.formErrors ? errorData.formErrors : [errorData]
      dispatch({ type: ActionType.LOGIN, status: actionStatus.FAILURE, payload: [formErrors] });
      return [formErrors]
    } else {
      dispatch({ type: ActionType.LOGIN, status: actionStatus.FAILURE, payload: [errorData.message] });
      return [errorData.err]
    }
  }
}

