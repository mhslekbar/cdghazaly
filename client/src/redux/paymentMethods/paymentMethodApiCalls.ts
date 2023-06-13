import { Dispatch } from "react"
import { statusPaymentMethodStart, statusPaymentMethodSuccess, statusPaymentMethodFailure } from "./paymentMethodSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPaymentMethodApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentMethodStart())
    let response
    if(filter) {
      response = await get(`paymentMethod${filter}`)
    } else {
      response = await get(`paymentMethod`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentMethodSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentMethodFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentMethodFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPaymentMethodApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentMethodStart())
    let response = await post('paymentMethod', data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentMethodSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentMethodFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentMethodFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPaymentMethodApi = (treatId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentMethodStart())
    let response = await put(`paymentMethod/${treatId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentMethodSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentMethodFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentMethodFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePaymentMethodApi = (treatId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentMethodStart())
    let response = await remove(`paymentMethod/${treatId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentMethodSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentMethodFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentMethodFailure([errData.err]))
      return [errData.err]
    }
  }
}
