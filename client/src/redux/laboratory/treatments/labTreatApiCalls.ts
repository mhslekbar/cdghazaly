import { Dispatch } from "react";
import {
  statusTreatmentLabStart,
  statusTreatmentLabSuccess,
  statusTreatmentLabFailure
} from "./treatmentLabSlice";
import { get, post, put, remove } from "../../../requestMethods";

export const ShowTreatmentLabApi = (labId: string, filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusTreatmentLabStart())
    let response
    if(filter) {
      response = await get(`laboratory/${labId}/treatments${filter}`)
    } else {
      response = await get(`laboratory/${labId}/treatments`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusTreatmentLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusTreatmentLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusTreatmentLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddTreatLabApi =
  (labId: string, data: {}) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusTreatmentLabStart());
      let response = await post(`laboratory/${labId}/treatments`, data);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusTreatmentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusTreatmentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusTreatmentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const EditTreatLabApi =
  (labId: string, TreatId: string, data: {}) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusTreatmentLabStart());
      let response = await put(
        `laboratory/${labId}/treatments/${TreatId}`,
        data
      );
      const resData = response.data.success;
      if (resData) {
        dispatch(statusTreatmentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusTreatmentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusTreatmentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const DeleteTreatLabApi =
  (labId: string, TreatId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusTreatmentLabStart());
      let response = await remove(`laboratory/${labId}/treatments/${TreatId}`);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusTreatmentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusTreatmentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusTreatmentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };
