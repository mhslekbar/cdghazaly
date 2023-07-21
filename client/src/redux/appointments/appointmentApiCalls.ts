import { Dispatch } from "react"
import { statusAppointmentStart, statusAppointmentSuccess, statusAppointmentFailure } from "./appointmentSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowAppointmentApi = (doctorId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAppointmentStart())
    let response
    if(filter) {
      response = await get(`appointment/${doctorId}${filter}`)
    } else {
      response = await get(`appointment/${doctorId}`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusAppointmentSuccess(resData))
      return true
    }
  } catch (error: any) {
    console.log("error: ", error)
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAppointmentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAppointmentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddAppointmentApi = (doctorId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAppointmentStart())
    let response = await post(`appointment/${doctorId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAppointmentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAppointmentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAppointmentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditAppointmentApi = (doctorId: string = "", appointmentId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAppointmentStart())
    let response = await put(`appointment/${doctorId}/${appointmentId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAppointmentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAppointmentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAppointmentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteAppointmentApi = (doctorId: string = "",appointmentId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAppointmentStart())
    let response = await remove(`appointment/${doctorId}/${appointmentId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAppointmentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAppointmentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAppointmentFailure([errData.err]))
      return [errData.err]
    }
  }
}
