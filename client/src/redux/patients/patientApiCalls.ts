import { Dispatch } from "react"
import { statusPatientStart, statusPatientSuccess, statusPatientFailure } from "./patientSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPatientsApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response
    if(filter) {
      response = await get(`patient${filter}`)
    } else {
      response = await get(`patient`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPatientsApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await post('patient', data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPatientsApi = (patientId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await put(`patient/${patientId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const PassPatientsApi = (patientId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await post(`patient/passPatient`, { patient: patientId })
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const ReturnPatientsApi = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await post(`patient/returnPatient`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const FinishPatientsApi = (patientId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await post(`patient/finishPatient`, { patient: patientId })
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePatientsApi = (patientId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientStart())
    let response = await remove(`patient/${patientId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientFailure([errData.err]))
      return [errData.err]
    }
  }
}
