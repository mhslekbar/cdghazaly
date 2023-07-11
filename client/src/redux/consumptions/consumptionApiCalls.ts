import { Dispatch } from "react"
import { statusConsumptionStart, statusConsumptionSuccess, statusConsumptionFailure } from "./consumptionSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowConsumptionsApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusConsumptionStart())
    let response
    if(filter) {
      response = await get(`consumption${filter}`)
    } else {
      response = await get(`consumption`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusConsumptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusConsumptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusConsumptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddConsumptionsApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusConsumptionStart())
    let response = await post(`consumption`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusConsumptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusConsumptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusConsumptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditConsumptionsApi = (consumptionId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusConsumptionStart())
    let response = await put(`consumption/${consumptionId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusConsumptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusConsumptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusConsumptionFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteConsumptionsApi = (consumptionId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusConsumptionStart())
    let response = await remove(`consumption/${consumptionId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusConsumptionSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusConsumptionFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusConsumptionFailure([errData.err]))
      return [errData.err]
    }
  }
}
