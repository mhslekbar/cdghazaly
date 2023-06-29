import { Dispatch } from "react";
import {
  statusConsumptionLabStart,
  statusConsumptionLabSuccess,
  statusConsumptionLabFailure
} from "./consumptionLabSlice";
import { post } from "../../../requestMethods";

export const ShowConsumptionLabApi = (patientId: string = "", filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusConsumptionLabStart())
    let response
    if(filter) {
      response = await post(`laboratory/consumptions${filter}`, {patient: patientId})
    } else {
      response = await post(`laboratory/consumptions`, {patient: patientId})
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusConsumptionLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusConsumptionLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusConsumptionLabFailure([errData.err]))
      return [errData.err]
    }
  }
}
