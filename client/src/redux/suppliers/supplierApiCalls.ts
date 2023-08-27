import { Dispatch } from "react"
import { statusSupplierStart, statusSupplierSuccess, statusSupplierFailure } from "./supplierSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowSuppliersApi = (filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSupplierStart())
    let response
    if(filter) {
      response = await get(`supplier${filter}`)
    } else {
      response = await get(`supplier`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusSupplierSuccess(resData))
      return true
    }
  } catch (error: any) {
    console.log("error: ", error)
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSupplierFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSupplierFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddSuppliersApi = (data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSupplierStart())
    let response = await post(`supplier`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusSupplierSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSupplierFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSupplierFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditSuppliersApi = (supplierId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSupplierStart())
    let response = await put(`supplier/${supplierId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusSupplierSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSupplierFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSupplierFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeleteSuppliersApi = (supplierId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusSupplierStart())
    let response = await remove(`supplier/${supplierId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusSupplierSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusSupplierFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusSupplierFailure([errData.err]))
      return [errData.err]
    }
  }
}
