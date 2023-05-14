import { statusLoginStart ,statusLoginSuccess ,statusLoginFailure } from "./loginRedux";

export const loginApi = (data) => async (dispatch) => {
  try {
    dispatch(statusLoginStart())
    dispatch(statusLoginSuccess(data))
  }  catch (err) {
    const errData = err.response.data
    if(errData && err.response.status === 300) {
      const formErrors = errData.formErrors ? errData.formErrors : [errData]
      dispatch(statusLoginFailure(formErrors))
      return formErrors
    } else { 
      dispatch(statusLoginFailure(errData))
      return [errData]
    }

  } 
}
