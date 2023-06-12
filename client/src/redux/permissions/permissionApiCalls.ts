import { Dispatch } from "react";
import { PermissionAction, PermissionStatus, PermissionType } from "./permissionActions";
import { get } from "../../requestMethods";

export const ShowPermissionsApi = (filter: string = "") => async (dispatch: Dispatch<PermissionAction>) => {
  try {
    dispatch({ type: {name: "permission", method: PermissionType.SHOW_PERMISSIONS}, status: PermissionStatus.START })
    let response
    if(filter) {
      response = await get(`permission${filter}`)
    } else {
      response = await get("permission")
    }
    const resData = response.data.success
    if(resData) {
      dispatch({ type: {name: "permission", method: PermissionType.SHOW_PERMISSIONS}, status: PermissionStatus.SUCCESS, payload: resData })
      return false
    }
  } catch(error: any) {
    const errorData = error.response.data
    if(errorData && error.response === 300) {
      const formErrors = errorData.formErrors ? errorData.formErrors : [errorData]
      dispatch({ type: {name: "permission", method: PermissionType.SHOW_PERMISSIONS}, status: PermissionStatus.FAILURE, payload: formErrors })      
      return formErrors
    } else {
      dispatch({ type: {name: "permission", method: PermissionType.SHOW_PERMISSIONS}, status: PermissionStatus.FAILURE, payload: [errorData] })      
      return [errorData]
    }
  }

}