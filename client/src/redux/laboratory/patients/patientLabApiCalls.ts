import { Dispatch } from "react";
import {
  statusPatientLabStart,
  statusPatientLabSuccess,
  statusPatientLabFailure
} from "./patientLabSlice";
import { get, post, put, remove } from "../../../requestMethods";

export const ShowPatientLabApi = (labId: string, filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPatientLabStart())
    let response
    if(filter) {
      response = await get(`laboratory/${labId}/patients${filter}`)
    } else {
      response = await get(`laboratory/${labId}/patients`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPatientLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPatientLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPatientLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPatientLabApi =
  (labId: string, data: {}) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPatientLabStart());
      let response = await post(`laboratory/${labId}/patients`, data);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPatientLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPatientLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPatientLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const EditPatientLabApi =
  (labId: string, patientId: string, data: {}) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPatientLabStart());
      let response = await put(
        `laboratory/${labId}/patients/${patientId}`,
        data
      );
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPatientLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPatientLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPatientLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const DeletePatientLabApi =
  (labId: string, patientId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPatientLabStart());
      let response = await remove(`laboratory/${labId}/patients/${patientId}`);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPatientLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPatientLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPatientLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };
