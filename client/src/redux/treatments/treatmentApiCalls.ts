import { Dispatch } from "react"
import { statusTreatStart, statusTreatSuccess, statusTreatFailure } from "./treatmentSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowTreatmentApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusTreatStart())
    let response
    if(filter) {
      response = await get(`treatment${filter}`)
    } else {
      response = await get(`treatment`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusTreatSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusTreatFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusTreatFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddTreatmentApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusTreatStart())
    let response = await post('treatment', data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusTreatSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusTreatFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusTreatFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditTreatmentApi = (treatId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusTreatStart())
    let response = await put(`treatment/${treatId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusTreatSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusTreatFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusTreatFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteTreatmentApi = (treatId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusTreatStart())
    let response = await remove(`treatment/${treatId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusTreatSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusTreatFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusTreatFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const clearTreatApi = async (dispatch: Dispatch<any>) => {
  dispatch(statusTreatSuccess([]))
}
