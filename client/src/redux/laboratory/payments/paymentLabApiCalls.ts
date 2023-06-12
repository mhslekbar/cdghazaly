import { Dispatch } from "react";
import {
  statusPaymentLabStart,
  statusPaymentLabSuccess,
  statusPaymentLabFailure
} from "./paymentLabSlice";
import { get, post, put, remove } from "../../../requestMethods";

export const ShowPaymentLabApi = (labId: string, filter: string = "") => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(statusPaymentLabStart())
    let response
    if(filter) {
      response = await get(`laboratory/${labId}/payments${filter}`)
    } else {
      response = await get(`laboratory/${labId}/payments`)
    }
    const resData = response.data.success
    if(resData) {
      dispatch(statusPaymentLabSuccess(resData))
      return true
    }
  } catch (error: any) {
    const errData = error.response.data
    if(errData && error.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusPaymentLabFailure(formErrors))
      return formErrors
    } else {
      dispatch(statusPaymentLabFailure([errData.err]))
      return [errData.err]
    }
  }
}

export const AddPaymentLabApi =
  (labId: string, data: {}) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPaymentLabStart());
      let response = await post(`laboratory/${labId}/payments`, data);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPaymentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPaymentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPaymentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const EditPaymentLabApi =
  (labId: string, PaymentId: string, data: {}) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPaymentLabStart());
      let response = await put(
        `laboratory/${labId}/payments/${PaymentId}`,
        data
      );
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPaymentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPaymentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPaymentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

export const DeletePaymentLabApi =
  (labId: string, PaymentId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(statusPaymentLabStart());
      let response = await remove(`laboratory/${labId}/payments/${PaymentId}`);
      const resData = response.data.success;
      if (resData) {
        dispatch(statusPaymentLabSuccess(resData));
        return true;
      }
    } catch (error: any) {
      const errData = error.response.data;
      if (errData && error.response.status === 300) {
        const formErrors = errData.formErrors ? errData.formErrors : [errData];
        dispatch(statusPaymentLabFailure(formErrors));
        return formErrors;
      } else {
        dispatch(statusPaymentLabFailure([errData.err]));
        return [errData.err];
      }
    }
  };

  