import { Dispatch } from "react"
import { statusSetAppointStart, statusSetAppointSuccess, statusSetAppointFailure } from "./setAppointSlice"
import { get, put } from "../../requestMethods"

export const ShowSetAppointApi = (doctorId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSetAppointStart())
    let response
    if(filter) {
      response = await get(`appointment/setAppointment${filter}`)
    } else {
      response = await get(`appointment/setAppointment/${doctorId}`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusSetAppointSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSetAppointFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSetAppointFailure([errData.err]))
      return [errData.err]
    }
  }
}


export const EditSetAppointApi = (doctorId: string = "", setAppointId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSetAppointStart())
    let response = await put(`appointment/setAppointment/${doctorId}/${setAppointId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusSetAppointSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSetAppointFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSetAppointFailure([errData.err]))
      return [errData.err]
    }
  }
}
