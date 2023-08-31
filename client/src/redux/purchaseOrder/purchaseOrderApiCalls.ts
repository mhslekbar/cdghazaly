import { Dispatch } from "react"
import { statusPurchaseOrderStart, statusPurchaseOrderSuccess, statusPurchaseOrderFailure } from "./purchaseOrderSlice"
import { get, post, put, remove } from "../../requestMethods"

export const ShowPurchaseOrderApi = (doctorId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response
    if(filter) {
      response = await get(`purchaseOrder/${doctorId}${filter}`)
    } else {
      response = await get(`purchaseOrder/${doctorId}`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPurchaseOrderApi = (doctorId: string = "", data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await post(`purchaseOrder/${doctorId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPurchaseOrderApi = (doctorId: string = "", purchaseOrderId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await put(`purchaseOrder/${doctorId}/${purchaseOrderId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const setTotalPurchaseOrderApi = (doctorId: string = "", purchaseOrderId: string, data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await put(`purchaseOrder/${doctorId}/${purchaseOrderId}/setTotal`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePurchaseOrderApi = (doctorId: string = "", purchaseOrderId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await remove(`purchaseOrder/${doctorId}/${purchaseOrderId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPaymentPurchaseOrderApi = (doctorId: string = "", purchaseId: string = "",  data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await post(`purchaseOrder/${doctorId}/${purchaseId}/payment`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const EditPaymentPurchaseOrderApi = (doctorId: string = "", purchaseId: string = "", paymentId: string = "",  data: {}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await put(`purchaseOrder/${doctorId}/${purchaseId}/payment/${paymentId}`, data)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const DeletePaymentPurchaseOrderApi = (doctorId: string = "", purchaseId: string = "", paymentId: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPurchaseOrderStart())
    let response = await remove(`purchaseOrder/${doctorId}/${purchaseId}/payment/${paymentId}`)
    const resData = response.data.success
    if(resData) {
      dispatch(statusPurchaseOrderSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPurchaseOrderFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPurchaseOrderFailure([errData.err]))
      return [errData.err]
    }
  }
}
