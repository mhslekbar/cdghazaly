import { Dispatch } from "react"
import { statusAssuranceStart, statusAssuranceSuccess, statusAssuranceFailure } from "./assuranceSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowAssuranceApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response
    if(filter) {
      response = await get(`assurance${filter}`)
    } else {
      response = await get(`assurance`)
    }
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

export const AddAssuranceApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await post('assurance', data)
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

export const EditAssuranceApi = (treatId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await put(`assurance/${treatId}`, data)
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

export const DeleteAssuranceApi = (treatId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAssuranceStart())
    let response = await remove(`assurance/${treatId}`)
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
