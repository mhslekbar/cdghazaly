import { Dispatch } from "react"
import { statusPaymentStart, statusPaymentSuccess, statusPaymentFailure } from "./paymentSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPaymentsApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentStart())
    let response
    if(filter) {
      response = await get(`payment${filter}`)
    } else {
      response = await get(`payment`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPaymentsApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentStart())
    let response = await post(`payment`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPaymentsApi = (paymentId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentStart())
    let response = await put(`payment/${paymentId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePaymentsApi = (paymentId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentStart())
    let response = await remove(`payment/${paymentId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentFailure([errData.err]))
      return [errData.err]
    }
  }
}
