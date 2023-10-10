import { Dispatch } from "react"
import { statusPaymentModeStart, statusPaymentModeSuccess, statusPaymentModeFailure } from "./paymentModeSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPaymentModeApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentModeStart())
    let response
    if(filter) {
      response = await get(`paymentMode${filter}`)
    } else {
      response = await get(`paymentMode`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentModeSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentModeFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentModeFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPaymentModeApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentModeStart())
    let response = await post('paymentMode', data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentModeSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentModeFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentModeFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPaymentModeApi = (treatId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentModeStart())
    let response = await put(`paymentMode/${treatId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentModeSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentModeFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentModeFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePaymentModeApi = (treatId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentModeStart())
    let response = await remove(`paymentMode/${treatId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentModeSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentModeFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentModeFailure([errData.err]))
      return [errData.err]
    }
  }
}
