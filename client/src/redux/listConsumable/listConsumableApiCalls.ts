import { Dispatch } from "react"
import { statusListConsumableStart, statusListConsumableSuccess, statusListConsumableFailure } from "./listConsumableSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowListConsumableApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusListConsumableStart())
    let response
    if(filter) {
      response = await get(`consumableList${filter}`)
    } else {
      response = await get(`consumableList`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusListConsumableSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusListConsumableFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusListConsumableFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddListConsumableApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusListConsumableStart())
    let response = await post(`consumableList`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusListConsumableSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusListConsumableFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusListConsumableFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditListConsumableApi = (consumableListId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusListConsumableStart())
    let response = await put(`consumableList/${consumableListId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusListConsumableSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusListConsumableFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusListConsumableFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteListConsumableApi = (consumableListId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusListConsumableStart())
    let response = await remove(`consumableList/${consumableListId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusListConsumableSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusListConsumableFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusListConsumableFailure([errData.err]))
      return [errData.err]
    }
  }
}
