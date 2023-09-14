import { Dispatch } from "react"
import { statusInvoiceStart, statusInvoiceSuccess, statusInvoiceFailure } from "./invoiceSlice"
import { get, post, remove } from "../../requestMethods"

export const ShowInvoicesApi = (patientId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusInvoiceStart())
    let response
    if(filter) {
      response = await get(`invoice${filter}/${patientId}`)
    } else {
      if(patientId) {
        response = await get(`invoice/${patientId}`)
      } else {
        response = await get(`invoice`)
      }
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusInvoiceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusInvoiceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusInvoiceFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const CreateInvoiceApi = (patientId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusInvoiceStart())
    let response = await post(`invoice/${patientId}`, {})
    const resData = response.data.success
    if(resData) {
      dispatch(statusInvoiceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusInvoiceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusInvoiceFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteInvoiceApi = (patientId: string = "", invoiceId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusInvoiceStart())
    let response = await remove(`invoice/${patientId}/${invoiceId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusInvoiceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusInvoiceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusInvoiceFailure([errData.err]))
      return [errData.err]
    }
  }
}

