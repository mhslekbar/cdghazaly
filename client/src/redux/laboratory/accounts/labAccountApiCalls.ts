import { Dispatch } from "react";
import {
  statusAccountLabStart,
  statusAccountLabSuccess,
  statusAccountLabFailure
} from "./accountLabSlice";
import { get } from "../../../requestMethods";

export const ShowAccountLabApi = (labId: string, filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusAccountLabStart())
    let response
    if(filter) {
      response = await get(`laboratory/${labId}/accounts${filter}`)
    } else {
      response = await get(`laboratory/${labId}/accounts`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusAccountLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusAccountLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusAccountLabFailure([errData.err]))
      return [errData.err]
    }
  }
}
