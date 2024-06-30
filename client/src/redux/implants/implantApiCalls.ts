import { Dispatch } from "react"
import { statusImplantStart, statusImplantSuccess, statusImplantFailure } from "./implantSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowImplantsApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusImplantStart())
    let response
    if(filter) {
      response = await get(`implant${filter}`)
    } else {
      response = await get(`implant`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusImplantSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusImplantFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusImplantFailure([errData.err]))
      return [errData.err]
    }
  }
}


export const FinishImplantApi = (implantId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusImplantStart())
    let response = await put(`implant/${implantId}`, {})
    const resData = response.data.success
    if(resData) {
      dispatch(statusImplantSuccess(resData))
      return true
    }
  } catch (error: any) {
    console.log("err", error)
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusImplantFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusImplantFailure([errData.err]))
      return [errData.err]
    }
  }
}


export const CreateImplantApi = (patientId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusImplantStart())
    let response = await post(`implant/${patientId}`, {})
    const resData = response.data.success
    if(resData) {
      dispatch(statusImplantSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusImplantFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusImplantFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteImplantApi = (patientId: string = "", implantId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusImplantStart())
    let response = await remove(`implant/${patientId}/${implantId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusImplantSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusImplantFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusImplantFailure([errData.err]))
      return [errData.err]
    }
  }
}


export const ClearImplantApi = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusImplantStart())
    dispatch(statusImplantSuccess([]))
  } catch {

  }
}
