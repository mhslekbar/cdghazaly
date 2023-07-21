import { Dispatch } from "react"
import { statusDayOfWorkStart, statusDayOfWorkSuccess, statusDayOfWorkFailure } from "./dayOfWorkSlice"
import { get, post } from "../../requestMethods"

export const ShowDayOfWorkApi = (doctorId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDayOfWorkStart())
    let response = await get(`appointment/dayOfWork/${doctorId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDayOfWorkSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDayOfWorkFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDayOfWorkFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const UpdateDayOfWorkApi = (doctorId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDayOfWorkStart())
    let response = await post(`appointment/dayOfWork/${doctorId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDayOfWorkSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDayOfWorkFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDayOfWorkFailure([errData.err]))
      return [errData.err]
    }
  }
}

