import { Dispatch } from "react"
import { statusLoginStart, statusLoginSuccess, statusLoginFailure } from "./loginSlice"
import { publicRequest } from "../../requestMethods"

export const loginApi = (data: object) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusLoginStart())
    const response = await publicRequest.post("auth/login", data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusLoginSuccess(resData))
      return true
    }
  } catch(error: any) {
    const errorData = error.response?.data

    if(errorData && error.response?.status === 300) {
      const formErrors = errorData.formErrors ? errorData.formErrors : [errorData]
      dispatch(statusLoginFailure([formErrors]))
      return [formErrors]
    } else {
      dispatch(statusLoginFailure([errorData.err]))
      return [errorData.err]
    }
  }
}

export const logoutApi = async (dispatch: Dispatch<any>) => {
  dispatch(statusLoginSuccess([]))
}

