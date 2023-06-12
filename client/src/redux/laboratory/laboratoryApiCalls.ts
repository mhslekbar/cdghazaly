import { Dispatch } from "react"
import { statusLabStart, statusLabSuccess, statusLabFailure } from "./laboratorySlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowLaboratoryApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusLabStart())
    let response
    if(filter) {
      response = await get(`laboratory${filter}`)
    } else {
      response = await get('laboratory')
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddLaboratoryApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusLabStart())
    let response = await post('laboratory', data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditLaboratoryApi = (labId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusLabStart())
    let response = await put(`laboratory/${labId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteLaboratoryApi = (labId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusLabStart())
    let response = await remove(`laboratory/${labId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusLabFailure([errData.err]))
      return [errData.err]
    }
  }
}
