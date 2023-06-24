import { Dispatch } from "react"
import { statusDevisStart, statusDevisSuccess, statusDevisFailure } from "./devisSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowDevisApi = (patientId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response
    if(filter) {
      response = await get(`devis${filter}`)
    } else {
      response = await get(`devis/${patientId}`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddDevisApi = (patientId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await post(`devis/${patientId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AppendDevisApi = (patientId: string = "", devisId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await post(`devis/${patientId}/append/${devisId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const editLineDevisApi = (patientId: string = "", devisId: string = "", lineId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await put(`devis/${patientId}/${devisId}/editLineDevis/${lineId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditDevisApi = (patientId: string = "", devisId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await put(`devis/${patientId}/${devisId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteDevisApi = (patientId: string = "", devisId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await remove(`devis/${patientId}/${devisId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const deleteLineDevisApi = (patientId: string = "", devisId: string = "", lineId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusDevisStart())
    let response = await remove(`devis/${patientId}/${devisId}/deleteLineDevis/${lineId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusDevisSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusDevisFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusDevisFailure([errData.err]))
      return [errData.err]
    }
  }
}


