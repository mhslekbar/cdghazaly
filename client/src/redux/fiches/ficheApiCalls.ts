import { Dispatch } from "react"
import { statusFicheStart, statusFicheSuccess, statusFicheFailure } from "./ficheSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowFicheApi = (patientId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response
    if(filter) {
      response = await get(`fiche/${patientId}/${filter}`)
    } else {
      response = await get(`fiche/${patientId}`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const CreateFicheApi = (patientId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response = await post(`fiche/${patientId}`, {})
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AppendFicheApi = (patientId: string = "", ficheId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response = await put(`fiche/${patientId}/LineFiche/${ficheId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response?.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}


export const EditFicheApi = (patientId: string = "", ficheId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response = await put(`fiche/${patientId}/${ficheId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteFicheApi = (patientId: string = "", ficheId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response = await remove(`fiche/${patientId}/${ficheId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteLineFicheApi = (patientId: string = "", ficheId: string = "", lineId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusFicheStart())
    let response = await remove(`fiche/${patientId}/${ficheId}/LineFiche/${lineId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusFicheSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusFicheFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusFicheFailure([errData.err]))
      return [errData.err]
    }
  }
}


