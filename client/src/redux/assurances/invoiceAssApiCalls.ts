import { Dispatch } from "react"
import { statusAssuranceFailure, statusAssuranceStart, statusAssuranceSuccess } from "./assuranceSlice"
import { post, remove } from "../../requestMethods"

export const AddInvoiceAssuranceApi = (AssId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await post(`assurance/invoices/${AssId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAssuranceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAssuranceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAssuranceFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const PayInvoiceAssuranceApi = (AssId: string = "", invoiceId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await remove(`assurance/invoices/${AssId}/payInvoice/${invoiceId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAssuranceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAssuranceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAssuranceFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteInvoiceAssuranceApi = (AssId: string = "", invoiceId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await remove(`assurance/invoices/${AssId}/deleteInvoice/${invoiceId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusAssuranceSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAssuranceFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAssuranceFailure([errData.err]))
      return [errData.err]
    }
  }
}

