import { Dispatch } from "react"
import { statusPrescriptionStart, statusPrescriptionSuccess, statusPrescriptionFailure } from "./prescriptionSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPrescriptionApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPrescriptionStart())
    let response
    if(filter) {
      response = await get(`prescription${filter}`)
    } else {
      response = await get(`prescription`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPrescriptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPrescriptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPrescriptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPrescriptionApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPrescriptionStart())
    let response = await post(`prescription`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPrescriptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPrescriptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPrescriptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPrescriptionApi = (prescriptionId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPrescriptionStart())
    let response = await put(`prescription/${prescriptionId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPrescriptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPrescriptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPrescriptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePrescriptionApi = (prescriptionId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPrescriptionStart())
    let response = await remove(`prescription/${prescriptionId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPrescriptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPrescriptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPrescriptionFailure([errData.err]))
      return [errData.err]
    }
  }
}
